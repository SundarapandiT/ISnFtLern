import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useRegister } from "../RegisterContext";
import axios from "axios";
import { api } from "../../utils/api";
import CryptoJS from "crypto-js";
import { BackgroundContainer, CloseButton, emailverifyContainer, StyledButton, StyledPaper,emailLogoBox } from "../styles/AuthStyle";
// import { Person } from "@mui/icons-material";


const EmailVerification = () => {
  const {  registerDetails } = useRegister();
  const personid=sessionStorage.getItem("PersonID")||"";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [filled, setFilled] = useState(new Array(6).fill(false));
  const [open, setOpen] = useState(true);
  const inputRefs = useRef([]);
  const [disable, setdisable] = useState(false);

  const handleChange = (e, index) => {
    let value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newOtp = [...otp];
      let newFilled = [...filled];
      newOtp[index] = value;
      newFilled[index] = value !== "";
      setOtp(newOtp);
      setFilled(newFilled);


      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  const validateOtp = async (enteredOtp) => {
    const loadingToast = toast.loading("Verifying OTP...");
    try {
      const response = await axios.post(`${api.BackendURL}/users/verifyOtp`, {
        email: registerDetails.email,
        otp_code: enteredOtp,
      });
  
      if (response.status === 200 && response.data.status === "verified") {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
  
        setdisable(true);
  
        try {
          const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
          if (!SECRET_KEY) throw new Error("Encryption key is missing!");
        
          const registerToast = toast.loading("Registering user...");
        
          const encrypt = (text) => CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
        
          const encryptedData = {
            Name: encrypt(registerDetails.fullname),
            UserName: encrypt(registerDetails.username),
            Password: encrypt(registerDetails.password),
            Phone: encrypt(registerDetails.mobile),
            Email: encrypt(registerDetails.email),
            PersonID: encrypt(personid)       };
          const res = await axios.post(`${api.BackendURL}/users/UserRegisteration`, {
            data: encryptedData,
          });
        
          toast.dismiss(registerToast); // dismiss after response
        
          if (res.status === 200 && res.data.user?.message === "User Registration Successfully") {
            toast.success("Registered successfully!");
            
            navigate("/auth/login-page");
          } else {
            toast.error(res.data.user?.message || "Registration failed");
          }
        
        } catch (error) {
          toast.dismiss(); 
          console.error("Registration Error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong!");
        }        
  
      } else {
        throw new Error("OTP verification failed");
      }
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  
  const sendMail = async () => {
    const loadingToast = toast.loading("Sending OTP...");

    try {
      const response = await axios.post(`${api.BackendURL}/users/EmailVerifyOtp`, {
        email: registerDetails.email,
      });

      if (response.status === 200) {
        toast.dismiss(loadingToast);
        const message = response.data?.message;
        const userMessage = response.data?.user?.message;


        if (message === "Email is already verified, no need to generate OTP") {
          toast.info("Email is already registered and verified.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (userMessage === "OTP sent successfully") {
          toast.success("OTP sent successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          throw new Error("Failed to send OTP");
        }
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.dismiss(loadingToast);

      toast.error("Failed to send OTP. Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }


  useEffect(() => {
    if (!open) {
      navigate("/auth/register-page");
    }
  }, [open, navigate]);

  return (
    <>
      <BackgroundContainer
        position="absolute"
        top={0} left={0} right={0} bottom={0}
      />
      <Container maxWidth="sm" sx={emailverifyContainer}>
        <StyledPaper elevation={3}>
          <Box sx={emailLogoBox}>
            <img src="/3001931.jpg" alt="Email Verification" width={isMobile ? 60 : 200} height={isMobile ? 60 : 200} />
          </Box>
          <CloseButton
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </CloseButton>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} gutterBottom>
            Verify Your Email Address
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Please enter the 6-digit code sent to your email.
          </Typography>
          <Grid container spacing={1} justifyContent="center" sx={{ flexWrap: "nowrap" }}>
            {otp.map((digit, index) => (
              <Grid item key={index}>
                <TextField
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                  inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "1.5rem" } }}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  sx={{
                    width: isMobile ? 40 : 50,
                    height: isMobile ? 40 : 60,
                    backgroundColor: filled[index] ? "#f0f0f0" : "white"
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" mt={2}>
            Want to change your email? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => { navigate('/auth/register-page') }}>Change Here</Typography>
          </Typography>
          <StyledButton
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => validateOtp(otp.join(""))}
            disabled={disable}
            sx={{p:1.5}}
          >
            Verify Email
          </StyledButton>
          <Typography variant="body2" mt={2} color="primary" sx={{ cursor: "pointer" }} onClick={sendMail}>
            Resend Code
          </Typography>
        </StyledPaper>
      </Container></>

  );
};

export default EmailVerification;
