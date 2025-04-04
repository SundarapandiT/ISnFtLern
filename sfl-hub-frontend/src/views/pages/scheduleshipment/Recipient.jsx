import React, { useEffect } from "react";
import axios from "axios";
import StateDropdown from "./Statedropdown";
import {
  Box,
  TextField,
  Button,
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
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Recipient = ({
  recipientCountry,
  recipientcountrycode,
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
  useEffect(() => {
    const fetchCity = async () => {
      if (recipientZipCode.length < 4) return;

      try {
        if (recipientcountrycode === "in") {
          const res = await axios.get(`https://api.postalpincode.in/pincode/${recipientZipCode}`);
          const data = res.data[0];

          if (data.Status === "Success" && data.PostOffice && data.PostOffice.length > 0) {
            const place = data.PostOffice[0];
            setRecipientCity(place.District);
            setRecipientState(place.State);
            setRecipientErrors((prev) => ({ ...prev, recipientZipCode: "" }));
          } else {
            throw new Error("No records found");
          }
        } else {
          const res = await axios.get(`https://api.zippopotam.us/${recipientcountrycode}/${recipientZipCode}`);
          const place = res.data.places[0];
          setRecipientCity(place["place name"]);
          setRecipientState(place["state"]);
          setRecipientErrors((prev) => ({ ...prev, recipientZipCode: "" }));
        }
      } catch (err) {
        console.error("Error fetching location:", err.message);
        setRecipientCity("");
        setRecipientErrors((prev) => ({
          ...prev,
          recipientZipCode: "Invalid or unsupported zip code.",
        }));
      }
    };

    fetchCity();
  }, [recipientZipCode, recipientcountrycode, setRecipientCity, setRecipientState, setRecipientErrors]);

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
            fullWidth
            sx={fieldStyle}
            InputProps={{ startAdornment: <PublicIcon sx={{ color: "action.active", mr: 1 }} /> }}
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
            InputProps={{ startAdornment: <PersonIcon sx={{ color: "action.active", mr: 1 }} /> }}
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
            InputProps={{ startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
          {recipientCountry ? (
            <Box sx={fieldStyle}>
              <StateDropdown
                country={recipientCountry}
                state={recipientState}
                setState={setRecipientState}
                senderErrors={recipientErrors} // Should be recipientErrors, but keeping as per your code
              />
            </Box>
          ) : (
            <Box sx={fieldStyle} />
          )}
        </Box>

        {/* Row 4: Phone 1, Phone 2, Email Address */}
        <Box sx={rowStyle}>
          <TextField
            label="Phone 1"
            value={recipientPhone1}
            onChange={(e) => setRecipientPhone1(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.phone1}
            helperText={recipientErrors.phone1}
            sx={fieldStyle}
            InputProps={{ startAdornment: <PhoneIcon sx={{ color: "red", mr: 1 }} /> }}
          />
          <TextField
            label="Phone 2"
            value={recipientPhone2}
            onChange={(e) => setRecipientPhone2(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{ startAdornment: <PhoneIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
          <TextField
            label="Email Address"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.email}
            helperText={recipientErrors.email}
            sx={fieldStyle}
            InputProps={{ startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} /> }}
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
          <Box sx={fieldStyle} /> {/* Placeholder */}
          <Box sx={fieldStyle} /> {/* Placeholder */}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleRecipientPrevious}
            sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 1, sm: 0 } }}
          >
            Previous
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#E91E63",
              "&:hover": { bgcolor: "#ed64a6" },
              width: { xs: "100%", sm: "auto" },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Recipient;