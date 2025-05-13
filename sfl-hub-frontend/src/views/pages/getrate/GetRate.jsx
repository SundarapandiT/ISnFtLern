import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { api } from "../../../utils/api";
import { toast } from "react-hot-toast";
import {
  Box,
  Autocomplete, 
  CircularProgress,
  FormControl, 
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const GetRate = () => {

  // Fetch countries data
  const { data: countries = [], isLoading: isCountriesLoading, isError: isCountriesError } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await axios.get(`${api.BackendURL}/locations/getCountry`);
      const countryData = res.data?.user?.[0] || [];
      
      return countryData.map(country => ({
        value: country.countrycode.toLowerCase(),
        label: country.countryname,
        countryid: country.countryid,
      }));
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours since country data rarely changes
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch countries:', error);
      toast.error("Failed to load countries.");
    }
  });

  const [shipmentType, setShipmentType] = useState('AIR');
  const [rates, setRates] = useState([]);
  const [showRates, setShowRates] = useState(false);
  const [formData, setFormData] = useState({
    fromCountry: 'United States',
    fromZipCode: '',
    fromCity: '',
    toCountry: 'United States',
    toZipCode: '',
    toCity: '',
    shipDate: '',
    residential: 'No',
    packageType: 'Envelope',
    packageNumber: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    chargeableWeight: '',
    insuredValue: '',
  });

  // State for package rows (without per-row units)
  const [packageRows, setPackageRows] = useState([
    {
      packageNumber: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      chargeableWeight: '',
      insuredValue: '',
    },
  ]);

  // Global unit states
  const [weightUnit, setWeightUnit] = useState('LB');
  const [dimensionUnit, setDimensionUnit] = useState('INCHES');
  const [chargeableUnit, setChargeableUnit] = useState('LB');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageRowChange = (index, field, value) => {
    setPackageRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [field]: value };
      return updatedRows;
    });
  };

  const handleWeightUnitChange = (value) => {
    setWeightUnit(value);
    if (value === 'KG') {
      setDimensionUnit('CM');
      setChargeableUnit('KG');
    } else if (value === 'LB') {
      setDimensionUnit('INCHES');
      setChargeableUnit('LB');
    }
  };

  const handleAddRow = () => {
    setPackageRows((prevRows) => [
      ...prevRows,
      {
        packageNumber: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        chargeableWeight: '',
        insuredValue: '',
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setPackageRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
  };

  const handleGetRate = async () => {
    const payload = {
      quoteData: {
        PackageType: formData.packageType,
        WeightType: weightUnit,
        UpsData: {
          FromCountry: JSON.stringify({
            CountryID: 202,
            CountryName: 'United States',
            CountryCode: 'US',
            IsFedexCity: 0,
            IsUpsCity: 0,
            IsDhlCity: 0,
            IsZipAvailable: 1,
            FromZipCodeOptional: false,
            ToZipCodeOptional: false,
          }),
          FromCity: formData.fromCity,
          FromUPSCity: null,
          FromFedExCity: null,
          FromZipCode: formData.fromZipCode,
          FromStateProvinceCode: "",
          ToCountry: JSON.stringify({
            CountryID: 202,
            CountryName: 'United States',
            CountryCode: 'US',
            IsFedexCity: 0,
            IsUpsCity: 0,
            IsDhlCity: 0,
            IsZipAvailable: 1,
            FromZipCodeOptional: false,
            ToZipCodeOptional: false,
          }),
          ToCity: formData.toCity,
          ToUPSCity: '',
          ToFedExCity: '',
          ToZipCode: formData.toZipCode,
          ToStateProvinceCode: '',
        },
        PackageNumber: packageRows.map(row => row.packageNumber || '1'),
        Weight: packageRows.map(row => row.weight || '0.5'),
        DimeL: packageRows.map(row => row.length || '10'),
        DimeW: packageRows.map(row => row.width || '13'),
        DimeH: packageRows.map(row => row.height || '1'),
        TotalLength: parseFloat(packageRows[0]?.length) || 10,
        TotalWidth: parseFloat(packageRows[0]?.width) || 13,
        TotalInsuredValues: parseFloat(packageRows[0]?.insuredValue) || 0,
        TotalHeight: parseFloat(packageRows[0]?.height) || 1,
        ChargableWeight: packageRows.map(row => row.chargeableWeight || '1'),
        InsuredValues: packageRows.map(row => row.insuredValue || '0'),
        SelectedWeightType: weightUnit,
        TotalWeight: parseFloat(packageRows[0]?.weight) || 1,
        IsResidencial: formData.residential === 'Yes',
        IsPickUp: false,
        WeightCount: packageRows.length,
        LengthCount: packageRows.length,
        WidthCount: packageRows.length,
        HeightCount: packageRows.length,
        PackCount: packageRows.length.toString(),
        PackageDetailsCount: packageRows.length,
        PackageDetailsText: packageRows.length.toString(),
        EnvelopeWeightLBSText: parseFloat(packageRows[0]?.weight) || 1,
        ShipDate: formData.shipDate ? new Date(formData.shipDate).toISOString() : new Date().toISOString(),
        PackageDetails: packageRows.map(row => ({
          PackageNumber: parseInt(row.packageNumber) || 1,
          PackageWeight: parseFloat(row.weight) || 0.5,
          PackageWidth: parseFloat(row.width) || 13,
          PackageLength: parseFloat(row.length) || 10,
          PackageHeight: parseFloat(row.height) || 1,
          PackageChargableWeight: parseFloat(row.chargeableWeight) || 1,
          PackageInsuredValue: row.insuredValue || '0',
        })),
        AgentCode: 12122,
      },
    };

    try {
      const response = await fetch('https://hubapi.sflworldwide.com/getQuote/getRates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        const updatedRates = result.data.map((item) => ({
          service: item.ServiceDisplayName,
          deliveryDate: item.Delivery_Date,
          rate: item.Rates,
        }));
        setRates(updatedRates);
        setShowRates(true);
      } else {
        console.error('API error:', result);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      fromCountry: 'United States',
      fromZipCode: '',
      fromCity: '',
      toCountry: 'United States',
      toZipCode: '',
      toCity: '',
      shipDate: '',
      residential: 'No',
      packageType: 'Envelope',
      packageNumber: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      chargeableWeight: '',
      insuredValue: '',
    });
    setPackageRows([
      {
        packageNumber: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        chargeableWeight: '',
        insuredValue: '',
      },
    ]);
    setRates([]);
    setShowRates(false);
    setWeightUnit('LB');
    setDimensionUnit('INCHES');
    setChargeableUnit('LB');
  };

  const handleBook = (service) => {
    console.log(`Booking ${service}...`);
  };

  const handleSendEmail = () => {
    console.log('Sending email...');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '16px' }}>
      <Card sx={{ boxShadow: 3, borderRadius: '8px', margin: '16px', flexGrow: 1 }}>
        {/* Header */}
        <CardHeader
          title={
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              Get Rate
            </Typography>
          }
          action={
            <ToggleButtonGroup
              value={shipmentType}
              exclusive
              onChange={(e, newType) => newType && setShipmentType(newType)}
              sx={{ marginRight: '8px' }}
            >
              {['AIR', 'GROUND', 'OCEAN'].map((type) => (
                <ToggleButton
                  key={type}
                  value={type}
                  sx={{
                    padding: '8px 16px',
                    fontWeight: 'medium',
                    backgroundColor: shipmentType === type ? '#f06292' : '#e0e0e0',
                    color: shipmentType === type ? '#fff' : '#424242',
                    '&:hover': {
                      backgroundColor: shipmentType === type ? '#ec407a' : '#bdbdbd',
                    },
                  }}
                >
                  {type}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          }
          sx={{ borderBottom: '1px solid #e0e0e0', padding: '16px' }}
        />

        {/* Shipment Details Form */}
        <CardContent sx={{ padding: '16px' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: '16px', marginBottom: '16px' }}>
            {/* From Section */}
           <Box>
        <FormControl fullWidth>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            value={formData.fromCountry ? countries.find((c) => c.value === formData.fromCountry) || null : null}
            onChange={(event, newValue) => handleInputChange({
              target: { name: 'fromCountry', value: newValue?.value || '' }
            })}
            disabled={isCountriesLoading || isCountriesError}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
                label="From Country"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isCountriesLoading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            noOptionsText={isCountriesError ? "Error loading countries" : "No countries found"}
            sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
          />
        </FormControl>
      </Box>
            <Box>
              <TextField
                fullWidth
                label="From Zip Code"
                name="fromZipCode"
                value={formData.fromZipCode}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                className="custom-textfield"
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="From City"
                name="fromCity"
                className="custom-textfield"
                value={formData.fromCity}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
       <FormControl fullWidth>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            value={formData.toCountry ? countries.find((c) => c.value === formData.toCountry) || null : null}
            onChange={(event, newValue) => handleInputChange({
              target: { name: 'toCountry', value: newValue?.value || '' }
            })}
            disabled={isCountriesLoading || isCountriesError}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
                label="To Country"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isCountriesLoading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            noOptionsText={isCountriesError ? "Error loading countries" : "No countries found"}
            sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
          />
        </FormControl>
      </Box>
            <Box>
              <TextField
                fullWidth
                label="To Zip Code"
                className="custom-textfield"
                name="toZipCode"
                value={formData.toZipCode}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="toCity"
                label="To City"
                className="custom-textfield"
                value={formData.toCity}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
      
            <Box>
              <FormControl fullWidth>
          <Autocomplete
            options={[{ value: 'No', label: 'No' }, { value: 'Yes', label: 'Yes' }]}
            getOptionLabel={(option) => option.label}
            value={formData.residential ? { value: formData.residential, label: formData.residential } : null}
            onChange={(event, newValue) => handleInputChange({
              target: { name: 'residential', value: newValue?.value || '' }
            })}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
                label="Residential"
              />
            )}
            sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
          />
        </FormControl>
            </Box>
            <Box>
             <FormControl fullWidth>
          <Autocomplete
            options={[{ value: 'Envelope', label: 'Envelope' }, { value: 'Package', label: 'Package' }]}
            getOptionLabel={(option) => option.label}
            value={formData.packageType ? { value: formData.packageType, label: formData.packageType } : null}
            onChange={(event, newValue) => handleInputChange({
              target: { name: 'packageType', value: newValue?.value || '' }
            })}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
                label="Package Type"
              />
            )}
            sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
          />
        </FormControl>
            </Box>
                  <Box>

        <TextField
          fullWidth
          type="date"
          label="Ship Date"
          name="shipDate"
          value={formData.shipDate || ''}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          className="small-textfield"
          InputLabelProps={{
            shrink: true, // Ensures the label floats above the input
          }}
          placeholder="" // Explicitly set to empty to avoid default placeholder
        />
            </Box>
          </Box>

          {/* Package Details Table */}
          <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', marginBottom: '8px' }}>
              Package Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#000' }}>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>No of Packages</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>
                      Weight
                      <Select
                        value={weightUnit}
                        onChange={(e) => handleWeightUnitChange(e.target.value)}
                        sx={{
                          height: '24px',
                          width: '70px',
                          fontSize: '12px',
                          color: '#fff',
                          marginLeft: '8px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          '& .MuiSelect-select': {
                            padding: '4px 24px 4px 8px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.42)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiSvgIcon-root': {
                            color: '#fff',
                          },
                        }}
                      >
                        <MenuItem value="LB">LB</MenuItem>
                        <MenuItem value="KG">KG</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>
                      Dimension (L * W * H")
                      <Select
                        value={dimensionUnit}
                        onChange={(e) => setDimensionUnit(e.target.value)}
                        sx={{
                          height: '24px',
                          width: '90px',
                          fontSize: '12px',
                          color: '#fff',
                          marginLeft: '8px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          '& .MuiSelect-select': {
                            padding: '4px 24px 4px 8px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.42)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&.Mui-disabled': {
                            '& .MuiSelect-select': {
                              color: '#fff',
                              '-webkit-text-fill-color': '#fff',
                            },
                          },
                          '& .MuiSvgIcon-root': {
                            color: '#fff',
                          },
                        }}
                        disabled
                      >
                        <MenuItem value="INCHES">INCHES</MenuItem>
                        <MenuItem value="CM">CM</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>
                      Chargeable Weight
                      <Select
                        value={chargeableUnit}
                        onChange={(e) => setChargeableUnit(e.target.value)}
                        sx={{
                          height: '24px',
                          width: '70px',
                          fontSize: '12px',
                          color: '#fff',
                          marginLeft: '8px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          '& .MuiSelect-select': {
                            padding: '4px 24px 4px 8px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.42)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&.Mui-disabled': {
                            '& .MuiSelect-select': {
                              color: '#fff',
                              '-webkit-text-fill-color': '#fff',
                            },
                          },
                          '& .MuiSvgIcon-root': {
                            color: '#fff',
                          },
                        }}
                        disabled
                      >
                        <MenuItem value="LB">LB</MenuItem>
                        <MenuItem value="KG">KG</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>Insured Value (USD)</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packageRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.packageNumber}
                          onChange={(e) => handlePackageRowChange(index, 'packageNumber', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.weight}
                          onChange={(e) => handlePackageRowChange(index, 'weight', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          value={row.length}
                          onChange={(e) => handlePackageRowChange(index, 'length', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          type="number"
                          value={row.width}
                          onChange={(e) => handlePackageRowChange(index, 'width', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          type="number"
                          value={row.height}
                          onChange={(e) => handlePackageRowChange(index, 'height', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.chargeableWeight}
                          onChange={(e) => handlePackageRowChange(index, 'chargeableWeight', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.insuredValue}
                          onChange={(e) => handlePackageRowChange(index, 'insuredValue', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        {packageRows.length > 1 && (
                          <IconButton
                            onClick={() => handleDeleteRow(index)}
                            sx={{ color: '#f44336' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={handleAddRow}
              variant="contained"
              sx={{
                marginTop: '8px',
                backgroundColor: '#e0e0e0',
                color: '#424242',
                textTransform: 'uppercase',
                '&:hover': { backgroundColor: '#bdbdbd' },
              }}
            >
              ADD NEW ROW
            </Button>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button
              onClick={handleGetRate}
              variant="contained"
              sx={{ backgroundColor: '#f06292', '&:hover': { backgroundColor: '#ec407a' } }}
            >
              GET RATE
            </Button>
            <Button
              onClick={handleReset}
              variant="contained"
              sx={{ backgroundColor: '#e0e0e0', color: '#424242', '&:hover': { backgroundColor: '#bdbdbd' } }}
            >
              RESET
            </Button>
          </Box>
        </CardContent>

        {/* Rate Details Section */}
        {showRates && (
          <CardContent sx={{ padding: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', marginBottom: '8px' }}>
              Rate Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Service Type</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Delivery Date</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Rates</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rates.map((rate, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: '8px', fontSize: '14px' }}>{rate.service}</TableCell>
                      <TableCell sx={{ padding: '8px', fontSize: '14px' }}>{rate.deliveryDate}</TableCell>
                      <TableCell sx={{ padding: '8px', fontSize: '14px' }}>USD {rate.rate}</TableCell>
                      <TableCell sx={{ padding: '8px', fontSize: '14px' }}>
                        <Button
                          onClick={() => handleBook(rate.service)}
                          variant="contained"
                          sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
                        >
                          BOOK
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={handleSendEmail}
              variant="contained"
              sx={{
                marginTop: '16px',
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' },
              }}
            >
              SEND EMAIL
            </Button>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default GetRate;