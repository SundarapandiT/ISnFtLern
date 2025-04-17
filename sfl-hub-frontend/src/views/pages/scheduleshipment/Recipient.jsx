import React, { useEffect, useRef } from "react";
import axios from "axios";
import StateDropdown from "./Statedropdown";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { api } from "../../../utils/api";

import { PhoneInputStyle, PrevButton, NextButton, ButtonBox } from "../../styles/scheduleshipmentStyle"


const Recipient = ({
  recipientCountry,
  recipientcountrycode,
  recipientCountryId,
  setRecipientCountry,
  recipientCompanyName,
  setRecipientCompanyName,
  recipientContactName,
  setRecipientContactName,
  recipientAddressLine1,
  setRecipientAddressLine1,
  recipientAddressLine2,
  setRecipientAddressLine2,
  recipientAddressLine3,
  setRecipientAddressLine3,
  recipientZipCode,
  setRecipientZipCode,
  recipientCity,
  setRecipientCity,
  recipientState,
  setRecipientState,
  recipientPhone1,
  setRecipientPhone1,
  recipientPhone2,
  setRecipientPhone2,
  recipientEmail,
  setRecipientEmail,
  recipientLocationType,
  setRecipientLocationType,
  recipientErrors,
  setRecipientErrors,
  handleRecipientSubmit,
  handleRecipientPrevious,
}) => {
  const debounceRef = useRef(null);

  useEffect(() => {
    if (recipientZipCode.length < 4) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        // Step 1: Try backend API
        const response = await axios.post(`${api.BackendURL}/locations/getstateCitybyPostalCode`, {
          CountryID: recipientCountryId,
          PostalCode: recipientZipCode,
        });

        const userData = response.data?.user?.[0] || [];

        if (userData.length > 0) {
          const place = userData[0];
          console.log("Recipient location from backend:", place);
          setRecipientCity(place.city);
          setRecipientState(place.state);
          setRecipientErrors((prev) => ({ ...prev, recipientZipCode: "" }));
          return;
        }

        throw new Error("No data from backend");
      } catch (err) {
        console.warn("Recipient API fallback triggered:", err.message);

        try {
          // Step 2: Fallback to external APIs
          if (recipientcountrycode === "in") {
            const res = await axios.get(`https://api.postalpincode.in/pincode/${recipientZipCode}`);
            const data = res.data[0];

            if (data.Status === "Success" && data.PostOffice?.length > 0) {
              const place = data.PostOffice[0];
              console.log("Recipient data from India API:", place);
              setRecipientCity(place.District);
              setRecipientState(place.State);
              setRecipientErrors((prev) => ({ ...prev, recipientZipCode: "" }));
              return;
            } else {
              throw new Error("No records from India postal API");
            }
          } else {
            const res = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_API_KEY}&components=country:${recipientcountrycode}|postal_code:${recipientZipCode}`
            );

            const components = res.data.results?.[0]?.address_components || [];

            let city = "";
            let state = "";

            components.forEach(component => {
              if (component.types.includes('locality') || component.types.includes('postal_town')) {
                city = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
            });

            console.log("Recipient data from Google API:", { city, state });

            setRecipientCity(city);
            setRecipientState(state);
            setRecipientErrors((prev) => ({ ...prev, recipientZipCode: "" }));
          }
        } catch (fallbackErr) {
          console.error("Recipient zip lookup failed:", fallbackErr.message);
          setRecipientCity("");
          setRecipientErrors((prev) => ({
            ...prev,
            recipientZipCode: "Invalid or unsupported zip code.",
          }));
        }
      }
    }, 500); // ⏳ 500ms debounce

    return () => clearTimeout(debounceRef.current);
  }, [
    recipientZipCode,
    recipientcountrycode,
    recipientCountryId,
    setRecipientCity,
    setRecipientState,
    setRecipientErrors,
  ]);


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

      <form onSubmit={handleRecipientSubmit}>
        {/* Row 1: Country, Company Name, Contact Name */}
        <Box sx={rowStyle}>
          <TextField
            label="Country"
            value={recipientCountry}
            onChange={(e) => setRecipientCountry(e.target.value)}
            onFocus={() =>
              setRecipientErrors((prev) => ({
                ...prev,
                country: "Can change in Schedule-pickup",
              }))
            }
            onBlur={() =>
              setRecipientErrors((prev) => ({ ...prev, country: "" }))
            }
            fullWidth
            sx={fieldStyle}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <PublicIcon sx={{ color: "action.active", mr: 1 }} />
              ),
            }}
            helperText={
              recipientErrors?.country ? (
                <span style={{ color: "grey" }}>{recipientErrors.country}</span>
              ) : null
            }
          />
          <TextField
            label="Company Name"
            value={recipientCompanyName}
            onChange={(e) => setRecipientCompanyName(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{ startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
          <TextField
            label="Contact Name"
            value={recipientContactName}
            onChange={(e) => setRecipientContactName(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.contactName}
            helperText={recipientErrors.contactName}
            sx={fieldStyle}
            InputProps={{ startAdornment: <PersonIcon sx={{ color: "red", mr: 1 }} /> }}
          />
        </Box>

        {/* Row 2: Address Line 1, Address Line 2, Address Line 3 */}
        <Box sx={rowStyle}>
          <TextField
            label="Address Line 1"
            value={recipientAddressLine1}
            onChange={(e) => setRecipientAddressLine1(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.addressLine1}
            helperText={recipientErrors.addressLine1}
            sx={fieldStyle}
            InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "red", mr: 1 }} /> }}
          />
          <TextField
            label="Address Line 2"
            value={recipientAddressLine2}
            onChange={(e) => setRecipientAddressLine2(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
          <TextField
            label="Address Line 3"
            value={recipientAddressLine3}
            onChange={(e) => setRecipientAddressLine3(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
        </Box>

        {/* Row 3: Zip Code, City, State */}
        <Box sx={rowStyle}>
          <TextField
            label="Zip Code"
            value={recipientZipCode}
            onChange={(e) => setRecipientZipCode(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.recipientZipCode}
            helperText={recipientErrors.recipientZipCode}
            sx={fieldStyle}
            InputProps={{ startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} /> }}
          />
          <TextField
            label="City"
            value={recipientCity}
            onChange={(e) => setRecipientCity(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.recipientCity}
            helperText={recipientErrors.recipientCity}
            sx={fieldStyle}
            InputProps={{ startAdornment: <BusinessIcon sx={{ color: "red", mr: 1 }} /> }}
          />
          {recipientCountry ? (
            <Box sx={fieldStyle}>
              <StateDropdown
                country={recipientCountryId}
                state={recipientState}
                setState={setRecipientState}
                senderErrors={recipientErrors}
              />
            </Box>
          ) : (
            <Box sx={fieldStyle} />
          )}
        </Box>

        {/* Row 4: Phone 1, Phone 2, Email Address */}
        <Box sx={rowStyle}>
          {/* Phone 1 */}
          <Box sx={{ ...fieldStyle, width: '100%' }}>
            <PhoneInput
              country={recipientcountrycode}
              value={recipientPhone1}
              onChange={(phone) => setRecipientPhone1(phone)}
              inputStyle={{
                width: '100%',
                PhoneInputStyle,
                borderColor: recipientErrors.phone1 ? 'red' : '#c4c4c4',

              }}
              containerStyle={{ width: '100%' }}
              enableSearch
              specialLabel="Phone 1"
              placeholder="Phone 1"
            />
            {recipientErrors.phone1 && (
              <Typography variant="caption" color="error">
                {recipientErrors.phone1}
              </Typography>
            )}
          </Box>

          {/* Phone 2 */}
          <Box sx={{ ...fieldStyle, width: '100%' }}>
            <PhoneInput
              country={recipientcountrycode}
              value={recipientPhone2}
              onChange={(phone) => setRecipientPhone2(phone)}
              inputStyle={{
                width: '100%',
                PhoneInputStyle,
                borderColor: recipientErrors.phone2 ? 'red' : '#c4c4c4',
              }}
              containerStyle={{ width: '100%' }}
              enableSearch
              specialLabel="Phone 2"
              placeholder="Phone 2"
            />
          </Box>

          {/* Email Address */}
          <TextField
            variant="outlined"
            label="Email Address"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.email}
            helperText={recipientErrors.email}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Row 5: Location Type */}
        <Box sx={rowStyle}>
          <FormControl fullWidth sx={fieldStyle}>
            <InputLabel>Select Location Type</InputLabel>
            <Select
              value={recipientLocationType || ""}
              onChange={(e) => setRecipientLocationType(e.target.value)}
              label="Select Location Type"
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </Select>
          </FormControl>
          <Box sx={fieldStyle} />
          <Box sx={fieldStyle} />
        </Box>

        {/* Buttons */}
        <ButtonBox >
          <PrevButton
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleRecipientPrevious}
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

export default Recipient;