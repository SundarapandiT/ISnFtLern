import React, { useEffect } from "react";
import axios from "axios";
import { Box, TextField, Typography, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // For "Needs Pickup"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // For "Pickup Date"
import StateDropdown from "./Statedropdown";

const Sender = ({
  country,
  countrycode,
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
  needsPickup, // Renamed for consistency
  setNeedsPickup, // Renamed for consistency
  pickupDate, // Renamed for consistency
  setPickupDate, // Renamed for consistency
  senderErrors,
  setSenderErrors,
  handleSenderSubmit,
  handlePrevious,
}) => {
  useEffect(() => {
    const fetchCity = async () => {
      console.log("Fetching city for zip code:", zipCode, countrycode);
      if (zipCode.length < 4) return;

      try {
        if (countrycode === "in") {
          const res = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
          const data = res.data[0];

          if (data.Status === "Success" && data.PostOffice && data.PostOffice.length > 0) {
            const place = data.PostOffice[0];
            console.log("Fetched place data (India):", place);
            setFromCity(place.District);
            setState(place.State);
            setSenderErrors((prev) => ({ ...prev, zipCode: "" }));
          } else {
            throw new Error("No records found");
          }
        } else {
          const res = await axios.get(`https://api.zippopotam.us/${countrycode}/${zipCode}`);
          const place = res.data.places[0];
          console.log("Fetched place data (Intl):", place);
          setFromCity(place["place name"]);
          setState(place["state"]);
          setSenderErrors((prev) => ({ ...prev, zipCode: "" }));
        }
      } catch (err) {
        console.error("Error fetching location:", err.message);
        setFromCity("");
        setSenderErrors((prev) => ({
          ...prev,
          zipCode: "Invalid or unsupported zip code.",
        }));
      }
    };

    fetchCity();
  }, [zipCode, countrycode, setFromCity, setState, setSenderErrors]);

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
              startAdornment: <PersonIcon sx={{ color: "action.active", mr: 1 }} />,
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
              startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          {country ? (
            <Box sx={fieldStyle}>
              <StateDropdown
                country={country}
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
          <TextField
            label="Phone 1"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.phone1}
            helperText={senderErrors.phone1}
            sx={fieldStyle}
            InputProps={{
              startAdornment: <PhoneIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
          <TextField
            label="Phone 2"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            fullWidth
            sx={fieldStyle}
            InputProps={{
              startAdornment: <PhoneIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevious}
            sx={{
              width: { xs: "100%", sm: "auto" },
              bgcolor: "#999999",
              "&:hover": { bgcolor: "#666666" },
              color: "white",
            }}
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

export default Sender;