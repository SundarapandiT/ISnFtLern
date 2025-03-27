import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "/SFL_logo.png";

const ForgotPassword = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          textAlign: "center",
          position: "relative",
          borderRadius: 2,
          boxShadow: 3,
          borderTop: "5px solid #d9040c",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          width={150}
          style={{ marginBottom: 20, justifySelf: "center" }}
        />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {/* You can add a title here if needed */}
        </Typography>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: <AccountCircleIcon sx={{ mr: 1, color: "gray" }} />,
          }}
        />

        {/* Dropdown */}
        <TextField
          select
          fullWidth
          label="Please Email My"
          variant="outlined"
          margin="normal"
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  // Style the dropdown menu
                  "& .MuiMenuItem-root": {
                    // Default style for menu items
                    padding: "8px 16px",
                    justifyContent: "flex-start", // Align text to the left in the dropdown
                    "&:hover": {
                      backgroundColor: "#1976d2", // Blue background on hover
                      color: "white", // White text on hover
                    },
                  },
                  "& .Mui-selected": {
                    // Style for the selected item in the dropdown menu
                    backgroundColor: "#1976d2", // Blue background for selected item
                    color: "white", // White text for selected item
                    "&:hover": {
                      backgroundColor: "#1565c0", // Slightly darker blue on hover for selected item
                    },
                  },
                },
              },
            },
            // Align the selected value to the left in the TextField
            sx: {
              textAlign: "left", // Aligns the selected value to the left in the TextField
            },
          }}
          sx={{
            // Style the TextField itself
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#1976d2", // Blue border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2", // Blue border when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1976d2", // Label color when focused
            },
          }}
        >
          <MenuItem value="username">Username</MenuItem>
          <MenuItem value="password">Password</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          SUBMIT
        </Button>

        {/* Back to Login */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="/auth/login-page"
            sx={{ color: "darkblue", textDecoration: "none" }}
          >
            Back to Login
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;