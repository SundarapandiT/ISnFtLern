import React from "react";
import {  Box, TextField, MenuItem, Button, Typography, Paper } from "@mui/material";
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
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, textAlign: "center", position: "relative",borderRadius: 2, boxShadow: 3,borderTop: "5px solid #d9040c" }}>
        {/* <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "5px", backgroundColor: "red" }} /> */}
        <img src={logo} alt="Logo" width={150} style={{ marginBottom: 20 ,justifySelf:"center"}} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          
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
        >
          <MenuItem value="password">Password</MenuItem>
          <MenuItem value="username">Username</MenuItem>
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
        <Typography variant="body2"  color="primary"  component="a" href="/auth/login-page"  sx={{ color: "darkblue",textDecoration: "none" }} >
          Back to Login
        </Typography></Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
