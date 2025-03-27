import React from "react";
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
  recipientErrors,
  usStates,
  handleRecipientSubmit,
  handleRecipientPrevious,
}) => {
  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <PersonIcon sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h5">Recipient</Typography>
      </Box>
      <form onSubmit={handleRecipientSubmit}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 2 }}>
          <TextField label="Country" value={recipientCountry} onChange={(e) => setRecipientCountry(e.target.value)} fullWidth InputProps={{ startAdornment: <PublicIcon sx={{ color: "action.active", mr: 1 }} /> }} />
          <TextField label="Company Name" value={recipientCompanyName} onChange={(e) => setRecipientCompanyName(e.target.value)} fullWidth InputProps={{ startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} /> }} />
          <TextField label="Contact Name" value={recipientContactName} onChange={(e) => setRecipientContactName(e.target.value)} fullWidth required error={!!recipientErrors.contactName} helperText={recipientErrors.contactName} InputProps={{ startAdornment: <PersonIcon sx={{ color: "action.active", mr: 1 }} /> }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 2 }}>
          <TextField label="Address Line 1" value={recipientAddressLine1} onChange={(e) => setRecipientAddressLine1(e.target.value)} fullWidth required error={!!recipientErrors.addressLine1} helperText={recipientErrors.addressLine1} InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "red", mr: 1 }} /> }} />
          <TextField label="Address Line 2" value={recipientAddressLine2} onChange={(e) => setRecipientAddressLine2(e.target.value)} fullWidth InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} /> }} />
          <TextField label="Address Line 3" value={recipientAddressLine3} onChange={(e) => setRecipientAddressLine3(e.target.value)} fullWidth InputProps={{ startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} /> }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 2 }}>
          <TextField label="Zip Code" value={recipientZipCode} onChange={(e) => setRecipientZipCode(e.target.value)} fullWidth required error={!!recipientErrors.zipCode} helperText={recipientErrors.zipCode} InputProps={{ startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} /> }} />
          <TextField label="City" value={recipientCity} onChange={(e) => setRecipientCity(e.target.value)} fullWidth required error={!!recipientErrors.city} helperText={recipientErrors.city} InputProps={{ startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} /> }} />
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select value={recipientState} onChange={(e) => setRecipientState(e.target.value)} label="State" required error={!!recipientErrors.state}>
              <MenuItem value="">Select State</MenuItem>
              {usStates.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.label}
                </MenuItem>
              ))}
            </Select>
            {recipientErrors.state && <Typography color="error" variant="caption">{recipientErrors.state}</Typography>}
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 2 }}>
          <TextField label="Phone 1" value={recipientPhone1} onChange={(e) => setRecipientPhone1(e.target.value)} fullWidth required error={!!recipientErrors.phone1} helperText={recipientErrors.phone1} InputProps={{ startAdornment: <PhoneIcon sx={{ color: "red", mr: 1 }} /> }} />
          <TextField label="Phone 2" value={recipientPhone2} onChange={(e) => setRecipientPhone2(e.target.value)} fullWidth InputProps={{ startAdornment: <PhoneIcon sx={{ color: "action.active", mr: 1 }} /> }} />
          <TextField label="Email Address" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} fullWidth required error={!!recipientErrors.email} helperText={recipientErrors.email} InputProps={{ startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} /> }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleRecipientPrevious} sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 1, sm: 0 } }}>Previous</Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#eb0c40", "&:hover": { bgcolor: "#ed64a6" }, width: { xs: "100%", sm: "auto" } }} endIcon={<ArrowForwardIcon />}>Next</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Recipient;
