import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment, Box, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "/SFL_logo.png";
import { toast } from "react-hot-toast";
import axios from "axios";
import { api } from "../../utils/api";

import { PersonOutline as FaUser, LockOutlined as FaLock } from "@mui/icons-material";
import { BackgroundContainer,StyledPaper,StyledButton, linkStyle } from "../styles/AuthStyle";

import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    usernameErr: false,
    usernameHelperText: "",
    passwordErr: false,
    passwordHelperText: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!username.trim() || !password.trim()) {
      setError({
        usernameErr: !username.trim(),
        usernameHelperText: !username.trim() ? "Please enter username" : "",
        passwordErr: !password.trim(),
        passwordHelperText: !password.trim() ? "Please enter password" : "",
      });
      return;
    }
  
    setError({ usernameErr: false, usernameHelperText: "", passwordErr: false, passwordHelperText: "" });
  
    // Show loading toast
    const loadingToastId = toast.loading("Logging in...");
  
    try {
      const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
      if (!SECRET_KEY) {
        throw new Error("Encryption key is missing!");
      }
  
      // Encrypt the login credentials before sending them to the backend
      const encryptedData = {
        UserName: CryptoJS.AES.encrypt(username, SECRET_KEY).toString(),
        Password: CryptoJS.AES.encrypt(password, SECRET_KEY).toString(),
      };
  
      // Send the encrypted data to the backend without wrapping it in "data"
      const res = await axios.post(`${api.BackendURL}/users/UserLogin`, encryptedData);
      
      toast.dismiss(loadingToastId);
  
      // Check if the login was successful
      if (res.status === 200 && res.data?.user?.data) {
        const decryptedName = CryptoJS.AES.decrypt(res.data.user.data.p_name, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const decryptedEmail = CryptoJS.AES.decrypt(res.data.user.data.p_email, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const decryptedPhone = CryptoJS.AES.decrypt(res.data.user.data.p_phonenum, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const decryptedUsername = CryptoJS.AES.decrypt(res.data.user.data.p_username, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  
        sessionStorage.setItem("user", JSON.stringify({
          name: decryptedName,
          email: decryptedEmail,
          phone: decryptedPhone,
          username: decryptedUsername,
        }));
        console.log(res.data?.LKA);
     
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
        navigate("/admin/Scheduleshipment", { replace: true });
      } else {
        throw new Error(res.data?.message || "Invalid credentials");
      }
  
    } catch (error) {
      console.error("Login error:", error);
  
      toast.dismiss(loadingToastId);
  
      toast.error(error.response?.data?.message || error.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };  

    return (
      <BackgroundContainer>
        <StyledPaper elevation={3}>
          <img src={logo} alt="Logo" width={150} style={{ marginBottom: 20, justifySelf: "center" }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>

          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={error.usernameErr}
              helperText={error.usernameHelperText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser style={{ color: "gray", marginRight: 8 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error.passwordErr}
              helperText={error.passwordHelperText}
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
            <StyledButton
              type="submit"
              variant="contained"
              color="error"
              fullWidth
            >
              {/* {loading ? <CircularProgress size={24} /> : "LOG IN"} */}
              LOG IN
            </StyledButton>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2" component="a" href="/auth/forgotpassword-page" color="primary" sx={linkStyle}>
                Forgot Password?
              </Typography>
              <Typography variant="body2" color="primary" component="a" href="/auth/register-page" sx={linkStyle} >
                Don't have an account?
              </Typography>
            </Box>
          </form>
        </StyledPaper>
      </BackgroundContainer>
    );
  };

  export default LoginPage;