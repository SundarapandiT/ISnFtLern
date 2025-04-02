import React from "react";
import StateDropdown from "./Statedropdown";

import {
  Box,
  TextField,
  Typography,
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Recipient = ({
  recipientCountry,
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
  recipientNeedsPickup,
  setRecipientNeedsPickup,
  recipientPickupDate,
  setRecipientPickupDate,
  recipientErrors,
  handleRecipientSubmit,
  handleRecipientPrevious,
}) => {
  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <PersonIcon sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h5">Recipient</Typography>
      </Box>
      <form onSubmit={handleRecipientSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Country"
            value={recipientCountry}
            onChange={(e) => setRecipientCountry(e.target.value)}
            fullWidth
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <PublicIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
          <TextField
            label="Company Name"
            value={recipientCompanyName}
            onChange={(e) => setRecipientCompanyName(e.target.value)}
            fullWidth
            sx={{ flex: 1 }}
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
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <PersonIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
        </Box>

        {/* Row 2: Address Line 1, Address Line 2, Address Line 3 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Address Line 1"
            value={recipientAddressLine1}
            onChange={(e) => setRecipientAddressLine1(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.addressLine1}
            helperText={recipientErrors.addressLine1}
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "red", mr: 1 }} /> }}
          />
          <TextField
            label="Address Line 2"
            value={recipientAddressLine2}
            onChange={(e) => setRecipientAddressLine2(e.target.value)}
            fullWidth
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
          <TextField
            label="Address Line 3"
            value={recipientAddressLine3}
            onChange={(e) => setRecipientAddressLine3(e.target.value)}
            fullWidth
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} /> }}
          />
        </Box>

        <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    mb: 2,
  }}
>
  <TextField
    label="Zip Code"
    value={recipientZipCode}
    onChange={(e) => setRecipientZipCode(e.target.value)}
    fullWidth
    required
    error={!!recipientErrors.zipCode}
    helperText={recipientErrors.zipCode}
    sx={{ flex: 1 }} // Ensure equal width
    InputProps={{ startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} /> }}
  />
  <TextField
    label="City"
    value={recipientCity}
    onChange={(e) => setRecipientCity(e.target.value)}
    fullWidth
    required
    error={!!recipientErrors.city}
    helperText={recipientErrors.city}
    sx={{ flex: 1 }} // Ensure equal width
    InputProps={{ startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} /> }}
  />
  {recipientCountry && (
    <Box sx={{ flex: 1 }}> {/* Wrap in a Box to apply flex */}
      <StateDropdown
        country={recipientCountry}
        state={recipientState}
        setState={setRecipientState}
        senderErrors={recipientErrors}
      />
    </Box>
  )}
</Box>


        {/* Row 4: Phone 1, Phone 2, Email Address */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Phone 1"
            value={recipientPhone1}
            onChange={(e) => setRecipientPhone1(e.target.value)}
            fullWidth
            required
            error={!!recipientErrors.phone1}
            helperText={recipientErrors.phone1}
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <PhoneIcon sx={{ color: "red", mr: 1 }} /> }}
          />
          <TextField
            label="Phone 2"
            value={recipientPhone2}
            onChange={(e) => setRecipientPhone2(e.target.value)}
            fullWidth
            sx={{ flex: 1 }}
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
            sx={{ flex: 1 }}
            InputProps={{ startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} /> }}
          />
        </Box>

        {/* Row 5: Location Type, Do You Need Pickup?, and Conditional Pickup Date */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel>Select Location Type</InputLabel>
            <Select
              value={recipientLocationType}
              onChange={(e) => setRecipientLocationType(e.target.value)}
              label="Select Location Type"
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel>Do You Need Pickup?</InputLabel>
            <Select
              value={recipientNeedsPickup}
              onChange={(e) => setRecipientNeedsPickup(e.target.value)}
              label="Do You Need Pickup?"
            >
              <MenuItem value="Yes - I Need Pickup Service">Yes - I Need Pickup Service</MenuItem>
              <MenuItem value="No - I Will Drop Off My Package">No - I Will Drop Off My Package</MenuItem>
            </Select>
          </FormControl>
          {recipientNeedsPickup === "Yes - I Need Pickup Service" ? (
            <TextField
              label="Pickup Date"
              type="date"
              value={recipientPickupDate || ""}
              onChange={(e) => setRecipientPickupDate(e.target.value)}
              fullWidth
              required
              error={!!recipientErrors.pickupDate}
              helperText={recipientErrors.pickupDate}
              sx={{ flex: 1 }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarTodayIcon sx={{ color: "red", mr: 1 }} />,
              }}
              inputProps={{
                min: today, // Restrict past dates
              }}
            />
          ) : (
            <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between" }}>
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
            sx={{ bgcolor: "#E91E63", "&:hover": { bgcolor: "#ed64a6" }, width: { xs: "100%", sm: "auto" } }}
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