import React, { useState, useEffect } from "react";
import { Box,Typography, TextField, InputAdornment, IconButton} from "@mui/material";
import { FaLock } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom"; // for location and navigation
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "/SFL_logo.png";
import { api } from "../../utils/api"; 
import CryptoJS from "crypto-js";
import { BackgroundContainer,StyledPaper,StyledButton,linkStyle } from "../styles/AuthStyle";


const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    newPasswordErr: false,
    newPasswordHelperText: "",
    confirmPasswordErr: false,
    confirmPasswordHelperText: "",
  });

  // Extract 'key' from query params
  const queryParams = new URLSearchParams(location.search);
  const resetKey = queryParams.get('key');  // This is the key passed in the URL

  useEffect(() => {
    if (!resetKey) {
      toast.error("Invalid or missing reset key.");
      navigate("/auth/login-page");  // Redirect to login page if key is missing
    }
  }, [resetKey, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    // Clear previous error states
    setError({
      newPasswordErr: false,
      newPasswordHelperText: "",
      confirmPasswordErr: false,
      confirmPasswordHelperText: "",
    });
  
    // Frontend validation
    if (newPassword.length < 6) {
      setError((prev) => ({
        ...prev,
        newPasswordErr: true,
        newPasswordHelperText: "Password must be at least 6 characters",
      }));
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPasswordErr: true,
        confirmPasswordHelperText: "Passwords do not match",
      }));
      return;
    }
  
    try {
      const loadingToast = toast.loading("Resetting password...");
      const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  
      if (!SECRET_KEY) {
        throw new Error("Encryption key is missing from environment variables!");
      }
  
      // Encrypt the password
      const encryptedPassword = CryptoJS.AES.encrypt(newPassword, SECRET_KEY).toString();
  
      // Send POST request to backend
      const res = await axios.post(`${api.BackendURL}/users/resetPassword`, {
        newPassword: encryptedPassword,
        email: resetKey, // assuming resetKey contains email or reset token from query param
      });
  
      console.log("Response from reset password:", res.data);
  
      // Handle response
      if (res.data.user?.message === "Updated Successfully") {
        toast.dismiss(loadingToast);
        toast.success("Password has been reset successfully!");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/auth/login-page"); // redirect to login page
      } else {
        toast.dismiss(loadingToast);
        toast.error(res.data.user?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Reset error:", err);
      toast.dismiss(loadingToast);
      toast.error("Failed to reset password");
    }
  };
  

  return (
    <BackgroundContainer>
      <StyledPaper elevation={3} >
        <img src={logo} alt="Logo" width={150} style={{ marginBottom: 20 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={error.newPasswordErr}
            helperText={error.newPasswordHelperText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock color="gray" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error.confirmPasswordErr}
            helperText={error.confirmPasswordHelperText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock color="gray" />
                </InputAdornment>
              ),
            }}
          />
          <StyledButton type="submit" variant="contained" color="error" fullWidth >
            Reset Password
          </StyledButton>
          <Box display="flex" justifyContent="center" mt={2}>
        <Typography
          variant="body2"
          color="primary"
          component="a"
          href="/auth/login-page"
          sx={linkStyle}
        >
          Back to Login
        </Typography>
      </Box>
        </form>
      </StyledPaper>
    </BackgroundContainer>
  );
};

export default ResetPassword;
