import { useState,useEffect } from "react";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import Sidebar from "./Sidebar";
import PickupForm from "./PickupForm";
import Sender from "./Sender";
import Recipient from "./Recipient";
import Package from "./Package";

import { countries } from "../../../data/Countries";
import { usStates } from "../../../data/USstates";

const Schedule = () => {
//profile
const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for Schedule Pickup tab
  const [shipmentType, setShipmentType] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [pickupErrors, setPickupErrors] = useState({});

  // State for Sender tab
  const [country,setCountry]=useState(fromCountry)
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [state, setState] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [senderErrors, setSenderErrors] = useState({});

  const [activeTab, setActiveTab] = useState("schedule-pickup");
  const [activeModule, setActiveModule] = useState("Schedule Shipment");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerwidth,setDrawerWidth]=useState(250);

  //recipient tab
  const [recipientCountry, setRecipientCountry] = useState(toCountry);
const [recipientCompanyName, setRecipientCompanyName] = useState("");
const [recipientContactName, setRecipientContactName] = useState("");
const [recipientAddressLine1, setRecipientAddressLine1] = useState("");
const [recipientAddressLine2, setRecipientAddressLine2] = useState("");
const [recipientAddressLine3, setRecipientAddressLine3] = useState("");
const [recipientZipCode, setRecipientZipCode] = useState("");
const [recipientCity, setRecipientCity] = useState("");
const [recipientState, setRecipientState] = useState("");
const [recipientPhone1, setRecipientPhone1] = useState("");
const [recipientPhone2, setRecipientPhone2] = useState("");
const [recipientEmail, setRecipientEmail] = useState("");
const [recipientErrors, setRecipientErrors] = useState({});


const handleRecipientSubmit = (event) => {
  event.preventDefault();
  
  let errors = {};
  
  if (!recipientContactName.trim()) {
    errors.contactName = "Contact Name is required";
  }
  if (!recipientAddressLine1.trim()) {
    errors.addressLine1 = "Address Line 1 is required";
  }
  if (!recipientZipCode.trim()) {
    errors.zipCode = "Zip Code is required";
  }
  if (!recipientCity.trim()) {
    errors.city = "City is required";
  }
  if (!recipientState.trim()) {
    errors.state = "State is required";
  }
  if (!recipientPhone1.trim()) {
    errors.phone1 = "At least one phone number is required";
  }
  if (!recipientEmail.trim()) {
    errors.email = "Email is required";
  }

  setRecipientErrors(errors);

  if (Object.keys(errors).length === 0) {
    console.log("Recipient form submitted", {
      recipientCountry,
      recipientCompanyName,
      recipientContactName,
      recipientAddressLine1,
      recipientAddressLine2,
      recipientAddressLine3,
      recipientZipCode,
      recipientCity,
      recipientState,
      recipientPhone1,
      recipientPhone2,
      recipientEmail,
    });

   setActiveTab("package")
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
useEffect(() => {
  setCountry(fromCountry);
  setRecipientCountry(toCountry);
}, [fromCountry,toCountry]);

  // Validation for Schedule Pickup tab
  const validatePickupForm = () => {
    const newErrors = {};
    if (!shipmentType) newErrors.shipmentType = "Please select shipment type";
    if (!fromCountry) newErrors.fromCountry = "Please select from country";
    if (!toCountry) newErrors.toCountry = "Please select to country";
    setPickupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Sender tab
  const validateSenderForm = () => {
    const newErrors = {};
    if (!country) newErrors.country = "Country name is required";
    if (!contactName) newErrors.contactName = "Contact name is required";
    if (!addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
    if (!zipCode) newErrors.zipCode = "Zip Code is required";
    if (!fromCity) newErrors.fromCity = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!phone1) newErrors.phone1 = "Phone 1 is required";
    if (!email) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address";
    setSenderErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for Schedule Pickup tab
  const handlePickupSubmit = (e) => {
    e.preventDefault();
    if (validatePickupForm()) {
      console.log("Schedule Pickup Form submitted:", {
        shipmentType,
        fromCountry,
        toCountry,
      });
      setActiveTab("sender"); 
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle form submission for Sender tab
  const handleSenderSubmit = (e) => {
    e.preventDefault();
    if (validateSenderForm()) {
      console.log("Sender Form submitted:", {
        country,
        companyName,
        contactName,
        addressLine1,
        addressLine2,
        addressLine3,
        zipCode,
        fromCity,
        state,
        phone1,
        phone2,
        email,
      });
      setActiveTab("recipient"); 
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle Previous button in Sender tab
  const handlePrevious = () => {
    setActiveTab("schedule-pickup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleRecipientPrevious=()=>{
      setActiveTab("sender");
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handlepackagePrevious=()=>{
    setActiveTab("recipient");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Toggle Drawer for sidebar
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const halfopen=()=>
  {
    setDrawerWidth((prevWidth) => (prevWidth === 250 ? 70 : 250));
  }

  // Handle sidebar module click
  const handleModuleClick = (module) => {
    setActiveModule(module);
    if (module === "Schedule Shipment") {
      setActiveTab("schedule-pickup");
    } else if (module === "My Shipment") {
      setActiveTab("my-shipment");
    }
    setDrawerOpen(false); 
  };

  // packagetab
  const [packageData, setPackageData] = useState([
    {
      noOfPackages: 1,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      chargeableWeight: 0,
      insuredValue: 0,
    },
  ]);
  const [commercialInvoiceData, setCommercialInvoiceData] = useState([
    {
      packageNumber: "1",
      contentDescription: "",
      quantity: 0,
      valuePerQty: 0,
    },
  ]);
  const handlePackageChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPackageData = [...packageData];
    updatedPackageData[index] = {
      ...updatedPackageData[index],
      [name]: value,
    };
    setPackageData(updatedPackageData);
  };
  const handleAddPackage = () => {
    setPackageData([
      ...packageData,
      {
        noOfPackages: 1,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        chargeableWeight: 0,
        insuredValue: 0,
      },
    ]);
  };

  const handleRemovePackage = (index) => {
    const updatedPackageData = [...packageData];
    updatedPackageData.splice(index, 1);
    setPackageData(updatedPackageData);
  };

  const handleInvoiceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInvoiceData = [...commercialInvoiceData];
    updatedInvoiceData[index] = {
      ...updatedInvoiceData[index],
      [name]: value,
    };
    setCommercialInvoiceData(updatedInvoiceData);
  };

  const handleAddInvoiceRow = () => {
    setCommercialInvoiceData([
      ...commercialInvoiceData,
      {
        packageNumber: "1",
        contentDescription: "",
        quantity: 0,
        valuePerQty: 0,
      },
    ]);
  };

  const handleRemoveInvoiceRow = (index) => {
    const updatedInvoiceData = [...commercialInvoiceData];
    updatedInvoiceData.splice(index, 1);
    setCommercialInvoiceData(updatedInvoiceData);
  };

  const calculateTotalValue = (index) => {
    const invoice = commercialInvoiceData[index];
    return (invoice.quantity || 0) * (invoice.valuePerQty || 0);
  };

  const handlePackageSubmit = (event) => {
    event.preventDefault();
    // handleNext();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
     <Sidebar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        activeModule={activeModule}
        handleModuleClick={handleModuleClick}
        drawerWidth={drawerwidth}
      />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1,backgroundColor:"#e9f7f7" }}>
        {/* Header */}
        <AppBar position="static" color="default" elevation={1}>
           
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <IconButton
                  edge="start"
                  color="primary"
                  onClick={halfopen}
                  sx={{ display: { xs: "none", sm: "block" },ml:2 }}
                >
                  <MoreVertIcon />
                </IconButton>
      {/* Drawer Toggle Button */}
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => setDrawerOpen(true)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      {/* Profile Button with Dropdown */}
      <Button
        startIcon={<AccountCircleIcon />}
        sx={{ textTransform: "none" ,display:{xs:"none",sm:"flex"}}}
        onClick={handleMenuOpen}
      >
        Daredevil
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </Box>
        </AppBar>
        <Box
          sx={{
            width: { xs: "90%", sm: "90%" }, 
            // maxWidth: "500px", 
            alignSelf: "center",
            justifyContent: "center",
            margin: { xs: "2rem auto", md: "4rem auto" },
            backgroundColor: "white",
            padding: { xs: "10px", sm: "10px" }, 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
            display:"flex",
            flexDirection:"column",
            gap: 2, 
            overflowY:"auto"
          }}
        >
                
        <Typography variant="h5" sx={{mb:3}}>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: 55, 
            height: 55,
            borderRadius: "7px", 
            backgroundColor: "#c30ac9",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            marginRight: 2,
          }}
>
  <FlightTakeoffIcon sx={{ fontSize: 23, color: "white" }} />
</Box>Schedule Shipment</Typography>
             {/* Tabs (only shown when activeModule is "Schedule Shipment") */}
        {activeModule === "Schedule Shipment" && (
       <Tabs
       orientation={isMobile ? "vertical" : "horizontal"} 
       value={activeTab}
       onChange={(e, newValue) => setActiveTab(newValue)}
       variant="fullWidth"
       indicatorColor="undefined"
       sx={{
        position: "relative",
       }}
     >
       <Box
        sx={{
          position: "absolute",
          bottom: isMobile ? "auto" : 0,
          left: isMobile ? "auto" : `${["schedule-pickup", "sender", "recipient", "package", "payment"].indexOf(activeTab) * 20}%`, 
          top: isMobile ? `${["schedule-pickup", "sender", "recipient", "package", "payment"].indexOf(activeTab) * 20}%` : "auto",
          width: isMobile ? "100%" : "20%", 
          height: isMobile ? "20%" : "100%",
          backgroundColor: "#eb0c40",
          borderRadius: "5px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
          transition: isMobile ? "top 0.3s ease-in-out" : "left 0.3s ease-in-out",
        }}
/>
       {["Schedule Pickup", "Sender", "Recipient", "Package", "Payment"].map((label, index) => (
         <Tab
           key={label}
           label={label}
           value={label.toLowerCase().replace(" ", "-")}
           sx={{
            //  flex: { xs: "50%", sm: "20%" }, 
             textAlign: "center",
             fontSize: { xs: "12px", sm: "16px" }, 
             backgroundColor: activeTab === label.toLowerCase().replace(" ", "-") ? "" : "transparent",
             borderRadius: "9px",
             transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
             "&.Mui-selected": {
               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
               color:"white"
             },
           }}
         />
       ))}
     </Tabs>
     
      
       
        
        
        )}

        {/* Schedule Pickup Tab */}
        {activeModule === "Schedule Shipment" && activeTab === "schedule-pickup" && (
         <PickupForm
         shipmentType={shipmentType}
         setShipmentType={setShipmentType}
         fromCountry={fromCountry}
         setFromCountry={setFromCountry}
         toCountry={toCountry}
         setToCountry={setToCountry}
         pickupErrors={pickupErrors}
         countries={countries}
         handlePickupSubmit={handlePickupSubmit}
       />
        )}

        {/* Sender Tab */}
        {activeModule === "Schedule Shipment" && activeTab === "sender" && (
        <Sender
        country={country}
        setCountry={setCountry}
        companyName={companyName}
        setCompanyName={setCompanyName}
        contactName={contactName}
        setContactName={setContactName}
        addressLine1={addressLine1}
        setAddressLine1={setAddressLine1}
        addressLine2={addressLine2}
        setAddressLine2={setAddressLine2}
        addressLine3={addressLine3}
        setAddressLine3={setAddressLine3}
        zipCode={zipCode}
        setZipCode={setZipCode}
        fromCity={fromCity}
        setFromCity={setFromCity}
        state={state}
        setState={setState}
        phone1={phone1}
        setPhone1={setPhone1}
        phone2={phone2}
        setPhone2={setPhone2}
        email={email}
        setEmail={setEmail}
        senderErrors={senderErrors}
        usStates={usStates}
        handleSenderSubmit={handleSenderSubmit}
        handlePrevious={handlePrevious}
      />
        )}
         {activeModule === "Schedule Shipment" && activeTab === "recipient" && (
           <Recipient
           {...{ recipientCountry, setRecipientCountry, recipientCompanyName, setRecipientCompanyName, recipientContactName, setRecipientContactName, recipientAddressLine1, setRecipientAddressLine1, recipientAddressLine2, setRecipientAddressLine2, recipientAddressLine3, setRecipientAddressLine3, recipientZipCode, setRecipientZipCode, recipientCity, setRecipientCity, recipientState, setRecipientState, recipientPhone1, setRecipientPhone1, recipientPhone2, setRecipientPhone2, recipientEmail, setRecipientEmail, recipientErrors, usStates, handleRecipientSubmit, handleRecipientPrevious }}
         />
         
         )}

{/* Updated Package Tab */}
{activeModule === "Schedule Shipment" && activeTab === "package" && (
             <Package
             packageData={packageData}
             handlePackageChange={handlePackageChange}
             handleAddPackage={handleAddPackage}
             handleRemovePackage={handleRemovePackage}
             handlePackageSubmit={handlePackageSubmit}
             commercialInvoiceData={commercialInvoiceData}
             handleInvoiceChange={handleInvoiceChange}
             handleAddInvoiceRow={handleAddInvoiceRow}
             handleRemoveInvoiceRow={handleRemoveInvoiceRow}
             calculateTotalValue={calculateTotalValue}
             handlepackagePrevious={handlepackagePrevious}
           />
          )}

        {activeModule === "Schedule Shipment" && activeTab === "payment" && (
          <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
            <Typography variant="h5">Payment Form</Typography>
            <Typography>Form for payment details will go here.</Typography>
          </Box>
        )}

        </Box>
       

        {/* Placeholder for other modules */}
         {/* My Shipment Tab */}
         {activeModule === "My Shipment" && activeTab === "my-shipment" && (
          <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
            <Typography variant="h5">My Shipment</Typography>
            <Typography>Content for My Shipment will go here.</Typography>
          </Box>
        )}

        {activeModule === "Billing" && (
          <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
            <Typography variant="h5">Billing</Typography>
            <Typography>Content for Billing will go here.</Typography>
          </Box>
        )}
        {activeModule === "File a Claim" && (
          <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
            <Typography variant="h5">File a Claim</Typography>
            <Typography>Content for File a Claim will go here.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Schedule;