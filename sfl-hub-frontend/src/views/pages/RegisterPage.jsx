import {React, useState} from "react";
// import cogoToast from "cogo-toast";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import api from "../../utils/apiClient";
// import SimpleBackdrop from "../../utils/general";
import moment from "moment";
import { CommonConfig } from "../../utils/constant";

// Material UI components
import { Box, Paper, TextField, Button, Typography, Link, InputAdornment, Grid, Popover,useMediaQuery } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import InputAdornment from "@mui/material/InputAdornment";
// import Icon from "@mui/material/Icon";
// import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";

// Material UI Icons
import { FaUser, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { red, green } from "@mui/material/colors";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";

// import { green, red } from "@mui/material/colors";
// import CloseIcon from "@mui/icons-material/Close";
// import DoneIcon from "@mui/icons-material/Done";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";

// Core Components
// import GridContainer from "../../components/Grid/GridContainer";
// import GridItem from "../../components/Grid/GridItem";
// import Button from "../../components/CustomButtons/Button.js";.
// import CustomInput from "../../components/CustomInput/CustomInput";
// import Card from "../../components/Card/Card";
// import CardBody from "../../components/Card/CardBody";


// Styles
// import styles from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";


// Image
// import image from "assets/img/left-SIGNUP-image.png";


// const useStyles = makeStyles(styles);
import { useRegister } from "../RegisterContext";
import CryptoJS from "crypto-js";


const RegisterPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeField, setActiveField] = useState(""); 
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate=useNavigate();
  const {emailVerify,setEmailVerify, registerDetails, setRegisterDetails}=useRegister();
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
  const handleRegister = (e)=>
  {
    const { name, value } = e.target;
    setRegisterDetails({
      ...registerDetails,
      [name]: value,
  });
  }
  // console.log(registerDetails);
  const validate = () => {
    let isFormValid = true;
    let errors = {};

    if (CommonConfig.isEmpty(registerDetails.fullname)) {
      isFormValid = false;
      errors.fullnameErr = true;
      errors.fullnameHelperText = "Please enter Full name";
    }
    if (CommonConfig.isEmpty(registerDetails.username)) {
      isFormValid = false;
      errors.usernameErr = true;
      errors.usernameHelperText = "Please enter username";
    }
    if (CommonConfig.isEmpty(registerDetails.mobile)) {
      isFormValid = false;
      errors.mobileErr = true;
      errors.mobileHelperText = "Please enter mobile number";
    }
    if (CommonConfig.isEmpty(registerDetails.password)) {
      isFormValid = false;
      errors.passwordErr = true;
      errors.passwordHelperText = "Please enter password";
    }
    if (CommonConfig.isEmpty(registerDetails.confirmpassword)) {
      isFormValid = false;
      errors.confirmpasswordErr = true;
      errors.confirmpasswordHelperText = "Please enter confirm password";
    }
    if (CommonConfig.isEmpty(registerDetails.email)) {
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
        if (CommonConfig.isEmpty(value)) {
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
        if (CommonConfig.isEmpty(value)) {
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
        if (CommonConfig.isEmpty(value)) {
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
        const mobileRegExp = /^[0-9]{10,15}$/;
        if (CommonConfig.isEmpty(value)) {
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
        if (CommonConfig.isEmpty(value)) {
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
        if (CommonConfig.isEmpty(value)) {
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
  const signUp = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
        if (!SECRET_KEY) {
          throw new Error("Encryption key is missing!");
        }
        const encryptedData = {
          Name: CryptoJS.AES.encrypt(registerDetails.fullname, SECRET_KEY).toString(),
          UserName: CryptoJS.AES.encrypt(registerDetails.username, SECRET_KEY).toString(),
          Password: CryptoJS.AES.encrypt(registerDetails.password, SECRET_KEY).toString(),
          Phone: CryptoJS.AES.encrypt(registerDetails.mobile, SECRET_KEY).toString(),
          Email: CryptoJS.AES.encrypt(registerDetails.email, SECRET_KEY).toString(),
        };
  
        console.log((encryptedData));

        // const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        // const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        // console.log(JSON.parse(decryptedString));
        // Send encrypted data to backend
        // const res = await axios.post("http://localhost:5000/api/submit", {
        //   data: encryptedData,
        // });
  
        // if (res.data.success) {
        //   toast.success("Registration successful!");
        // } else {
        //   toast.error(res.data.message || "Registration failed");
        // }
      } catch (error) {
        console.error("Sign-up error:", error);
        toast.error(error.message || "Something went wrong");
      }
    }
  }

  const login = async (data) => {
    try {
      const res = await api.post("authentication/userLoginAuthenticate", data);
      if (res.success) {
        setState((prevState) => ({ ...prevState, Loading: true, isloggedIn: true }));

        let timeZone = moment.tz.guess();
        const time = moment.tz(res.Data.LastLoginTimestamp);
        const date = time.clone().tz(timeZone);
        let formatDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
        formatDate = moment(formatDate).add(30, "minutes");
        res.Data.LastLoginTimestamp = moment(formatDate).format("YYYY-MM-DD HH:mm:ss");

        localStorage.setItem("loggedInUserData", JSON.stringify(res.Data));
        
        setTimeout(() => {
          window.location.href = "/admin/Scheduleshipment";
        }, 4000);
      } else {
        setState((prevState) => ({ ...prevState, Loading: false }));
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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

      <Paper sx={{  p: isMobile ? 3 : 4, borderRadius: 2, boxShadow: 3, zIndex: 10, maxWidth: 400, width: "100%",borderTop: "5px solid #d9040c" }}>
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
            onBlur={(e) =>{handleBlur(e, "username")}}
            onFocus={(e) =>{
              setAnchorEl(e.currentTarget);
              setActiveField("username");
              setState((prevState) => ({
                ...prevState,
                usernameErr: false,
                usernameHelperText: "",
                checkUserName: false,
              }))}
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
          {activeField==="username" && (
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
          <Typography color={/[a-z]/.test(state.username) ? "green" : "red"} sx={{ display: "flex", alignItems: "center" , fontSize: "0.855rem"}}>
            {/[a-zA-Z]/.test(state.username) ? <CheckCircle color="success" /> : <Cancel color="error" />}
            &nbsp; Must be letters a - z
          </Typography>

          {/* <Typography color={state.username.trim() === state.username ? "green" : "red"} sx={{ display: "flex", alignItems: "center" }}>
            {state.username.trim() === state.username ? <CheckCircle color="success" /> : <Cancel color="error" />}
            &nbsp; No leading or trailing spaces
          </Typography> */}

          <Typography color={state.username.length >= 8 && state.username.length <= 32 ? "green" : "red"} sx={{ display: "flex", alignItems: "center" , fontSize: "0.855rem"}}>
            {state.username.length >= 8 && state.username.length <= 32 ? <CheckCircle color="success" /> : <Cancel color="error" />}
            &nbsp; Must be 8-32 characters long
          </Typography>

          <Typography color={/\d/.test(state.username) ? "green" : "red"} sx={{ display: "flex", alignItems: "center", fontSize: "0.855rem" }}>
            {/\d/.test(state.username)? <CheckCircle color="success" /> : <Cancel color="error" />}
            &nbsp; Can contain numbers (0-9)
          </Typography>

          <Typography color={/[@\-_]/.test(state.username) ? "green" : "red"} sx={{ display: "flex", alignItems: "center", fontSize: "0.855rem" }}>
            {/[@\-_]/.test(state.username)? <CheckCircle color="success" /> : <Cancel color="error" />}
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
      type="password"
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
      onFocus={(e) =>{
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
      }}
    />{activeField==="password" && (
      <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: isMobile? "left":"center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        sx={{ mt: 2,ml:3 }}
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

          <Typography color={/[@\-_.]/.test(state.password)? "green" : "red"} sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
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
      type="password"
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
      }}
    />
  </Grid>
</Grid>
<TextField
            fullWidth
            name="mobile"
            label="Contact Number"
            // placeholder="Contact Number"
            variant="outlined"
            margin="normal"
            value={registerDetails.mobile}
            onChange={(e) => {
              handleChange(e);
              handleRegister(e);
          }}
            onBlur={(e) => handleBlur(e, "mobile")}
            onFocus={() =>
              setState((prevState) => ({
                ...prevState,
                mobileErr: false,
                mobileHelperText: "",
                checkMobile: false,
              }))
            }
            error={state.mobileErr}
            helperText={state.mobileHelperText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <PhoneIcon color="action" />
              </InputAdornment>
              ),
            }}
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
                  <FaEnvelope color="gray" />
                </InputAdornment>
              ),
              endAdornment: state.email.includes("@") ? (
                <Button  
                variant="contained" 
                sx={{ backgroundColor: "Green" }} onClick={()=>{navigate('/emailverification')}}>Verify</Button>
              ) : null,
            }}
          />

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 2, backgroundColor: "red" ,boxShadow:"1px 1px 3px red"}} 
            disabled={emailVerify?false:true}
          >
            SIGN UP
          </Button>
        </form>

        <Typography align="center" mt={2} color="textSecondary">
          Already have an account?{" "}
          <Link component={NavLink} to="/login" color="primary">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
    
   
    
    // <div className="signup-page-outer">
    //     {state.Loading === true ? (
    //       <div className="loading">
    //         <SimpleBackdrop />
    //       </div>
    //     ) : null}
    //     <GridContainer justify="center">
    //       <GridItem className="signup-page-outer2">
    //         <Card className="Signup-main-outer">
    //           <CardBody className="Signup-main-inner">
    //             <GridContainer>
    //               <GridItem
    //                 xs={12}
    //                 sm={12}
    //                 md={6}
    //                 className="signup-left-section"
    //               >
    //                 <div className="signup-left-outer">
    //                   <div className="signup-left-inner">
    //                     <div className="signup-left-text">
    //                       <h2>Introducing Ship Smart with SFL Worldwide</h2>
    //                       <p>
    //                         One Stop Hub for all Domestic & International
    //                         Shipping and Moving Services
    //                       </p>
    //                       <img src={image} alt="SFL Worldwide" />
    //                     </div>
    //                   </div>
    //                 </div>
    //               </GridItem>
    //               <GridItem xs={12} sm={12} md={6}>
    //                 <div className="login-logo"></div>
    //                 <form className="signup-form-outer">
    //                   <CustomInput
    //                     labelText={<span>Full Name</span>}
    //                     id="fullname"
    //                     name="fullname"
    //                     variant="outlined"
    //                     error={state.fullnameErr}
    //                     helperText={state.fullnameHelperText}
    //                     formControlProps={{ fullWidth: true }}
    //                     inputProps={{
    //                       onBlur: (event) => handleBlur(event, "fullname"),
    //                       onFocus: () =>
    //                         setState({
    //                           fullnameErr: false,
    //                           fullnameHelperText: "",
    //                           checkFullName: false,
    //                         }),
    //                       endAdornment:
    //                         checkFullName !== true ? (
    //                           <Icon>person</Icon>
    //                         ) : fullnameErr ? (
    //                           <InputAdornment position="end">
    //                             <CloseIcon
    //                               style={{ color: red[500] }}
    //                               className={useStyles.danger}
    //                             />
    //                           </InputAdornment>
    //                         ) : (
    //                           <InputAdornment position="end">
    //                             {" "}
    //                             <DoneIcon
    //                               style={{ color: green[500] }}
    //                               className={useStyles.success}
    //                             />
    //                           </InputAdornment>
    //                         ),
    //                     }}
    //                   />

    //                   <CustomInput
    //                     labelText="User Name"
    //                     id="username"
    //                     error={state.usernameErr}
    //                     helperText={state.usernameHelperText}
    //                     formControlProps={{ fullWidth: true }}
    //                     inputProps={{
    //                       onBlur: (event) => handleBlur(event, "username"),
    //                       onFocus: () =>
    //                         setState({
    //                           usernameErr: false,
    //                           usernameHelperText: "",
    //                           checkUserName: false,
    //                         }),
    //                       endAdornment:
    //                         checkUserName !== true ? (
    //                           <Icon>person</Icon>
    //                         ) : usernameErr ? (
    //                           <InputAdornment position="end">
    //                             <CloseIcon
    //                               style={{ color: red[500] }}
    //                               className={useStyles.danger}
    //                             />
    //                           </InputAdornment>
    //                         ) : (
    //                           <InputAdornment position="end">
    //                             {" "}
    //                             <DoneIcon
    //                               style={{ color: green[500] }}
    //                               className={useStyles.success}
    //                             />
    //                           </InputAdornment>
    //                         ),
    //                     }}
    //                   />

    //                   <GridContainer>
    //                     <GridItem xs={12} sm={6} md={6} className="pln">
    //                       <MDBContainer>
    //                         <MDBPopover
    //                           className="ps-popover-outer"
    //                           placement="bottom"
    //                           popover
    //                           id="popper1"
    //                         >
    //                           <FormControl fullWidth className="pass-input">
    //                             <TextField
    //                               label="Password"
    //                               id="password"
    //                               type="password"
    //                               error={state.passwordErr}
    //                               value={state.password}
    //                               formControlProps={{ fullWidth: true }}
    //                               aria-describedby="simple-popover"
    //                               helperText={state.passwordHelperText}
    //                               inputProps={{
    //                                 onChange: (event) =>
    //                                   handleBlur(event, "password"),
    //                                 onBlur: (event) =>
    //                                   handleBlur(event, "password"),
    //                                 onFocus: () =>
    //                                   setState({
    //                                     passwordErr: false,
    //                                     passwordHelperText: "",
    //                                     checkPassword: true,
    //                                   }),
    //                               }}
    //                             />
    //                           </FormControl>
    //                           <div className="ps-popover-inner">
    //                             <MDBPopoverHeader>
    //                               Your password must have:
    //                             </MDBPopoverHeader>
    //                             <MDBPopoverBody>
    //                               <React.Fragment>
    //                                 {checkUpperCase ? (
    //                                   <Typography style={{ color: "#2E7D32" }}>
    //                                     <i class="far fa-check-circle"></i>One
    //                                     uppercase letter
    //                                   </Typography>
    //                                 ) : (
    //                                   <Typography color="error">
    //                                     <i class="far fa-check-circle"></i>One
    //                                     uppercase letter
    //                                   </Typography>
    //                                 )}
    //                                 {checkLowerCase ? (
    //                                   <Typography style={{ color: "#2E7D32" }}>
    //                                     <i class="far fa-check-circle"></i>One
    //                                     lowercase letter
    //                                   </Typography>
    //                                 ) : (
    //                                   <Typography color="error">
    //                                     <i class="far fa-check-circle"></i>One
    //                                     lowercase letter
    //                                   </Typography>
    //                                 )}
    //                                 {checkSpecialCharacter ? (
    //                                   <Typography style={{ color: "#2E7D32" }}>
    //                                     <i class="far fa-check-circle"></i>One
    //                                     special character
    //                                   </Typography>
    //                                 ) : (
    //                                   <Typography color="error">
    //                                     <i class="far fa-check-circle"></i>One
    //                                     special character
    //                                   </Typography>
    //                                 )}
    //                                 {checkNumber ? (
    //                                   <Typography style={{ color: "#2E7D32" }}>
    //                                     <i class="far fa-check-circle"></i>One
    //                                     number
    //                                   </Typography>
    //                                 ) : (
    //                                   <Typography color="error">
    //                                     <i class="far fa-check-circle"></i>One
    //                                     number
    //                                   </Typography>
    //                                 )}
    //                                 {checkLetter ? (
    //                                   <Typography style={{ color: "#2E7D32" }}>
    //                                     <i class="far fa-check-circle"></i>
    //                                     Minimum 8 characters
    //                                   </Typography>
    //                                 ) : (
    //                                   <Typography color="error">
    //                                     <i class="far fa-check-circle"></i>
    //                                     Minimum 8 characters
    //                                   </Typography>
    //                                 )}
    //                               </React.Fragment>
    //                             </MDBPopoverBody>
    //                           </div>
    //                         </MDBPopover>
    //                       </MDBContainer>
    //                     </GridItem>

    //                     <GridItem xs={12} sm={6} md={6} className="prn">
    //                       <CustomInput
    //                         labelText="Confirm Password"
    //                         error={
    //                           state.confirmpasswordErr}
    //                         helperText={
    //                           state.confirmpasswordHelperText}
    //                         formControlProps={{ fullWidth: true }}
    //                         inputProps={{
    //                           onBlur: (event) =>
                                
    //                             handleBlur(event, "confirmpassword"),
    //                           onFocus: () =>
                                
    //                             setState({
    //                               confirmpasswordErr: false,
    //                               confirmpasswordHelperText: "",
    //                               checkConfirmPassword: false,
    //                             }),
    //                           endAdornment:
    //                             checkConfirmPassword !== true ? (
    //                               <Icon>lock_outline</Icon>
    //                             ) : confirmpasswordErr ? (
    //                               <InputAdornment position="end">
    //                                 <CloseIcon
    //                                   style={{ color: red[500] }}
    //                                   className={useStyles.danger}
    //                                 />
    //                               </InputAdornment>
    //                             ) : (
    //                               <InputAdornment position="end">
    //                                 {" "}
    //                                 <DoneIcon
    //                                   style={{ color: green[500] }}
    //                                   className={useStyles.success}
    //                                 />
    //                               </InputAdornment>
    //                             ),
    //                           type: "password",
    //                           autoComplete: "off",
    //                         }}
    //                       />
    //                     </GridItem>
    //                   </GridContainer>

    //                   <CustomInput
    //                     labelText="Contact Number"
    //                     id="contactnumber"
    //                     error={state.mobileErr}
    //                     helperText={state.mobileHelperText}
    //                     formControlProps={{ fullWidth: true }}
    //                     inputProps={{
    //                       onFocus: () =>
    //                         setState({
    //                           mobileErr: false,
    //                           mobileHelperText: "",
    //                           checkMobile: false,
    //                         }),
    //                       onBlur: (event) => handleBlur(event, "mobile"),
    //                       endAdornment:
    //                         checkMobile !== true ? (
    //                           <Icon>phone</Icon>
    //                         ) : mobileErr ? (
    //                           <InputAdornment position="end">
    //                             <CloseIcon
    //                               style={{ color: red[500] }}
    //                               className={useStyles.danger}
    //                             />
    //                           </InputAdornment>
    //                         ) : (
    //                           <InputAdornment position="end">
    //                             {" "}
    //                             <DoneIcon
    //                               style={{ color: green[500] }}
    //                               className={useStyles.success}
    //                             />{" "}
    //                           </InputAdornment>
    //                         ),
    //                     }}
    //                   />

    //                   <CustomInput
    //                     labelText="Email Address *"
    //                     error={state.emailErr}
    //                     formControlProps={{ fullWidth: true }}
    //                     helperText={state.emailHelperText}
    //                     inputProps={{
    //                       onBlur: (event) => handleBlur(event, "email"),
    //                       onFocus: () =>
    //                         setState({
    //                           emailErr: false,
    //                           emailHelperText: "",
    //                           checkEmail: false,
    //                         }),
    //                       endAdornment:
    //                         state.checkEmail !== true ? (
    //                           <Icon>email</Icon>
    //                         ) : emailErr ? (
    //                           <InputAdornment position="end">
    //                             <CloseIcon
    //                               style={{ color: red[500] }}
    //                               className={useStyles.danger}
    //                             />
    //                           </InputAdornment>
    //                         ) : (
    //                           <InputAdornment position="end">
    //                             {" "}
    //                             <DoneIcon
    //                               style={{ color: green[500] }}
    //                               className={useStyles.success}
    //                             />{" "}
    //                           </InputAdornment>
    //                         ),
    //                       type: "email",
    //                     }}
    //                   />

    //                   <div className="align-center">
    //                     <Button
    //                       className="signup-btn"
    //                       onClick={(event) => signUP(event)}
    //                     >
    //                       Signup
    //                     </Button>
    //                     <ListItemText className="loginpage-link-outer">
    //                       {" "}
    //                       Back to
    //                       <NavLink
    //                         className="registerpage-login-link"
    //                         to={"/auth/loginpage"}
    //                       >
    //                         Login
    //                       </NavLink>
    //                     </ListItemText>
    //                   </div>
    //                 </form>
    //               </GridItem>
    //             </GridContainer>
    //           </CardBody>
    //         </Card>
    //       </GridItem>
    //     </GridContainer>
    //   </div>

  );

}
export default RegisterPage;
