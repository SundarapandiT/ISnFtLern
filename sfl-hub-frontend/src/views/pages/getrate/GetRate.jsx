import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api, encryptURL } from '../../../utils/api';
import { toast } from 'react-hot-toast';
import {
  Box,
  Autocomplete,
  FormControl,
  Card,
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
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { IconBox } from '../../styles/scheduleshipmentStyle';
import { useStyles } from '../../styles/MyshipmentStyle';
import { useShipmentContext } from '../../ShipmentContext';
import { useNavigate } from 'react-router-dom';

const GetRate = ({setActiveModule}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    fromDetails,
    updateFromDetails,
    toDetails,
    updateToDetails,
    packageDetails,
    setPackageDetails,
    Giszip,
    GsetisZip,
    Gresiszip,
    GsetresisZip,
    GshipmentType,
    GsetShipmentType,
  } = useShipmentContext();

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
        iszipavailable: country.iszipavailable,
      }));
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch countries:', error);
      toast.error('Failed to load countries.');
    },
  });

  const [rates, setRates] = useState([]);
  const [showRates, setShowRates] = useState(false);
  const [pickupErrors, setPickupErrors] = useState({
    fromZipCode: '',
    toZipCode: '',
  });
  const [formErrors, setFormErrors] = useState({
    fromCountry: '',
    toCountry: '',
    fromZipCode: '',
    toZipCode: '',
    fromCity: '',
    toCity: '',
    shipDate: '',
    packageRows: packageDetails.map(() => ({
      packageNumber: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      chargeableWeight: '',
      insuredValue: '',
    })),
  });

  // Global unit states
  const [weightUnit, setWeightUnit] = useState('LB');
  const [dimensionUnit, setDimensionUnit] = useState('INCHES');
  const [chargeableUnit, setChargeableUnit] = useState('LB');
  const isEnvelope = toDetails.packageType === 'Envelop';

  // Sync packageDetails with packageType changes
  useEffect(() => {
    if (isEnvelope) {
      setPackageDetails([
        {
          packageNumber: '1',
          weight: '0.5',
          length: '10',
          width: '13',
          height: '1',
          chargeableWeight: '1',
          insuredValue: '0',
        },
      ]);
      setWeightUnit('LB');
      setDimensionUnit('INCHES');
      setChargeableUnit('LB');
    } else {
      // Only reset if packageDetails is not already in the desired state
      if (
        packageDetails.length !== 1 ||
        packageDetails[0].packageNumber !== '' ||
        packageDetails[0].weight !== '' ||
        packageDetails[0].length !== '' ||
        packageDetails[0].width !== '' ||
        packageDetails[0].height !== '' ||
        packageDetails[0].chargeableWeight !== '' ||
        packageDetails[0].insuredValue !== ''
      ) {
        setPackageDetails([
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
  }, [toDetails.packageType, setPackageDetails]);

  // Sync formErrors with packageDetails
  useEffect(() => {
    setFormErrors(prev => ({
      ...prev,
      packageRows: packageDetails.map(() => ({
        packageNumber: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        chargeableWeight: '',
        insuredValue: '',
      })),
    }));
  }, [packageDetails]);

  // Fetch city list for fromCountry when iszip === 0
  const fromCountryObj = countries.find(c => c.value === fromDetails.fromCountry);
  const { data: fromCities = [], isLoading: isFromCitiesLoading, error: fromCitiesError } = useQuery({
    queryKey: ['fromCityList', fromDetails.fromCountry],
    queryFn: async () => {
      if (!fromCountryObj || Giszip !== 0) return [];
      const response = await axios.post(`${api.BackendURL}/locations/getFedexCityList`, {
        countryID: fromCountryObj.countryid,
        cityType: 'FedEx',
      });
      return response.data.user?.[0]?.map(city => city.cityname) || [];
    },
    enabled: !!fromCountryObj && Giszip === 0,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch from city list:', error);
      toast.error('Failed to load from city list.');
    },
  });

  // Fetch city list for toCountry when resiszip === 0
  const toCountryObj = countries.find(c => c.value === toDetails.toCountry);
  const { data: toCities = [], isLoading: isToCitiesLoading, error: toCitiesError } = useQuery({
    queryKey: ['toCityList', toDetails.toCountry],
    queryFn: async () => {
      if (!toCountryObj || Gresiszip !== 0) return [];
      const response = await axios.post(`${api.BackendURL}/locations/getFedexCityList`, {
        countryID: toCountryObj.countryid,
        cityType: 'FedEx',
      });
      return response.data.user?.[0]?.map(city => city.cityname) || [];
    },
    enabled: !!toCountryObj && Gresiszip === 0,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch to city list:', error);
      toast.error('Failed to load to city list.');
    },
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fromCountry: '',
      toCountry: '',
      fromZipCode: '',
      toZipCode: '',
      fromCity: '',
      toCity: '',
      shipDate: '',
      packageRows: packageDetails.map(() => ({
        packageNumber: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        chargeableWeight: '',
        insuredValue: '',
      })),
    };

    if (!fromDetails.fromCountry) {
      newErrors.fromCountry = 'From Country is required';
      isValid = false;
    }
    if (!toDetails.toCountry) {
      newErrors.toCountry = 'To Country is required';
      isValid = false;
    }
    if (Giszip === 1 && !fromDetails.fromZipCode) {
      newErrors.fromZipCode = 'From Zip Code is required';
      isValid = false;
    }
    if (Gresiszip === 1 && !toDetails.toZipCode) {
      newErrors.toZipCode = 'To Zip Code is required';
      isValid = false;
    }
    if (!fromDetails.fromCity) {
      newErrors.fromCity = 'From City is required';
      isValid = false;
    }
    if (!toDetails.toCity) {
      newErrors.toCity = 'To City is required';
      isValid = false;
    }
    if (!toDetails.shipDate) {
      newErrors.shipDate = 'Ship Date is required';
      isValid = false;
    }

    packageDetails.forEach((row, index) => {
      if (!row.packageNumber || isNaN(row.packageNumber) || parseInt(row.packageNumber) <= 0) {
        newErrors.packageRows[index].packageNumber = 'Valid number of packages is required';
        isValid = false;
      }
      if (!row.weight || isNaN(row.weight) || parseFloat(row.weight) <= 0) {
        newErrors.packageRows[index].weight = 'Valid weight is required';
        isValid = false;
      }
      if (!isEnvelope) {
        if (!row.length || isNaN(row.length) || parseFloat(row.length) <= 0) {
          newErrors.packageRows[index].length = 'Valid length is required';
          isValid = false;
        }
        if (!row.width || isNaN(row.width) || parseFloat(row.width) <= 0) {
          newErrors.packageRows[index].width = 'Valid width is required';
          isValid = false;
        }
        if (!row.height || isNaN(row.height) || parseFloat(row.height) <= 0) {
          newErrors.packageRows[index].height = 'Valid height is required';
          isValid = false;
        }
      }
      if (row.insuredValue && (isNaN(row.insuredValue) || parseFloat(row.insuredValue) < 0)) {
        newErrors.packageRows[index].insuredValue = 'Valid insured value is required';
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const calculateChargeableWeight = (pkg, fromCountry, toCountry) => {
    const weight = parseFloat(pkg.weight) || 0;
    const length = parseFloat(pkg.length) || 0;
    const width = parseFloat(pkg.width) || 0;
    const height = parseFloat(pkg.height) || 0;

    const dimensionalWeight = Math.floor(
      fromCountry === toCountry
        ? (length * width * height) / 166
        : (length * width * height) / 139
    );

    return Math.max(weight, dimensionalWeight).toString();
  };

  useEffect(() => {
    if (isEnvelope) return;
    setPackageDetails(prevRows =>
      prevRows.map(row => ({
        ...row,
        chargeableWeight: calculateChargeableWeight(row, fromDetails.fromCountry, toDetails.toCountry),
      }))
    );
  }, [fromDetails.fromCountry, toDetails.toCountry, packageDetails, isEnvelope, setPackageDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('from')) {
      updateFromDetails({ [name]: value });
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    } else if (name.startsWith('to') || name === 'residential' || name === 'packageType' || name === 'shipDate') {
      updateToDetails({ [name]: value });
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const fromDebounceRef = useRef(null);
  const toDebounceRef = useRef(null);

  const fetchCityState = async (zipCode, countryValue, isFrom) => {
    if (!zipCode || zipCode.length < 3) {
      updateFromDetails({ fromCity: '', fromState: '' });
      updateToDetails({ toCity: '', toState: '' });
      setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
      return;
    }

    try {
      const country = countries.find(c => c.value === countryValue);
      if (!country) {
        throw new Error('Country not selected or invalid');
      }

      const encodedUrl = encryptURL('/locations/getstateCitybyPostalCode');
      const response = await axios.post(`${api.BackendURL}/locations/${encodedUrl}`, {
        CountryID: country.countryid,
        PostalCode: zipCode,
      });

      const userData = response.data?.user?.[0] || [];
      if (userData.length > 0) {
        const place = userData[0];
        if (isFrom) {
          updateFromDetails({ fromCity: place.city || '', fromState: place.state || '' });
        } else {
          updateToDetails({ toCity: place.city || '', toState: place.state || '' });
        }
        setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
        setFormErrors(prev => ({ ...prev, [isFrom ? 'fromCity' : 'toCity']: '' }));
        return;
      }

      if (countryValue === 'in') {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
        const data = res.data[0];
        if (data.Status === 'Success' && data.PostOffice?.length > 0) {
          const place = data.PostOffice[0];
          if (isFrom) {
            updateFromDetails({ fromCity: place.Block || place.District || '', fromState: place.State || '' });
          } else {
            updateToDetails({ toCity: place.Block || place.District || '', toState: place.State || '' });
          }
          setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
          setFormErrors(prev => ({ ...prev, [isFrom ? 'fromCity' : 'toCity']: '' }));
          return;
        }
      }

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
        if (isFrom) {
          updateFromDetails({ fromCity: city, fromState: state });
        } else {
          updateToDetails({ toCity: city, toState: state });
        }
        setPickupErrors(prev => ({ ...prev, [isFrom ? 'fromZipCode' : 'toZipCode']: '' }));
        setFormErrors(prev => ({ ...prev, [isFrom ? 'fromCity' : 'toCity']: '' }));
        return;
      }

      throw new Error('No valid data found');
    } catch (err) {
      console.error(`Failed to fetch city/state for ${isFrom ? 'fromZipCode' : 'toZipCode'}:`, err.message);
      if (isFrom) {
        updateFromDetails({ fromCity: '', fromState: '' });
      } else {
        updateToDetails({ toCity: '', toState: '' });
      }
      setPickupErrors(prev => ({
        ...prev,
        [isFrom ? 'fromZipCode' : 'toZipCode']: 'Invalid or unsupported zip code.',
      }));
      setFormErrors(prev => ({
        ...prev,
        [isFrom ? 'fromCity' : 'toCity']: 'Invalid city due to invalid zip code.',
      }));
    }
  };

  useEffect(() => {
    if (Giszip === 0) {
      updateFromDetails({ fromZipCode: '', fromCity: '', fromState: '' });
      setPickupErrors(prev => ({ ...prev, fromZipCode: '' }));
      setFormErrors(prev => ({ ...prev, fromCity: '' }));
      return;
    }
    if (fromDebounceRef.current) clearTimeout(fromDebounceRef.current);
    fromDebounceRef.current = setTimeout(() => {
      fetchCityState(fromDetails.fromZipCode, fromDetails.fromCountry, true);
    }, 500);
    return () => clearTimeout(fromDebounceRef.current);
  }, [fromDetails.fromZipCode, fromDetails.fromCountry, Giszip, countries]);

  useEffect(() => {
    if (Gresiszip === 0) {
      updateToDetails({ toZipCode: '', toCity: '', toState: '' });
      setPickupErrors(prev => ({ ...prev, toZipCode: '' }));
      setFormErrors(prev => ({ ...prev, toCity: '' }));
      return;
    }
    if (toDebounceRef.current) clearTimeout(toDebounceRef.current);
    toDebounceRef.current = setTimeout(() => {
      fetchCityState(toDetails.toZipCode, toDetails.toCountry, false);
    }, 500);
    return () => clearTimeout(toDebounceRef.current);
  }, [toDetails.toZipCode, toDetails.toCountry, Gresiszip, countries]);

  const handlePackageRowChange = (index, field, value) => {
  if (isEnvelope) return;

  // Restrict to non-negative numbers; integers for packageNumber, decimals for others
  if (['packageNumber','weight', 'length', 'width', 'height'] && !/^\d*$/.test(value)) return;
  setPackageDetails((prevRows) => {
    const updatedRows = [...prevRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    return updatedRows;
  });
  setFormErrors(prev => {
    const newPackageErrors = [...prev.packageRows];
    newPackageErrors[index] = { ...newPackageErrors[index], [field]: '' };
    return { ...prev, packageRows: newPackageErrors };
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
    setPackageDetails((prevRows) => [
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
    setFormErrors(prev => ({
      ...prev,
      packageRows: [
        ...prev.packageRows,
        {
          packageNumber: '',
          weight: '',
          length: '',
          width: '',
          height: '',
          chargeableWeight: '',
          insuredValue: '',
        },
      ],
    }));
  };

  const handleDeleteRow = (index) => {
    if (isEnvelope) return;
    setPackageDetails((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
    setFormErrors(prev => {
      const newPackageErrors = [...prev.packageRows];
      newPackageErrors.splice(index, 1);
      return { ...prev, packageRows: newPackageErrors };
    });
  };

  const handleGetRate = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    toast.dismiss();
    const loading = toast.loading('Getting Rate...');
    const fromCountryObj = countries.find((c) => c.value === fromDetails.fromCountry);
    const toCountryObj = countries.find((c) => c.value === toDetails.toCountry);

    const basePayload = {
      quoteData: {
        PackageType: toDetails.packageType,
        WeightType: weightUnit,
        UpsData: {
          FromCountry: JSON.stringify({
            CountryID: fromCountryObj.countryid,
            CountryName: fromCountryObj.label,
            CountryCode: fromCountryObj.value.toUpperCase(),
            IsFedexCity: Giszip === 0 ? 1 : 0,
            IsUpsCity: 0,
            IsDhlCity: 0,
            IsZipAvailable: Giszip,
            FromZipCodeOptional: Giszip === 0,
            ToZipCodeOptional: Gresiszip === 0,
          }),
          FromCity: fromDetails.fromCity,
          FromUPSCity: null,
          FromFedExCity: Giszip === 0 ? fromDetails.fromCity : null,
          FromZipCode: fromDetails.fromZipCode,
          FromStateProvinceCode: '',
          ToCountry: JSON.stringify({
            CountryID: toCountryObj.countryid,
            CountryName: toCountryObj.label,
            CountryCode: toCountryObj.value.toUpperCase(),
            IsFedexCity: Gresiszip === 0 ? 1 : 0,
            IsUpsCity: 0,
            IsDhlCity: 0,
            IsZipAvailable: Gresiszip,
            FromZipCodeOptional: Giszip === 0,
            ToZipCodeOptional: Gresiszip === 0,
          }),
          ToCity: toDetails.toCity,
          ToUPSCity: '',
          ToFedExCity: Gresiszip === 0 ? toDetails.toCity : '',
          ToZipCode: toDetails.toZipCode,
          ToStateProvinceCode: '',
        },
        IsResidencial: toDetails.residential === 'Yes',
        IsPickUp: false,
        ShipDate: toDetails.shipDate ? new Date(toDetails.shipDate).toISOString() : new Date().toISOString(),
        AgentCode: 12122,
      },
    };

    let payload;

    if (toDetails.packageType === 'Envelop') {
      payload = {
        ...basePayload,
        quoteData: {
          ...basePayload.quoteData,
          PackageNumber: ['1'],
          Weight: ['0.5'],
          DimeL: ['10'],
          DimeW: ['13'],
          DimeH: ['1'],
          TotalLength: 10,
          TotalWidth: 13,
          TotalHeight: 1,
          TotalInsuredValues: 0,
          ChargableWeight: ['0.5'],
          InsuredValues: ['0'],
          SelectedWeightType: 'LB',
          TotalWeight: 1,
          WeightCount: 1,
          LengthCount: 1,
          WidthCount: 1,
          HeightCount: 1,
          PackCount: '1',
          PackageDetailsCount: 1,
          PackageDetailsText: '1',
          EnvelopeWeightLBSText: 1,
          PackageDetails: [
            {
              PackageNumber: 1,
              PackageWeight: 0.5,
              PackageWidth: 13,
              PackageLength: 10,
              PackageHeight: 1,
              PackageChargableWeight: 1,
              PackageInsuredValue: '0',
            },
          ],
        },
      };
    } else {
      const totalWeight = packageDetails.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
      const totalLength = packageDetails.reduce((sum, row) => sum + (parseFloat(row.length) || 0), 0);
      const totalWidth = packageDetails.reduce((sum, row) => sum + (parseFloat(row.width) || 0), 0);
      const totalHeight = packageDetails.reduce((sum, row) => sum + (parseFloat(row.height) || 0), 0);
      const totalInsuredValues = packageDetails.reduce(
        (sum, row) => sum + (parseFloat(row.insuredValue) || 0),
        0
      );

      payload = {
        ...basePayload,
        quoteData: {
          ...basePayload.quoteData,
          PackageNumber: packageDetails.map((row) => row.packageNumber || '1'),
          Weight: packageDetails.map((row) => row.weight || '0'),
          DimeL: packageDetails.map((row) => row.length || '0'),
          DimeW: packageDetails.map((row) => row.width || '0'),
          DimeH: packageDetails.map((row) => row.height || '0'),
          TotalLength: totalLength || 0,
          TotalWidth: totalWidth || 0,
          TotalHeight: totalHeight || 0,
          TotalInsuredValues: totalInsuredValues || 0,
          ChargableWeight: packageDetails.map((row) => row.chargeableWeight || '0'),
          InsuredValues: packageDetails.map((row) => row.insuredValue || '0'),
          SelectedWeightType: weightUnit,
          TotalWeight: totalWeight || 0,
          WeightCount: packageDetails.length,
          LengthCount: packageDetails.length,
          WidthCount: packageDetails.length,
          HeightCount: packageDetails.length,
          PackCount: packageDetails.length.toString(),
          PackageDetailsCount: packageDetails.length,
          PackageDetailsText: packageDetails.length.toString(),
          EnvelopeWeightLBSText: totalWeight || 0,
          PackageDetails: packageDetails.map((row) => ({
            PackageNumber: parseInt(row.packageNumber) || 1,
            PackageWeight: parseFloat(row.weight) || 0,
            PackageWidth: parseFloat(row.width) || 0,
            PackageLength: parseFloat(row.length) || 0,
            PackageHeight: parseFloat(row.height) || 0,
            PackageChargableWeight: parseFloat(row.chargeableWeight) || 0,
            PackageInsuredValue: row.insuredValue || '0',
          })),
        },
      };
    }

    try {
      const response = await fetch('https://hubapi.sflworldwide.com/getQuote/getRates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      toast.dismiss();
      if (result.success) {
        toast.success('Rates fetched successfully');
        const updatedRates = result.data.map((item) => ({
          service: item.ServiceDisplayName,
          deliveryDate: item.Delivery_Date,
          rate: item.Rates,
        }));
        setRates(updatedRates);
        setShowRates(true);
      } else {
        toast.error('Failed to fetch rates');
        console.error('API error:', result);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Error fetching rates', error);
      console.error('Error fetching rates:', error);
    }
  };

  const handleReset = () => {
    updateFromDetails({
      fromCountry: 'us',
      fromZipCode: '',
      fromCity: '',
      fromState: '',
    });
    updateToDetails({
      toCountry: 'us',
      toZipCode: '',
      toCity: '',
      toState: '',
      shipDate: new Date().toISOString().split('T')[0],
      residential: 'No',
      packageType: 'Package',
    });
    setPackageDetails([
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
    GsetisZip(1);
    GsetresisZip(1);
    setPickupErrors({ fromZipCode: '', toZipCode: '' });
    setFormErrors({
      fromCountry: '',
      toCountry: '',
      fromZipCode: '',
      toZipCode: '',
      fromCity: '',
      toCity: '',
      shipDate: '',
      packageRows: [
        {
          packageNumber: '',
          weight: '',
          length: '',
          width: '',
          height: '',
          chargeableWeight: '',
          insuredValue: '',
        },
      ],
    });
    toast.dismiss();
  };

  const handleBook = (service) => {
    console.log(`Booking ${service}...`);
    setActiveModule('Schedule Shipment');
    navigate('/admin/Scheduleshipment');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '16px' }}>
      <Card sx={{ boxShadow: 3, borderRadius: '8px', margin: '16px', flexGrow: 1, overflow: 'visible' }}>
        <div className="card-title">
          <h2 style={{ fontSize: '1rem' }}>
            <IconBox className="card-icon">
              <FlightTakeoffIcon className={classes.iconBox} />
            </IconBox>
            <span>Get Rate</span>
          </h2>
        </div>

        <Tabs
          value={GshipmentType === 'AIR' || GshipmentType === 'GROUND' ? 'AIR' : 'OCEAN'}
          indicatorColor="transparent"
          variant="fullWidth"
          onChange={(e, newValue) => GsetShipmentType(newValue)}
          sx={{
            marginRight: '0px',
            marginTop: '14px',
          }}
        >
          <Tab
            label="Air / Ground"
            value="AIR"
            sx={{
              padding: '12px 16px',
              fontWeight: 'medium',
              backgroundColor: GshipmentType === 'AIR' || GshipmentType === 'GROUND' ? '#E91E63' : '#e0e0e0',
              '&.Mui-selected': {
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                color: 'white',
              },
              '&:hover': {
                backgroundColor: GshipmentType === 'AIR' || GshipmentType === 'GROUND' ? '#ec407a' : '#bdbdbd',
              },
              textTransform: 'uppercase',
              minHeight: '36px',
            }}
          />
        </Tabs>

        <CardContent sx={{ padding: '16px' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: '16px', marginBottom: '16px' }}>
            <Box>
              <FormControl fullWidth>
                <Autocomplete
                  freeSolo
                  disablePortal
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  value={fromDetails.fromCountry ? countries.find((c) => c.value === fromDetails.fromCountry) || null : null}
                  onChange={(event, newValue) => {
                    updateFromDetails({ fromCountry: newValue?.value || '' });
                    GsetisZip(newValue?.iszipavailable ?? 1);
                    updateFromDetails({ fromZipCode: '', fromCity: '', fromState: '' });
                  }}
                  disabled={isCountriesLoading || isCountriesError}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="small-textfield"
                      label="From Country"
                      error={!!formErrors.fromCountry}
                      helperText={formErrors.fromCountry}
                    />
                  )}
                  noOptionsText={isCountriesError ? 'Error loading countries' : 'No countries found'}
                  sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                fullWidth
                label="From Zip Code"
                name="fromZipCode"
                value={fromDetails.fromZipCode || ''}
                onChange={handleInputChange}
                placeholder={Giszip === 0 ? 'Not required' : undefined}
                size="small"
                className="custom-textfield"
                inputProps={{
                  maxLength: 15,
                  readOnly: Giszip === 0,
                }}
                error={!!pickupErrors.fromZipCode || !!formErrors.fromZipCode}
                helperText={pickupErrors.fromZipCode || formErrors.fromZipCode}
                disabled={Giszip === 0}
              />
            </Box>
            <Box>
              {Giszip === 0 ? (
                <FormControl fullWidth>
                  <Autocomplete
                    freeSolo
                    disablePortal
                    options={fromCities}
                    value={fromDetails.fromCity || ''}
                    onChange={(event, newValue) => updateFromDetails({ fromCity: newValue || '' })}
                    disabled={isFromCitiesLoading || fromCitiesError}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="small-textfield"
                        label="From City"
                        error={!!formErrors.fromCity}
                        helperText={formErrors.fromCity || (fromCitiesError ? 'Error loading cities' : undefined)}
                      />
                    )}
                    noOptionsText={isFromCitiesLoading ? 'Loading cities...' : 'No cities found'}
                    sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
                  />
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label="From City"
                  name="fromCity"
                  className="custom-textfield"
                  value={fromDetails.fromCity || ''}
                  onChange={handleInputChange}
                  size="small"
                  error={!!formErrors.fromCity}
                  helperText={formErrors.fromCity}
                />
              )}
            </Box>
            <Box>
              <FormControl fullWidth>
                <Autocomplete
                  freeSolo
                  disablePortal
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  value={toDetails.toCountry ? countries.find((c) => c.value === toDetails.toCountry) || null : null}
                  onChange={(event, newValue) => {
                    updateToDetails({ toCountry: newValue?.value || '' });
                    GsetresisZip(newValue?.iszipavailable ?? 1);
                    updateToDetails({ toZipCode: '', toCity: '', toState: '' });
                  }}
                  disabled={isCountriesLoading || isCountriesError}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="small-textfield"
                      label="To Country"
                      error={!!formErrors.toCountry}
                      helperText={formErrors.toCountry}
                    />
                  )}
                  noOptionsText={isCountriesError ? 'Error loading countries' : 'No countries found'}
                  sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                fullWidth
                label="To Zip Code"
                name="toZipCode"
                value={toDetails.toZipCode || ''}
                onChange={handleInputChange}
                placeholder={Gresiszip === 0 ? 'Not required' : undefined}
                size="small"
                className="custom-textfield"
                inputProps={{
                  maxLength: 15,
                  readOnly: Gresiszip === 0,
                }}
                error={!!pickupErrors.toZipCode || !!formErrors.toZipCode}
                helperText={pickupErrors.toZipCode || formErrors.toZipCode}
                disabled={Gresiszip === 0}
              />
            </Box>
            <Box>
              {Gresiszip === 0 ? (
                <FormControl fullWidth>
                  <Autocomplete
                    freeSolo
                    disablePortal
                    options={toCities}
                    value={toDetails.toCity || ''}
                    onChange={(event, newValue) => updateToDetails({ toCity: newValue || '' })}
                    disabled={isToCitiesLoading || toCitiesError}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="small-textfield"
                        label="To City"
                        error={!!formErrors.toCity}
                        helperText={formErrors.toCity || (toCitiesError ? 'Error loading cities' : undefined)}
                      />
                    )}
                    noOptionsText={isToCitiesLoading ? 'Loading cities...' : 'No cities found'}
                    sx={{ '& .MuiAutocomplete-inputRoot': { height: '40px' } }}
                  />
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  name="toCity"
                  label="To City"
                  className="custom-textfield"
                  value={toDetails.toCity || ''}
                  onChange={handleInputChange}
                  size="small"
                  error={!!formErrors.toCity}
                  helperText={formErrors.toCity}
                />
              )}
            </Box>
            <Box>
              <FormControl fullWidth>
                <Autocomplete
                  options={[{ value: 'No', label: 'No' }, { value: 'Yes', label: 'Yes' }]}
                  getOptionLabel={(option) => option.label}
                  value={toDetails.residential ? { value: toDetails.residential, label: toDetails.residential } : null}
                  onChange={(event, newValue) => updateToDetails({ residential: newValue?.value || '' })}
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
                  options={[{ value: 'Package', label: 'Package' }, { value: 'Envelop', label: 'Envelop' }]}
                  getOptionLabel={(option) => option.label}
                  value={toDetails.packageType ? { value: toDetails.packageType, label: toDetails.packageType } : null}
                  onChange={(event, newValue) => updateToDetails({ packageType: newValue?.value || '' })}
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
                value={toDetails.shipDate || ''}
                onChange={handleInputChange}
                size="small"
                className="small-textfield"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder=""
                error={!!formErrors.shipDate}
                helperText={formErrors.shipDate}
              />
            </Box>
          </Box>

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
                  {packageDetails.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.packageNumber || ''}
                          onChange={(e) => handlePackageRowChange(index, 'packageNumber', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!formErrors.packageRows[index]?.packageNumber}
                          helperText={formErrors.packageRows[index]?.packageNumber}
                          disabled={isEnvelope}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.weight || ''}
                          onChange={(e) => handlePackageRowChange(index, 'weight', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!formErrors.packageRows[index]?.weight}
                          helperText={formErrors.packageRows[index]?.weight}
                          disabled={isEnvelope}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          value={row.length || ''}
                          onChange={(e) => handlePackageRowChange(index, 'length', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                          error={!!formErrors.packageRows[index]?.length}
                          helperText={formErrors.packageRows[index]?.length}
                          disabled={isEnvelope}
                        />
                        <TextField
                          type="number"
                          value={row.width || ''}
                          onChange={(e) => handlePackageRowChange(index, 'width', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                          error={!!formErrors.packageRows[index]?.width}
                          helperText={formErrors.packageRows[index]?.width}
                          disabled={isEnvelope}
                        />
                        <TextField
                          type="number"
                          value={row.height || ''}
                          onChange={(e) => handlePackageRowChange(index, 'height', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1 }}
                          error={!!formErrors.packageRows[index]?.height}
                          helperText={formErrors.packageRows[index]?.height}
                          disabled={isEnvelope}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.chargeableWeight || ''}
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        <TextField
                          type="number"
                          value={row.insuredValue || ''}
                          onChange={(e) => handlePackageRowChange(index, 'insuredValue', e.target.value)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!formErrors.packageRows[index]?.insuredValue}
                          helperText={formErrors.packageRows[index]?.insuredValue}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '8px' }}>
                        {packageDetails.length > 1 && (
                          <IconButton
                            onClick={() => handleDeleteRow(index)}
                            sx={{ color: '#f44336' }}
                            disabled={isEnvelope}
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
              disabled={isEnvelope}
            >
              ADD NEW ROW
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button
              onClick={handleGetRate}
              variant="contained"
              sx={{ backgroundColor: '#E91E63', '&:hover': { backgroundColor: '#E91E63' } }}
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
      </Card>
      <Card sx={{ boxShadow: 3, borderRadius: '8px', margin: '16px', flexGrow: 1, overflow: 'visible' }}>
        {showRates && (
          <CardContent sx={{ padding: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', marginBottom: '8px' }}>
              Rate Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#000' }}>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>Service Type</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>Delivery Date</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>Rates</TableCell>
                    <TableCell sx={{ padding: '8px', fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
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
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default GetRate;