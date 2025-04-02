import { React } from "react";
import { Box, TextField, Typography, Button, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StateDropdown from "./Statedropdown";

const Sender = ({
  country,
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
  senderErrors,
  handleSenderSubmit,
  handlePrevious
}) => {

  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <PersonIcon sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h5">Sender</Typography>
      </Box>
      <form onSubmit={handleSenderSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack fields in mobile view
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <PublicIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
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
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
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
            label="Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.addressLine1}
            helperText={senderErrors.addressLine1}
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
          <TextField
            label="Address Line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          <TextField
            label="Address Line 3"
            value={addressLine3}
            onChange={(e) => setAddressLine3(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
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
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.zipCode}
            helperText={senderErrors.zipCode}
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
            InputProps={{
              startAdornment: <BusinessIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
          {country && (
            <StateDropdown
              country={country}
              state={state}
              setState={setState}
              senderErrors={senderErrors}
            />)}
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
            label="Phone 1"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            fullWidth
            required
            error={!!senderErrors.phone1}
            helperText={senderErrors.phone1}
            InputProps={{
              startAdornment: <PhoneIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
          <TextField
            label="Phone 2"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            fullWidth
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
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: "red", mr: 1 }} />,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevious}
            sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 1, sm: 0 }, bgcolor: "#999999", "&:hover": { bgcolor: "#666666" }, color: "white" }}
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
