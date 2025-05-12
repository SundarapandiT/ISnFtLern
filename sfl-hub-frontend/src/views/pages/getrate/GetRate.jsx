import React, { useState } from 'react';
import {
  Box,
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
} from '@mui/material';

const GetRate = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetRate = async () => {
    const payload = {
      quoteData: {
        PackageType: formData.packageType,
        WeightType: 'LB',
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
        PackageNumber: [formData.packageNumber || '1'],
        Weight: [formData.weight || '0.5'],
        DimeL: [formData.length || '10'],
        DimeW: [formData.width || '13'],
        DimeH: [formData.height || '1'],
        TotalLength: parseFloat(formData.length) || 10,
        TotalWidth: parseFloat(formData.width) || 13,
        TotalInsuredValues: parseFloat(formData.insuredValue) || 0,
        TotalHeight: parseFloat(formData.height) || 1,
        ChargableWeight: [formData.chargeableWeight || '1'],
        InsuredValues: [formData.insuredValue || '0'],
        SelectedWeightType: 'LB',
        TotalWeight: parseFloat(formData.weight) || 1,
        IsResidencial: formData.residential === 'Yes',
        IsPickUp: false,
        WeightCount: 1,
        LengthCount: 1,
        WidthCount: 1,
        HeightCount: 1,
        PackCount: formData.packageNumber || '1',
        PackageDetailsCount: 1,
        PackageDetailsText: '1',
        EnvelopeWeightLBSText: parseFloat(formData.weight) || 1,
        ShipDate: formData.shipDate ? new Date(formData.shipDate).toISOString() : new Date().toISOString(),
        PackageDetails: [
          {
            PackageNumber: parseInt(formData.packageNumber) || 1,
            PackageWeight: parseFloat(formData.weight) || 0.5,
            PackageWidth: parseFloat(formData.width) || 13,
            PackageLength: parseFloat(formData.length) || 10,
            PackageHeight: parseFloat(formData.height) || 1,
            PackageChargableWeight: parseFloat(formData.chargeableWeight) || 1,
            PackageInsuredValue: formData.insuredValue || '0',
          },
        ],
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
    setRates([]);
    setShowRates(false);
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
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '16px', marginBottom: '16px' }}>
            {/* From Section */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                From Country
              </Typography>
              <Select
                fullWidth
                name="fromCountry"
                value={formData.fromCountry}
                onChange={handleInputChange}
                sx={{ height: '40px' }}
              >
                <MenuItem value="United States">United States</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                From Zip Code
              </Typography>
              <TextField
                fullWidth
                name="fromZipCode"
                value={formData.fromZipCode}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                From City
              </Typography>
              <TextField
                fullWidth
                name="fromCity"
                value={formData.fromCity}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                To Country
              </Typography>
              <Select
                fullWidth
                name="toCountry"
                value={formData.toCountry}
                onChange={handleInputChange}
                sx={{ height: '40px' }}
              >
                <MenuItem value="United States">United States</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                To Zip Code
              </Typography>
              <TextField
                fullWidth
                name="toZipCode"
                value={formData.toZipCode}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                To City
              </Typography>
              <TextField
                fullWidth
                name="toCity"
                value={formData.toCity}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                Ship Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="shipDate"
                value={formData.shipDate}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                Residential
              </Typography>
              <Select
                fullWidth
                name="residential"
                value={formData.residential}
                onChange={handleInputChange}
                sx={{ height: '40px' }}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', marginBottom: '4px' }}>
                Package Type
              </Typography>
              <Select
                fullWidth
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
                sx={{ height: '40px' }}
              >
                <MenuItem value="Envelope">Envelope</MenuItem>
                <MenuItem value="Package">Package</MenuItem>
              </Select>
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
                  <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>No of Package</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Weight (LB)</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Dimension (L * W * H")</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Chargeable Weight (LB)</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px' }}>Insured Value (USD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        type="number"
                        name="packageNumber"
                        value={formData.packageNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Box sx={{ display: 'flex', gap: '8px' }}>
                        <TextField
                          type="number"
                          name="length"
                          value={formData.length}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          type="number"
                          name="width"
                          value={formData.width}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        type="number"
                        name="chargeableWeight"
                        value={formData.chargeableWeight}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        type="number"
                        name="insuredValue"
                        value={formData.insuredValue}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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