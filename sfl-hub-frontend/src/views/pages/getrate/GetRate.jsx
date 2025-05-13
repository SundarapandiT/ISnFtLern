import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { api, encryptURL } from "../../../utils/api";
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
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconBox } from '../../styles/scheduleshipmentStyle';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useStyles } from '../../styles/MyshipmentStyle';

const GetRate = () => {
  const classes = useStyles();
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
    fromState: '',
    toCountry: 'United States',
    toZipCode: '',
    toCity: '',
    toState: '',
    shipDate: '',
    residential: 'No',
    packageType: 'Package',
    packageNumber: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    chargeableWeight: '',
    insuredValue: '',
  });
  const [pickupErrors, setPickupErrors] = useState({
    fromZipCode: '',
    toZipCode: '',
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
  const isEnvelope = formData.packageType === 'Envelope';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'packageType') {
      if (value === 'Envelope') {
        setPackageRows([
          {
            packageNumber: '1',
            weight: '0.5',
            length: '10',
            width: '13',
            height: '1',
            chargeableWeight: '0.5',
            insuredValue: '0',
          },
        ]);
        setWeightUnit('LB');
        setDimensionUnit('INCHES');
        setChargeableUnit('LB');
      } else {
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
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Debounce refs for fromZipCode and toZipCode
  const fromDebounceRef = useRef(null);
  const toDebounceRef = useRef(null);

  // Zip code lookup function
  const fetchCityState = async (zipCode, countryValue, isFrom) => {
    if (!zipCode || zipCode.length < 3) {
      handleInputChange({ target: { name: isFrom ? 'fromCity' : 'toCity', value: '' } });
      handleInputChange({ target: { name: isFrom ? 'fromState' : 'toState', value: '' } });
      setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
      return;
    }

    try {
      // Step 1: Try custom backend API
      const country = countries.find(c => c.value === countryValue);
      if (!country) {
        throw new Error("Country not selected or invalid");
      }

      const encodedUrl = encryptURL("/locations/getstateCitybyPostalCode");
      const response = await axios.post(`${api.BackendURL}/locations/${encodedUrl}`, {
        CountryID: country.countryid,
        PostalCode: zipCode,
      });

      const userData = response.data?.user?.[0] || [];
      if (userData.length > 0) {
        const place = userData[0];
        handleInputChange({ target: { name: isFrom ? 'fromCity' : 'toCity', value: place.city || '' } });
        handleInputChange({ target: { name: isFrom ? 'fromState' : 'toState', value: place.state || '' } });
        setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
        return;
      }

      // Step 2: Fallback to India API if country is India
      if (countryValue === "in") {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
        const data = res.data[0];
        if (data.Status === "Success" && data.PostOffice?.length > 0) {
          const place = data.PostOffice[0];
          handleInputChange({ target: { name: isFrom ? 'fromCity' : 'toCity', value: place.Block || place.District || '' } });
          handleInputChange({ target: { name: isFrom ? 'fromState' : 'toState', value: place.State || '' } });
          setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
          return;
        }
      }

      // Step 3: Fallback to Google API
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_API_KEY}&components=country:${countryValue}|postal_code:${zipCode}`
      );
      const components = res.data.results?.[0]?.address_components || [];
      let city = '';
      let state = '';

      components.forEach(component => {
        if (component.types.includes('locality') || component.types.includes('postal_town')) {
          city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          state = component.long_name;
        }
      });

      if (city || state) {
        handleInputChange({ target: { name: isFrom ? 'fromCity' : 'toCity', value: city } });
        handleInputChange({ target: { name: isFrom ? 'fromState' : 'toState', value: state } });
        setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
        return;
      }

      throw new Error("No valid data found");
    } catch (err) {
      console.error(`Failed to fetch city/state for ${isFrom ? 'fromZipCode' : 'toZipCode'}:`, err.message);
      handleInputChange({ target: { name: isFrom ? 'fromCity' : 'toCity', value: '' } });
      handleInputChange({ target: { name: isFrom ? 'fromState' : 'toState', value: '' } });
      setPickupErrors(prev => ({
        ...prev,
        [isFrom ? 'fromZipCode' : 'toZipCode']: "Invalid or unsupported zip code.",
      }));
    }
  };

  // Zip code lookup for fromZipCode
  useEffect(() => {
    if (fromDebounceRef.current) clearTimeout(fromDebounceRef.current);

    fromDebounceRef.current = setTimeout(() => {
      fetchCityState(formData.fromZipCode, formData.fromCountry, true);
    }, 500);

    return () => clearTimeout(fromDebounceRef.current);
  }, [formData.fromZipCode, formData.fromCountry, countries]);

  // Zip code lookup for toZipCode
  useEffect(() => {
    if (toDebounceRef.current) clearTimeout(toDebounceRef.current);

    toDebounceRef.current = setTimeout(() => {
      fetchCityState(formData.toZipCode, formData.toCountry, false);
    }, 500);

    return () => clearTimeout(toDebounceRef.current);
  }, [formData.toZipCode, formData.toCountry, countries]);

  const handlePackageRowChange = (index, field, value) => {
    if (isEnvelope) return;
    setPackageRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [field]: value };
      return updatedRows;
    });
  };

  const handleWeightUnitChange = (value) => {
    if (isEnvelope) return;
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
    if (isEnvelope) return;
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
    if (isEnvelope) return;
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
          FromStateProvinceCode: formData.fromState,
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
          ToStateProvinceCode: formData.toState,
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
      fromState: '',
      toCountry: 'United States',
      toZipCode: '',
      toCity: '',
      toState: '',
      shipDate: '',
      residential: 'No',
      packageType: 'Package',
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
    setPickupErrors({ fromZipCode: '', toZipCode: '' });
  };

  const handleBook = (service) => {
    console.log(`Booking ${service}...`);
  };

  const handleSendEmail = () => {
    console.log('Sending email...');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '16px' }}>
      <Card sx={{ boxShadow: 3, borderRadius: '8px', margin: '16px', flexGrow: 1, overflow: 'visible' }}>
        {/* Header */}

        <div className="card-title">
          <h2 style={{ fontSize: "1rem" }}>
            <IconBox className="card-icon">
              <FlightTakeoffIcon className={classes.iconBox} />
            </IconBox>
            <span>Get Rate</span>
          </h2>
        </div>

        <Tabs
          value={shipmentType === 'AIR' || shipmentType === 'GROUND' ? 'AIR' : 'OCEAN'}
          indicatorColor="transparent"
          variant="fullWidth"
          onChange={(e, newValue) => setShipmentType(newValue)}
          sx={{
            marginRight: '8px',
            marginTop: '14px',
          }}
        >
          <Tab
            label="Air/Ground"
            value="AIR"
            sx={{
              padding: '12px 16px',
              fontWeight: 'medium',
              backgroundColor: (shipmentType === 'AIR' || shipmentType === 'GROUND') ? '#E91E63' : '#e0e0e0',
              "&.Mui-selected": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                color: "white",
              },
              '&:hover': {
                backgroundColor: (shipmentType === 'AIR' || shipmentType === 'GROUND') ? '#ec407a' : '#bdbdbd',
              },
              textTransform: 'uppercase',
              minHeight: '36px',
            }}
          />
          <Tab
            label="Ocean"
            value="OCEAN"
            sx={{
              padding: '10px 16px',
              fontWeight: 'medium',
              backgroundColor: shipmentType === 'OCEAN' ? '#E91E63' : '#e0e0e0',
              "&.Mui-selected": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                color: "white",
              },
              '&:hover': {
                backgroundColor: shipmentType === 'OCEAN' ? '#ec407a' : '#bdbdbd',
              },
              textTransform: 'uppercase',
              minHeight: '36px',
            }}
          />
        </Tabs>

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
                size="small"
                className="custom-textfield"
                error={!!pickupErrors.fromZipCode}
                helperText={pickupErrors.fromZipCode}
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
                size="small"
                error={!!pickupErrors.toZipCode}
                helperText={pickupErrors.toZipCode}
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
                  options={[{ value: 'Package', label: 'Package' }, { value: 'Envelope', label: 'Envelope' }]}
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
                size="small"
                className="small-textfield"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder=""
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
                backgroundColor: isEnvelope ? '#e0e0e0' : 'paleblue',
                color: 'white',
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