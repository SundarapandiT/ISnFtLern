import { React, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api";

import { isEmpty } from "../../utils/constant";

import { Box, Paper, TextField, Button, Typography, Link, InputAdornment, Grid, Popover, useMediaQuery, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


import { PersonOutline as FaUser, LockOutlined as FaLock } from "@mui/icons-material";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { CheckCircle, Cancel } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// import { PhoneOutlined as PhoneIcon } from "@mui/icons-material";
import MobileInput from "../MobileInput";

import { useRegister } from "../RegisterContext";
import CryptoJS from "crypto-js";


const RegisterPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeField, setActiveField] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const { registerDetails, setRegisterDetails } = useRegister();
  const navigate = useNavigate();
  const [state, setState] = useState({
    fullnameErr: false,
    usernameErr: false,
    emailErr: false,
    passwordErr: false,
    confirmpasswordErr: false,
    mobileErr: false,

    isloggedIn: false,
    Loading: false,

    username: "",
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",

    fullnameHelperText: "",
    usernameHelperText: "",
    emailHelperText: "",
    confirmpasswordHelperText: "",
    passwordHelperText: "",
    mobileHelperText: "",

    checkUserName: false,
    checkFullName: false,
    checkEmail: false,
    checkPassword: false,
    checkConfirmPassword: false,
    checkMobile: false,
    checkLetter: false,
    checkUpperCase: false,
    checkLowerCase: false,
    checkNumber: false,
    checkSpecialCharacter: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRegister = (e) => {
    const { name, value } = e.target;
    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  }

  const validate = () => {
    let isFormValid = true;
    let errors = {};

    if (isEmpty(registerDetails.fullname)) {
      isFormValid = false;
      errors.fullnameErr = true;
      errors.fullnameHelperText = "Please enter Full name";
    }
    if (isEmpty(registerDetails.username)) {
      isFormValid = false;
      errors.usernameErr = true;
      errors.usernameHelperText = "Please enter username";
    }
    if (isEmpty(registerDetails.mobile)) {
      isFormValid = false;
      errors.mobileErr = true;
      errors.mobileHelperText = "Please enter mobile number";
    }
    if (isEmpty(registerDetails.password)) {
      isFormValid = false;
      errors.passwordErr = true;
      errors.passwordHelperText = "Please enter password";
    }
    if (isEmpty(registerDetails.confirmpassword)) {
      isFormValid = false;
      errors.confirmpasswordErr = true;
      errors.confirmpasswordHelperText = "Please enter confirm password";
    }
    if (isEmpty(registerDetails.email)) {
      isFormValid = false;
      errors.emailErr = true;
      errors.emailHelperText = "Please enter email";
    }

    setState((prevState) => ({ ...prevState, ...errors }));
    return isFormValid;
  };

  const handleBlur = (event, type) => {
    let value = event.target.value;
    let errors = {};

    switch (type) {
      case "fullname":
        errors.checkFullName = true;
        if (isEmpty(value)) {
          errors.fullnameErr = true;
          errors.fullnameHelperText = "Please enter Full Name";
        } else if (value.trim() !== value) {
          errors.fullnameErr = true;
          errors.fullnameHelperText = "Please enter valid Full Name";
        } else {
          errors.fullname = value;
          errors.fullnameErr = false;
          errors.fullnameHelperText = "";
        }
        break;
      case "username":
        errors.checkUserName = true;
        if (isEmpty(value)) {
          errors.usernameErr = true;
          errors.usernameHelperText = "Please enter User Name";
        } else if (value.trim() !== value) {
          errors.usernameErr = true;
          errors.usernameHelperText = "Please enter valid User Name";
        }
        else {
          errors.username = value;
          errors.usernameErr = false;
          errors.usernameHelperText = "";
        }
        setTimeout(() => setAnchorEl(null), 100);
        break;
      case "email":
        errors.checkEmail = true;
        const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/gi;
        if (isEmpty(value)) {
          errors.emailErr = true;
          errors.emailHelperText = "Please enter Email";
        } else if (value.trim() !== value || !value.match(emailRegExp)) {
          errors.emailErr = true;
          errors.emailHelperText = "Please enter valid Email";
        } else {
          errors.email = value;
          errors.emailErr = false;
          errors.emailHelperText = "";
        }
        break;
      case "mobile":
        errors.checkMobile = true;
        const mobileRegExp = /^\+?[1-9]\d{8,14}$/;
        if (isEmpty(value)) {
          errors.mobileErr = true;
          errors.mobileHelperText = "Please enter Mobile Number";
        } else if (value.trim() !== value || !value.match(mobileRegExp)) {
          errors.mobileErr = true;
          errors.mobileHelperText = "Please enter valid Mobile Number";
        }
        else {
          errors.mobile = value;
          errors.mobileErr = false;
          errors.mobileHelperText = "";
        }
        break;
      case "password":
        errors.checkPassword = true;
        if (isEmpty(value)) {
          errors.passwordErr = true;
          errors.passwordHelperText = "Please enter Password";
        }
        else {
          // Update state properly using a single setState
          setState((prevState) => ({
            ...prevState,
            password: value,
            checkUpperCase: /[A-Z]/.test(value),
            checkLowerCase: /[a-z]/.test(value),
            checkNumber: /[0-9]/.test(value),
            checkSpecialCharacter: /[@\-_.]/.test(value),
            checkMinLength: value.length >= 8,
            passwordErr: false,
            passwordHelperText: "",
          }));
        }
        setTimeout(() => setAnchorEl(null), 100);

        break;
      case "confirmpassword":
        errors.checkConfirmPassword = true;
        if (isEmpty(value)) {
          errors.confirmpasswordErr = true;
          errors.confirmpasswordHelperText = "Please enter Confirm Password";
        } else if (value !== state.password) {
          errors.confirmpasswordErr = true;
          errors.confirmpasswordHelperText = "Password and Confirm Password do not match";
        } else {
          errors.confirmpassword = value;
          errors.confirmpasswordErr = false;
          errors.confirmpasswordHelperText = "";
        }
        break;
      default:
        break;
    }

    setState((prevState) => ({ ...prevState, ...errors }));
  };

  const sendMail = async () => {
    const loadingToast = toast.loading("Sending OTP...");
  
    try {
      const response = await axios.post(`${api.BackendURL}/users/EmailVerifyOtp`, {
        email: registerDetails.email,
      });
  
      const userMessage = response.data?.user?.message;
  
      if (userMessage === 'Email is already verified, no need to generate OTP.') {
        toast.error("Already registered with this email. Please login..", {
          position: "top-right",
          autoClose: 3000,
        });
        return { success: false, verified: true };
      } else if (userMessage === "OTP sent successfully") {
        toast.success("OTP sent successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        return { success: true, verified: false }; 
      } else {
        throw new Error(userMessage || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error?.response?.data?.message || "Failed to send OTP. Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: false, verified: false };
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();
    if (!validate()) return;
  
    const otpResult = await sendMail();
  
    if (otpResult.success && !otpResult.verified) {
      navigate("/emailverification");
      return; 
    }
    if (!otpResult.success && otpResult.verified) {
      // toast.error("Already registered with this email. Please login.");
      // navigate("/auth/login-page");
      return; 
    }
  
    if (otpResult.success) {
      try {
        const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
        if (!SECRET_KEY) throw new Error("Encryption key is missing!");
  
        const encryptedData = {
          Name: CryptoJS.AES.encrypt(registerDetails.fullname, SECRET_KEY).toString(),
          UserName: CryptoJS.AES.encrypt(registerDetails.username, SECRET_KEY).toString(),
          Password: CryptoJS.AES.encrypt(registerDetails.password, SECRET_KEY).toString(),
          Phone: CryptoJS.AES.encrypt(registerDetails.mobile, SECRET_KEY).toString(),
          Email: CryptoJS.AES.encrypt(registerDetails.email, SECRET_KEY).toString(),
        };
  
        const res = await axios.post(`${api.BackendURL}/users/UserRegisteration`, {
          data: encryptedData,
        });
  
        if (res.data.user?.message === "User Registration Successfully") {
          toast.success("Registered successfully!");
          navigate("/auth/login-page");
        } else {
          toast.error(res.data.user?.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      }
    }
  };
    
  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="gray.100"
      position="relative"
      px={isMobile ? 2 : 0}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0} left={0} right={0} bottom={0}
        sx={{ backgroundImage: "url('/login-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <Paper sx={{ p: isMobile ? 3 : 4, borderRadius: 2, boxShadow: 3, zIndex: 10, maxWidth: 400, width: "100%", borderTop: "5px solid #d9040c" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src="/SFL_logo.png" alt="SFL Worldwide" style={{ height: "3rem" }} />
        </Box>

        <form onSubmit={signUp}>
          <TextField
            fullWidth
            name="fullname"
            label="Full Name"
            // placeholder="Full Name"
            variant="outlined"
            margin="normal"
            value={registerDetails.fullname}
            onChange={(e) => {
              handleChange(e);
              handleRegister(e);
            }}
            onBlur={(e) => handleBlur(e, "fullname")}
            onFocus={() =>
              setState((prevState) => ({
                ...prevState,
                fullnameErr: false,
                fullnameHelperText: "",
                checkFullName: false,
              }))
            }
            error={state.fullnameErr}
            helperText={state.fullnameHelperText}
            InputProps={{
              startAdornment: <FaUser style={{ color: "gray", marginRight: 8 }} />,
              endAdornment: state.checkFullName ? (
                state.fullnameErr ? (
                  <CloseIcon style={{ color: "red" }} />
                ) : (
                  <DoneIcon style={{ color: "green" }} />
                )
              ) : null,
            }}
          />

          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              // placeholder="Username"
              variant="outlined"
              margin="normal"
              value={registerDetails.username}
              onChange={(e) => {
                handleChange(e);
                handleRegister(e);
              }}
              onBlur={(e) => { handleBlur(e, "username") }}
              onFocus={(e) => {
                setAnchorEl(e.currentTarget);
                setActiveField("username");
                setState((prevState) => ({
                  ...prevState,
                  usernameErr: false,
                  usernameHelperText: "",
                  checkUserName: false,
                }))
              }
              }
              error={state.usernameErr}
              helperText={state.usernameHelperText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser color="gray" />
                  </InputAdornment>
                ),
              }}
            />
            {activeField === "username" && (
              <>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  disableAutoFocus // Prevents focus lock on popover
                  disableEnforceFocus
                  disableRestoreFocus
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  sx={{ mt: 1 }}
                >
                  <Box sx={{ p: 2, maxWidth: 300 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Username must have:
                    </Typography>

                    {/* Validation Conditions */}
                    <Typography color={/[a-z]/.test(state.username) ? "green" : "red"} sx={{ display: "flex", alignItems: "center", fontSize: "0.855rem" }}>
                      {/[a-zA-Z]/.test(state.username) ? <CheckCircle color="success" /> : <Cancel color="error" />}
                      &nbsp; Must be letters a - z
                    </Typography>

                    <Typography color={state.username.length >= 8 && state.username.length <= 32 ? "green" : "red"} sx={{ display: "flex", alignItems: "center", fontSize: "0.855rem" }}>
                      {state.username.length >= 8 && state.username.length <= 32 ? <CheckCircle color="success" /> : <Cancel color="error" />}
                      &nbsp; Must be 8-32 characters long
                    </Typography>

                    <Typography color={/\d/.test(state.username) ? "green" : "red"} sx={{ display: "flex", alignItems: "center", fontSize: "0.855rem" }}>
                      {/\d/.test(state.username) ? <CheckCircle color="success" /> : <Cancel color="error" />}
                      &nbsp; Can contain numbers (0-9)
                    </Typography>

                    <Typography color={/[@\-_]/.test(state.username) ? "green" : "red"} sx={{ display: "flex", alignItems: "center", fontSize: "0.855rem" }}>
                      {/[@\-_]/.test(state.username) ? <CheckCircle color="success" /> : <Cancel color="error" />}
                      &nbsp; Can contain special characters (@, -, _)
                    </Typography>
                  </Box>
                </Popover>
              </>
            )}

          </Box>
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                // placeholder="Password"
                variant="outlined"
                margin="normal"
                value={registerDetails.password}
                onChange={(e) => {
                  handleChange(e);
                  handleRegister(e);
                }}
                onBlur={(e) => handleBlur(e, "password")}
                onFocus={(e) => {
                  setAnchorEl(e.currentTarget);
                  setActiveField("password");
                  setState((prevState) => ({
                    ...prevState,
                    passwordErr: false,
                    passwordHelperText: "",
                    checkPassword: false,
                  }))
                }}
                error={state.passwordErr}
                helperText={state.passwordHelperText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock color="gray" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} sx={{ padding: "5px" }}>
                        {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />{activeField === "password" && (
                <>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: isMobile ? "left" : "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    disableAutoFocus
                    disableEnforceFocus
                    disableRestoreFocus
                    sx={{ mt: 2, ml: 3 }}
                  >
                    <Box sx={{ p: 1.5, maxWidth: 280 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "0.875rem" }}>
                        Password must have:
                      </Typography>

                      {/* Validation Conditions */}
                      <Typography color={/[A-Z]/.test(state.password) ? "green" : "red"} sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                        {/[A-Z]/.test(state.password) ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="error" fontSize="small" />}
                        &nbsp; At least one uppercase letter (A-Z)
                      </Typography>

                      <Typography color={/[a-z]/.test(state.password) ? "green" : "red"} sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                        {/[a-z]/.test(state.password) ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="error" fontSize="small" />}
                        &nbsp; At least one lowercase letter (a-z)
                      </Typography>

                      <Typography color={/[0-9]/.test(state.password) ? "green" : "red"} sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                        {/[0-9]/.test(state.password) ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="error" fontSize="small" />}
                        &nbsp; At least one number (0-9)
                      </Typography>

                      <Typography color={/[@\-_.]/.test(state.password) ? "green" : "red"} sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                        {/[@\-_.]/.test(state.password) ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="error" fontSize="small" />}
                        &nbsp; At least one special character (@, #, $, etc.)
                      </Typography>

                      <Typography color={state.password.length >= 8 ? "green" : "red"} sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                        {state.password.length >= 8 ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="error" fontSize="small" />}
                        &nbsp; Minimum 8 characters
                      </Typography>
                    </Box>
                  </Popover></>
              )}

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                label="Confirm Password"
                // placeholder="Confirm Password"
                variant="outlined"
                margin="normal"
                value={registerDetails.confirmpassword}
                onChange={(e) => {
                  handleChange(e);
                  handleRegister(e);
                }}
                onBlur={(e) => handleBlur(e, "confirmpassword")}
                onFocus={() =>
                  setState((prevState) => ({
                    ...prevState,
                    confirmpasswordErr: false,
                    confirmpasswordHelperText: "",
                    checkConfirmPassword: false,
                  }))
                }
                error={state.confirmpasswordErr}
                helperText={state.confirmpasswordHelperText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock color="gray" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} sx={{ padding: "5px" }}>
                        {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <MobileInput
            registerDetails={registerDetails}
            handleChange={handleChange}
            handleRegister={handleRegister}
            handleBlur={handleBlur}
            setState={setState}
            state={state}
          />



          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email Address"
            // placeholder="Email Address"
            variant="outlined"
            value={registerDetails.email}
            margin="normal"
            onChange={(e) => {
              handleChange(e);
              handleRegister(e);
            }}
            onBlur={(e) => handleBlur(e, "email")}
            onFocus={() =>
              setState((prevState) => ({
                ...prevState,
                emailErr: false,
                emailHelperText: "",
                checkEmail: false,
              }))
            }
            error={state.emailErr}
            helperText={state.emailHelperText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon color="gray" />
                </InputAdornment>
              ),
              // endAdornment: state.email.includes("@") ? (
              //   <Button
              //     variant="contained"
              //     sx={{ backgroundColor: "Green" }} onClick={sendMail}>Verify</Button>
              // ) : null,
            }}
          />

          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "red", boxShadow: "1px 1px 3px red" }}
            // disabled={emailVerify ? false : true}
            onClick={signUp}

          >
            SIGN UP
          </Button>
        </form>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2" color="primary" component="a" href="/auth/login-page" sx={{ color: "darkblue", textDecoration: "none", fontWeight: 400 }} >
            Already have an account?
          </Typography></Box>
      </Paper>
    </Box>

  );

}
export default RegisterPage;
