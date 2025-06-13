import React, { useState, useEffect } from 'react';
import {
  TextField, 
  Button, 
  InputAdornment, 
  Dialog, 
  DialogActions,
  DialogContent, 
  DialogTitle, 
  FormControl, 
  InputLabel, 
  Input,
  Typography, 
  Box, 
  Autocomplete, 
  Paper
} from "@mui/material";
import {
  PermContactCalendarOutlined as ProfileIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  MyLocation as MyLocationIcon,
  PinDrop as PinDropIcon,
  LocationCity as LocationCityIcon,
  AccountCircle as AccountCircleIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  PermIdentity as PermIdentityIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import GridContainer from '../../styles/grid/GridContainer';
import GridItem from '../../styles/grid/GridItem';
// import Sidebar from './Sidebar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '', 
    password: '', 
    accountNumber: '', 
    managedBy: '', 
    companyName: '',
    addressLine1: '', 
    addressLine2: '', 
    addressLine3: '', 
    country: null,
    zip: '', 
    city: '', 
    state: '', 
    contactName: '', 
    phone1: '', 
    phone2: '',
    email: '', 
    paperSize: null,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // // Sidebar-related states
  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const [drawerWidth, setDrawerWidth] = useState(250);
  // const [activeModule, setActiveModule] = useState("Profile");
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [Loginname, setLoginname] = useState("Unknown");
  // const [accountNumber, setAccountNumber] = useState("");

  // Initialize user data from sessionStorage
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      // setLoginname(storedUser.name || "Unknown");
      // setAccountNumber(storedUser.account_number || "");
      setFormData((prev) => ({
        ...prev,
        userName: storedUser.username || "",
        email: storedUser.email || "",
        contactName: storedUser.name || "",
        phone1: storedUser.phone || "",
        accountNumber: storedUser.account_number || "",
      }));
    }
  }, []);

  const handleChange = (field, setter) => (event) => {
    setter(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleAutocompleteChange = (field) => (_, newValue) => {
    setFormData(prev => ({ ...prev, [field]: newValue }));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.location.reload();
    navigate("/auth/login-page");
    document.cookie = "LKA=; Max-Age=0; path=/; secure; samesite=strict;";
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("PersonID");
    handleMenuClose();
  };

  // const handleModuleClick = (module) => {
  //   setActiveModule(module);
  //   if (module === "Schedule Shipment") {
  //     navigate("/admin/Scheduleshipment", { replace: true });
  //   } else if (module === "My Shipment") {
  //     navigate("/admin/ShipmentList", { replace: true });
  //   } else if (module === "Get Rates") {
  //     navigate("/admin/GetRate", { replace: true });
  //   } else if (module === "Profile") {
  //     navigate("/admin/ProfilePage", { replace: true });
  //   }
  //   setDrawerOpen(false);
  // };

  // const toggleDrawer = (open) => () => {
  //   setDrawerOpen(open);
  // };

  // const halfopen = () => {
  //   setDrawerWidth((prevWidth) => (prevWidth === 250 ? 70 : 250));
  // };

  const fieldStyle = {
    marginBottom: '16px',
    '& .MuiInputBase-root': { fontSize: '14px' },
    '& .MuiInputLabel-root': { fontSize: '14px' },
    '& .MuiInput-underline:after': { borderBottomColor: '#ab47bc' },
  };

  const renderTextField = (label, icon, field, disabled = false) => (
    <TextField
      label={label}
      disabled={disabled}
      fullWidth
      variant="standard"
      value={formData[field] || ''}
      onChange={handleChange(field, setFormData)}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>
      }}
      sx={fieldStyle}
    />
  );

  const paperSizeOptions = [
    { value: "8.5X11", label: "8.5X11" },
    { value: "4X6", label: "4X6" },
    { value: "4X6.75", label: "4X6.75" },
    { value: "4X8", label: "4X8" },
    { value: "4X9", label: "4X9" },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Sidebar
        drawerOpen={drawerOpen}
        Loginname={Loginname}
        toggleDrawer={toggleDrawer}
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        activeModule={activeModule}
        handleModuleClick={handleModuleClick}
        drawerWidth={drawerWidth}
        setDrawerWidth={setDrawerWidth}
        account_number={accountNumber}
      /> */}

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <GridContainer>
          <GridItem xs={12}>
            <Paper elevation={2} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ backgroundColor: '#ab47bc', color: 'white', p: 1, borderRadius: '4px', mr: 1.5 }}>
                  <ProfileIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  User Profile
                </Typography>
              </Box>

              <Box sx={{ p: 2.5 }}>
                <GridContainer>
                  <GridItem xs={12} md={3}>{renderTextField("User Name", <AccountCircleIcon />, "userName", true)}</GridItem>
                  <GridItem xs={12} md={3}>
                    <FormControl fullWidth variant="standard" sx={fieldStyle}>
                      <InputLabel sx={{ fontSize: '14px' }}>Password</InputLabel>
                      <Input
                        type="password"
                        disabled
                        value={formData.password}
                        onChange={handleChange("password", setFormData)}
                        sx={{ fontSize: '14px' }}
                        endAdornment={
                          <InputAdornment position="end">
                            <Button
                              sx={{
                                backgroundColor: '#ab47bc',
                                color: 'white',
                                fontSize: '10px',
                                px: 1.5,
                                minWidth: 'auto',
                                '&:hover': { backgroundColor: '#8e3b9d' },
                              }}
                              onClick={() => setOpenDialog(true)}
                            >
                              Update
                            </Button>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} md={3}>{renderTextField("Account Number", <AccountBalanceWalletIcon />, "accountNumber", true)}</GridItem>
                  <GridItem xs={12} md={3}>{renderTextField("Managed By", <PermIdentityIcon />, "managedBy", true)}</GridItem>
                </GridContainer>

                <GridContainer>
                  {["companyName", "addressLine1", "addressLine2", "addressLine3"].map((field, i) => (
                    <GridItem xs={12} md={3} key={field}>
                      {renderTextField(
                        ["Company Name", "Address Line 1", "Address Line 2", "Address Line 3"][i],
                        <MyLocationIcon />, field
                      )}
                    </GridItem>
                  ))}
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} md={3}>
                    <Autocomplete
                      options={[{ value: "INDIA", label: "INDIA" }]}
                      getOptionLabel={(opt) => opt.label}
                      value={formData.country}
                      onChange={handleAutocompleteChange("country")}
                      renderInput={(params) => <TextField {...params} label="Country" variant="standard" />}
                      sx={fieldStyle}
                    />
                  </GridItem>
                  <GridItem xs={12} md={3}>{renderTextField("Zip", <PinDropIcon />, "zip")}</GridItem>
                  <GridItem xs={12} md={3}>{renderTextField("City", <LocationCityIcon />, "city")}</GridItem>
                  <GridItem xs={12} md={3}>{renderTextField("State", <LocationCityIcon />, "state")}</GridItem>
                </GridContainer>

                <GridContainer>
                  {[
                    ["Contact Name", <PersonIcon />, "contactName"],
                    ["Phone 1", <PhoneIcon />, "phone1"],
                    ["Phone 2", <PhoneIcon />, "phone2"],
                    ["Email", <EmailIcon />, "email"]
                  ].map(([label, icon, field]) => (
                    <GridItem xs={12} md={3} key={field}>
                      {renderTextField(label, icon, field)}
                    </GridItem>
                  ))}
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} md={3}>
                    <Autocomplete
                      options={paperSizeOptions}
                      getOptionLabel={(opt) => opt.label}
                      value={formData.paperSize}
                      onChange={handleAutocompleteChange("paperSize")}
                      renderInput={(params) => <TextField {...params} label="Paper Size" variant="standard" />}
                      sx={fieldStyle}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1, fontSize: '16px' }}>
                      Page Size Preview
                    </Typography>
                  </GridItem>
                  {paperSizeOptions.map(({ value, label }) => (
                    <GridItem key={value}>
                      <Typography component="a" href="#" target="_blank" rel="noopener noreferrer" sx={{ color: '#ab47bc', textDecoration: 'underline', fontSize: '14px' }}>
                        {label}
                      </Typography>
                    </GridItem>
                  ))}
                </GridContainer>
              </Box>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Button sx={{ backgroundColor: '#ec407a', color: 'white', '&:hover': { backgroundColor: '#d81b60' }, fontSize: '14px' }}>
                Save
              </Button>
            </Box>
          </GridItem>

          <Dialog
            sx={{ '& .MuiDialog-paper': { width: '590px' } }}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          >
            <DialogTitle sx={{ fontSize: '16px' }}>Update Password</DialogTitle>
            <DialogContent>
              {["currentPassword", "newPassword", "confirmPassword"].map((field, i) => (
                <FormControl fullWidth variant="standard" sx={fieldStyle} key={field}>
                  <InputLabel sx={{ fontSize: '14px' }}>
                    {["Current Password", "New Password", "Confirm Password"][i]}
                  </InputLabel>
                  <Input
                    type="password"
                    value={passwordData[field]}
                    onChange={handleChange(field, setPasswordData)}
                    sx={{ fontSize: '14px' }}
                    endAdornment={<InputAdornment position="end"><LockIcon /></InputAdornment>}
                  />
                </FormControl>
              ))}
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={() => setOpenDialog(false)} sx={{ fontSize: '14px' }}>Cancel</Button>
              <Button color="primary" onClick={() => setOpenDialog(false)} autoFocus sx={{ fontSize: '14px' }}>Save</Button>
            </DialogActions>
          </Dialog>
        </GridContainer>
      </Box>
    </Box>
  );
};

export default ProfilePage;