import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, useMediaQuery, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; 
import { useRegister } from "../RegisterContext";
import axios from "axios";


const EmailVerification = () => {
    const {emailVerify,setEmailVerify,registerDetails}=useRegister();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [filled, setFilled] = useState(new Array(6).fill(false));
  const [open, setOpen] = useState(true);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const inputRefs = useRef([]);
  const otpGenerated = useRef(false);

  async function generateOTP()
  {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      console.log("Generated OTP:", newOtp);
      toast.success("OTP sent to Your Mail", {
        position: "top-right", 
        duration: 3000,        
      });
  }

  // async function generateOTP() {
  //   const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  //   setGeneratedOtp(newOtp); 
  
  //   console.log("Generated OTP:", newOtp);
  
  //   try {
  //     const response = await axios.post("http://localhost:5000/send-email", {
  //       email: registerDetails.email, 
  //       otp: newOtp,                   
  //     });
  
  //     if (response.status === 200 && response.data.message) {
  //       toast.success(response.data.message, {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
     
  //     } else {
  //       throw new Error("Email sending failed");
  //     }
  
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  
  //     toast.error("Failed to send OTP. Try again.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // }
  


  useEffect(() => {
    if (!otpGenerated.current) {
    generateOTP();
      otpGenerated.current = true;  
    }
  }, []);
  

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

      // Validate OTP when last digit is entered
      // if (index === 5 && value !== "") {
      //   validateOtp(newOtp.join(""));
      // }
    }
  };

 
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Validate OTP (Replace with actual validation logic)
  const validateOtp = (enteredOtp) => {
    if (enteredOtp === generatedOtp) {
      // alert("✅ OTP Verified Successfully!");
      toast.success(" OTP Verified Successfully!");
      setEmailVerify(true);
      navigate('/auth/register-page');
    } else {
      // alert("❌ Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.");

    }
  };

  useEffect(() => {
    if (!open) {
      navigate("/auth/register-page");
    }
  }, [open, navigate]);

  return (
    <>
    <Box 
            position="absolute" 
            top={0} left={0} right={0} bottom={0} 
            sx={{ backgroundImage: "url('/login-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
          />
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ padding: isMobile ? 2 : 4, borderRadius: 3, textAlign: "center", position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="/3001931.jpg" alt="Email Verification" width={isMobile ? 60 : 200} height={isMobile ? 60 : 200} />
        </Box>
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, "&:hover": { color: "red" } }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
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
          Want to change your email? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={()=>{navigate('/auth/register-page')}}>Change Here</Typography>
        </Typography>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={() => validateOtp(otp.join(""))}
          sx={{ mt: 3, borderRadius: 3, padding: 1.5, backgroundColor: "red" }}
        >
          Verify Email
        </Button>
        <Typography variant="body2" mt={2} color="primary" sx={{ cursor: "pointer" }} onClick={generateOTP}>
          Resend Code
        </Typography>
      </Paper>
    </Container></>
     
  );
};

export default EmailVerification;
