import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Box, TextField, Typography, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StateDropdown from "./Statedropdown";
import { api } from "../../../utils/api";
import { PhoneInputStyle,PrevButton,NextButton,ButtonBox } from "../../styles/scheduleshipmentStyle"



const Sender = ({
  country,
  countrycode,
  countryId,
  setCountry,
  companyName,
  setCompanyName,
  contactName,
  setContactName,
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  addressLine3,
  setAddressLine3,
  zipCode,
  setZipCode,
  fromCity,
  setFromCity,
  state,
  setState,
  phone1,
  setPhone1,
  phone2,
  setPhone2,
  email,
  setEmail,
  needsPickup,
  setNeedsPickup,
  pickupDate,
  setPickupDate,
  senderErrors,
  setSenderErrors,
  handleSenderSubmit,
  handlePrevious,
}) => {
  const debounceRef = useRef(null); 

  useEffect(() => {
    if (!zipCode || zipCode.length < 3) {
      setFromCity("");
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      console.log("Fetching city for zip code:", zipCode, countrycode);

      try {
        // Step 1: Try custom backend API
        const response = await axios.post(`${api.BackendURL}/locations/getstateCitybyPostalCode`, {
          CountryID: countryId,
          PostalCode: zipCode,
        });

        const userData = response.data?.user?.[0] || [];
        console.log("Custom API response:", userData);

        if (userData.length > 0) {
          const place = userData[0];
          setFromCity(place.city);
          setState(place.state);
          setSenderErrors((prev) => ({ ...prev, zipCode: "" }));
          return;
        }

        throw new Error("No data from backend");
      } catch (err) {
        console.warn("Custom API failed or returned no data. Falling back...", err.message);

        try {
          // Step 2: Fallback to public APIs
          if (countrycode === "in") {
            const res = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
            const data = res.data[0];

            console.log("India API response:", data);
            if (data.Status === "Success" && data.PostOffice?.length > 0) {
              const place = data.PostOffice[0];
              setFromCity(place.Block || place.District);
              setState(place.State);
              setSenderErrors((prev) => ({ ...prev, zipCode: "" }));
              return;
            } else {
              throw new Error("No records from India API");
            }
          } else {
            const res = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_API_KEY}&components=country:${countrycode}|postal_code:${zipCode}`
            );
            const components = res.data.results?.[0]?.address_components || [];
            console.log("Google API response:", components);
            
            let city = '';
            let state = '';
            
            // Loop through the components to extract city and state
            components.forEach(component => {
              if (component.types.includes('locality') || component.types.includes('postal_town')) {
                city = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
            });
            
            // Update the state
            setFromCity(city);
            setState(state);
            
            // Clear zipCode error if it's valid
            setSenderErrors(prev => ({ ...prev, zipCode: "" }));
            
          }
        } catch (fallbackErr) {
          console.error("All APIs failed:", fallbackErr.message);
          setFromCity("");
          setSenderErrors((prev) => ({
            ...prev,
            zipCode: "Invalid or unsupported zip code.",
          }));
        }
      }
    }, 500); 
   

    return () => clearTimeout(debounceRef.current);
  }, [zipCode, countrycode, countryId]);


  const today = new Date().toISOString().split("T")[0];

  // Common styles for all rows
  const rowStyle = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    mb: 2,
    alignItems: "stretch",
  };

  const fieldStyle = {
    flex: 1,
    minWidth: 0,
  };

  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>

      <form onSubmit={handleSenderSubmit}>
        {/* Row 1: Country, Company Name, Contact Name */}
        <Box sx={rowStyle}>
          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{
              startAdornment: <PublicIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{
              startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
            label="Contact Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.contactName}
            helperText={senderErrors.contactName}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Row 2: Address Lines */}
        <Box sx={rowStyle}>
          <TextField
            label="Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.addressLine1}
            helperText={senderErrors.addressLine1}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
          <TextField
            label="Address Line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
            label="Address Line 3"
            value={addressLine3}
            onChange={(e) => setAddressLine3(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Row 3: Zip Code, City, State */}
        <Box sx={rowStyle}>
          <TextField
            label="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.zipCode}
            helperText={senderErrors.zipCode}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
          <TextField
            label="From City"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.fromCity}
            helperText={senderErrors.fromCity}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <BusinessIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
          {country ? (
            <Box sx={fieldStyle}>
              <StateDropdown
                country={countryId}
                state={state}
                setState={setState}
                senderErrors={senderErrors}
              />
            </Box>
          ) : (
            <Box sx={fieldStyle} />
          )}
        </Box>

        {/* Row 4: Phone 1, Phone 2, Email */}
        <Box sx={rowStyle}>
          {/* Phone 1 */}
          <Box sx={{ ...fieldStyle, width: '100%' }}>
            <PhoneInput
              country={countrycode}
              value={phone1}
              onChange={(phone) => setPhone1(phone)}
              inputStyle={{
                PhoneInputStyle,
                width: '100%',
                borderColor: senderErrors.phone1 ? 'red' : '#c4c4c4',

              }}
              containerStyle={{ width: '100%' }}
              enableSearch
              specialLabel="Phone 1"
            />
            {senderErrors.phone1 && (
              <Typography variant="caption" color="error">
                {senderErrors.phone1}
              </Typography>
            )}
          </Box>

          {/* Phone 2 */}
          <Box sx={{ ...fieldStyle, width: '100%' }}>
            <PhoneInput
              country={countrycode}
              value={phone2}
              onChange={(phone) => setPhone2(phone)}
              inputStyle={{
                PhoneInputStyle,
                width: '100%',
                borderColor: '#c4c4c4',

              }}
              containerStyle={{ width: '100%' }}
              enableSearch
              specialLabel="Phone 2"
            />
          </Box>

          {/* Email Address */}
          <TextField
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.email}
            helperText={senderErrors.email}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Row 5: Needs Pickup, Pickup Date */}
        <Box sx={rowStyle}>
          <FormControl fullWidth sx={fieldStyle}>
            <InputLabel>Do You Need Pickup?</InputLabel>
            <Select
              value={needsPickup || ""}
              onChange={(e) => setNeedsPickup(e.target.value)}
              label="Do You Need Pickup?"
              startAdornment={<LocalShippingIcon sx={{ color: "action.active", mr: 1 }} />}
            >
              <MenuItem value="No - I Will Drop Off My Package">No - I Will Drop Off My Package</MenuItem>
              <MenuItem value="Yes - I Need Pickup Service">Yes - I Need Pickup Service</MenuItem>
            </Select>
          </FormControl>
          {needsPickup === "Yes - I Need Pickup Service" ? (
            <TextField
              label="Pickup Date"
              type="date"
              value={pickupDate || ""}
              onChange={(e) => setPickupDate(e.target.value)}
              fullWidth
              required
              error={!!senderErrors.pickupDate}
              helperText={senderErrors.pickupDate}
              sx={fieldStyle}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarTodayIcon sx={{ color: "red", mr: 1 }} />,
              }}
              inputProps={{
                min: today, // Restrict past dates
              }}
            />
          ) : (
            <Box sx={fieldStyle} />
          )}
          <Box sx={fieldStyle} /> {/* Placeholder for 3-column layout */}
        </Box>

        {/* Buttons */}
        <ButtonBox>
          <PrevButton
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevious}
          >
            Previous
          </PrevButton>

          <NextButton
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </NextButton>
        </ButtonBox>
      </form>
    </Box>
  );
};

export default Sender;