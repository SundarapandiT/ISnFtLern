import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CryptoJS from "crypto-js";
import axios from "axios";
import { api } from "../../utils/api";
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
  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    requestType: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

      if (!SECRET_KEY) {
        throw new Error("Encryption key is missing!");
      }
      const payload = {
        email: CryptoJS.AES.encrypt(formData.email, SECRET_KEY).toString(),
        selectedEmailMy: CryptoJS.AES.encrypt(formData.requestType, SECRET_KEY).toString(),
      };
      const res = await axios.post(`${api.BackendURL}/forget`, {
        data: payload,
      });
      if (res.data.success) {
        toast.success(" Verification email sent successfully!");
      } else {
        toast.error(res.data.message || "Cant sent to mail");
      }
    } catch (error) {
      console.error("verification send error:", error);
      toast.error(error.message || "Something went wrong");
    }
  }

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
        name="email"
        value={formData.email}
        onChange={handleChange}
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
        name="requestType"
        value={formData.requestType}
        onChange={handleChange}
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

          sx: {
            textAlign: "left",
          },
        }}
        sx={{
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
        onClick={handleSubmit}
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