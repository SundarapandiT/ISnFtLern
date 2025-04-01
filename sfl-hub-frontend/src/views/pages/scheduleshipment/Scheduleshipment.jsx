import { useState, useEffect } from "react";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
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
import SectionTabs from "./SectionTabs";
import PickupForm from "./PickupForm";
import Sender from "./Sender";
import Recipient from "./Recipient";
import Package from "./Package";

import { countries } from "../../../data/Countries";
import { usStates } from "../../../data/USstates";

const Schedule = () => {
  // Profile
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
  const [country, setCountry] = useState(""); 
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

  // Recipient tab
  const [recipientCountry, setRecipientCountry] = useState("");
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
  const [recipientLocationType, setRecipientLocationType] = useState("Residential");
  const [recipientNeedsPickup, setRecipientNeedsPickup] = useState("No - I Will Drop Off My Package");
  const [recipientPickupDate, setRecipientPickupDate] = useState("");
  const [recipientErrors, setRecipientErrors] = useState({});

  // Package tab
  const [packageType, setPackageType] = useState("Package");
  const [noOfPackages, setNoOfPackages] = useState(1);
  const [dutiesPaidBy, setDutiesPaidBy] = useState("Recipient (No Additional Fees)");
  const [packageData, setPackageData] = useState(
    Array.from({ length: 1 }, () => ({
      noOfPackages: 1,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      chargeableWeight: 0,
      insuredValue: 0,
    }))
  );
  const [commercialInvoiceData, setCommercialInvoiceData] = useState([
    {
      packageNumber: "1",
      contentDescription: "",
      quantity: 0,
      valuePerQty: 0,
    },
  ]);
  const [packageErrors, setPackageErrors] = useState({});


  const [completedTabs, setCompletedTabs] = useState({
    "schedule-pickup": false,
    sender: false,
    recipient: false,
    package: shipmentType !== "sea",
    payment: false,
  });

  const [activeTab, setActiveTab] = useState("schedule-pickup");
  const [activeModule, setActiveModule] = useState("Schedule Shipment");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerwidth, setDrawerWidth] = useState(250);

  // Function to update the number of rows in packageData based on noOfPackages
  const updatePackageRows = (num) => {
    const newNum = Number(num);
    const currentLength = packageData.length;

    if (newNum > currentLength) {
      const newRows = Array.from({ length: newNum - currentLength }, () => ({
        noOfPackages: 1,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        chargeableWeight: 0,
        insuredValue: 0,
      }));
      setPackageData([...packageData, ...newRows]);
    } else if (newNum < currentLength) {
      setPackageData(packageData.slice(0, newNum));
    }
  };

  const handlePackageChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPackageData = [...packageData];
    updatedPackageData[index] = {
      ...updatedPackageData[index],
      [name]: value,
    };

    if (["weight", "length", "width", "height"].includes(name)) {
      const pkg = updatedPackageData[index];
      const dimensionalWeight = (pkg.length * pkg.width * pkg.height) / 139;
      updatedPackageData[index].chargeableWeight = Math.max(
        Number(pkg.weight) || 0,
        dimensionalWeight || 0
      ).toFixed(2);
    }

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
    return ((invoice.quantity || 0) * (invoice.valuePerQty || 0)).toFixed(2);
  };

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

  // Validation for Recipient tab
  const validateRecipientForm = () => {
    const newErrors = {};
    if (!recipientContactName.trim()) {
      newErrors.contactName = "Contact Name is required";
    }
    if (!recipientAddressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
    }
    if (!recipientZipCode.trim()) {
      newErrors.zipCode = "Zip Code is required";
    }
    if (!recipientCity.trim()) {
      newErrors.city = "City is required";
    }
    if (!recipientState.trim()) {
      newErrors.state = "State is required";
    }
    if (!recipientPhone1.trim()) {
      newErrors.phone1 = "At least one phone number is required";
    }
    if (!recipientEmail.trim()) {
      newErrors.email = "Email is required";
    }
    if (recipientNeedsPickup === "Yes - I Need Pickup Service" && !recipientPickupDate) {
      newErrors.pickupDate = "Pickup Date is required";
    }
    setRecipientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Package tab
  const validatePackageForm = () => {
    const newErrors = {};

    if (!packageType) {
      newErrors.packageType = "Package Type is required";
    }

    if (!noOfPackages || noOfPackages < 1) {
      newErrors.noOfPackages = "Number of packages must be at least 1";
    }

    if (!dutiesPaidBy) {
      newErrors.dutiesPaidBy = "Duties & Taxes Paid By is required";
    }

    packageData.forEach((pkg, index) => {
      if (!pkg.noOfPackages || pkg.noOfPackages <= 0) {
        newErrors[`noOfPackages_${index}`] = "Number of packages is required and must be greater than 0";
      }
      if (!pkg.weight || pkg.weight <= 0) {
        newErrors[`weight_${index}`] = "Weight is required and must be greater than 0";
      }
      if (!pkg.length || pkg.length <= 0) {
        newErrors[`length_${index}`] = "Length is required and must be greater than 0";
      }
      if (!pkg.width || pkg.width <= 0) {
        newErrors[`width_${index}`] = "Width is required and must be greater than 0";
      }
      if (!pkg.height || pkg.height <= 0) {
        newErrors[`height_${index}`] = "Height is required and must be greater than 0";
      }
      if (!pkg.insuredValue || pkg.insuredValue < 0) {
        newErrors[`insuredValue_${index}`] = "Insured value is required and must be 0 or greater";
      }
    });

    commercialInvoiceData.forEach((invoice, index) => {
      if (!invoice.packageNumber) {
        newErrors[`packageNumber_${index}`] = "Package number is required";
      }
      if (!invoice.contentDescription) {
        newErrors[`contentDescription_${index}`] = "Content description is required";
      }
      if (!invoice.quantity || invoice.quantity <= 0) {
        newErrors[`quantity_${index}`] = "Quantity is required and must be greater than 0";
      }
      if (!invoice.valuePerQty || invoice.valuePerQty <= 0) {
        newErrors[`valuePerQty_${index}`] = "Value per quantity is required and must be greater than 0";
      }
    });

    setPackageErrors(newErrors);
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
      setCompletedTabs((prev) => ({
        ...prev,
        "schedule-pickup": true,
        package: shipmentType !== "sea",
      }));
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
      setCompletedTabs((prev) => ({ ...prev, sender: true }));
      setActiveTab("recipient");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle form submission for Recipient tab
  const handleRecipientSubmit = (event) => {
    event.preventDefault();
    if (validateRecipientForm()) {
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
        recipientLocationType,
        recipientNeedsPickup,
        recipientPickupDate,
      });
      setCompletedTabs((prev) => {
        const updatedTabs = { ...prev, recipient: true };
        console.log("Updated completedTabs:", updatedTabs);
        return updatedTabs;
      });
      const nextTab = shipmentType === "sea" ? "payment" : "package";
      console.log("Navigating to:", nextTab);
      setActiveTab(nextTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle form submission for Package tab
  const handlePackageSubmit = (event) => {
    event.preventDefault();
    if (validatePackageForm()) {
      console.log("Package Form submitted:", {
        packageData,
        commercialInvoiceData,
      });
      setCompletedTabs((prev) => ({ ...prev, package: true }));
      setActiveTab("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle tab change with validation
  const handleTabChange = (newTab) => {
    const tabOrder =
      shipmentType === "sea"
        ? ["schedule-pickup", "sender", "recipient", "payment"]
        : ["schedule-pickup", "sender", "recipient", "package", "payment"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);

    if (newIndex < currentIndex) {
      setActiveTab(newTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    let isValid = false;
    switch (activeTab) {
      case "schedule-pickup":
        isValid = validatePickupForm();
        break;
      case "sender":
        isValid = validateSenderForm();
        break;
      case "recipient":
        isValid = validateRecipientForm();
        break;
      case "package":
        isValid = validatePackageForm();
        break;
      case "payment":
        isValid = true;
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      setCompletedTabs((prev) => ({ ...prev, [activeTab]: true }));
      setActiveTab(newTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle Previous button in Sender tab
  const handlePrevious = () => {
    setActiveTab("schedule-pickup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRecipientPrevious = () => {
    setActiveTab("sender");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlepackagePrevious = () => {
    setActiveTab("recipient");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const halfopen = () => {
    setDrawerWidth((prevWidth) => (prevWidth === 250 ? 70 : 250));
  };

  const handleModuleClick = (module) => {
    setActiveModule(module);
    if (module === "Schedule Shipment") {
      setActiveTab("schedule-pickup");
      setCompletedTabs({
        "schedule-pickup": false,
        sender: false,
        recipient: false,
        package: shipmentType !== "sea",
        payment: false,
      });
    } else if (module === "My Shipment") {
      setActiveTab("my-shipment");
    }
    setDrawerOpen(false);
  };

  // Map country codes to country names for Sender and Recipient
  useEffect(() => {
    const fromCountryObj = countries.find((c) => c.value === fromCountry);
    const toCountryObj = countries.find((c) => c.value === toCountry);
    setCountry(fromCountryObj ? fromCountryObj.label : "");
    setRecipientCountry(toCountryObj ? toCountryObj.label : "");
  }, [fromCountry, toCountry]);

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
      <Box sx={{ flexGrow: 1, backgroundColor: "#fcf6f0" }}>
        {/* Header */}
        <AppBar position="static" color="default" elevation={1} sx={{boxShadow:"none",}}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <IconButton
              edge="start"
              color="primary"
              onClick={halfopen}
              sx={{ display: { xs: "none", sm: "block" }, ml: 2 }}
            >
              <MoreVertIcon />
            </IconButton>
           
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

          
            <Button
              startIcon={<AccountCircleIcon />}
              sx={{ textTransform: "none", color:"grey", display: { xs: "none", sm: "flex" } }}
              onClick={handleMenuOpen}
            >
              Username
            </Button>

            
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
            alignSelf: "center",
            justifyContent: "center",
            margin: { xs: "2rem auto", md: "4rem auto" },
            backgroundColor: "white",
            padding: { xs: "10px", sm: "10px" },
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
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
            </Box>
            Schedule Shipment
          </Typography>
          
          {activeModule === "Schedule Shipment" && (
            <SectionTabs
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              isMobile={isMobile}
              completedTabs={completedTabs}
              shipmentType={shipmentType}
            />
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
              {...{
                recipientCountry,
                setRecipientCountry,
                recipientCompanyName,
                setRecipientCompanyName,
                recipientContactName,
                setRecipientContactName,
                recipientAddressLine1,
                setRecipientAddressLine1,
                recipientAddressLine2,
                setRecipientAddressLine2,
                recipientAddressLine3,
                setRecipientAddressLine3,
                recipientZipCode,
                setRecipientZipCode,
                recipientCity,
                setRecipientCity,
                recipientState,
                setRecipientState,
                recipientPhone1,
                setRecipientPhone1,
                recipientPhone2,
                setRecipientPhone2,
                recipientEmail,
                setRecipientEmail,
                recipientLocationType,
                setRecipientLocationType,
                recipientNeedsPickup,
                setRecipientNeedsPickup,
                recipientPickupDate,
                setRecipientPickupDate,
                recipientErrors,
                usStates,
                handleRecipientSubmit,
                handleRecipientPrevious,
              }}
            />
          )}
          {/* Package Tab - Only render if shipmentType is not "sea" */}
          {activeModule === "Schedule Shipment" && activeTab === "package" && shipmentType !== "sea" && (
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
              packageErrors={packageErrors}
              packageType={packageType}
              setPackageType={setPackageType}
              noOfPackages={noOfPackages}
              setNoOfPackages={setNoOfPackages}
              dutiesPaidBy={dutiesPaidBy}
              setDutiesPaidBy={setDutiesPaidBy}
              updatePackageRows={updatePackageRows}
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