import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import axios from "axios";
import { api } from '../../../utils/api'
import { toast } from "react-hot-toast";
import Myshipment from "../myshipment/Myshipment";
import { useStyles } from "../../styles/MyshipmentStyle";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import ListIcon from '@mui/icons-material/List';
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

// import { countries } from "../../../data/Countries";

import {
  Root,
  MainContent,
  AppBarBox,
  DesktopToggleBtn,
  MobileToggleBtn,
  ContentBox,
  IconBox,
  UsernameButton,
  } from '../../styles/scheduleshipmentStyle';
import Myshipmentnew from "../myshipment/MyShipmentNew";
import CryptoJS from "crypto-js";
import ScheduleConfirmation from "../scheduleconfirmation/ScheduleConfirmation";


const Schedule = () => {

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [confirmation,setConfirmation]=useState(false);
  const classes = useStyles();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${api.BackendURL}/locations/getCountry`);
        const countryData = res.data?.user?.[0] || [];

        const formattedCountries = countryData.map(country => ({
          value: country.countrycode.toLowerCase(),
          label: country.countryname,
          countryid: country.countryid,
        }));

        setCountries(formattedCountries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/auth/login-page");
    sessionStorage.removeItem("user");
    handleMenuClose();
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [Loginname, setLoginname] = useState("Unknown")
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setLoginname(storedUser.name);
      setContactName(storedUser.name);
      setEmail(storedUser.email);
      setPhone1(storedUser.phone);
      setUserId(storedUser.userId?storedUser.userId:"12345")
      setUserName(storedUser.username);
    }
  }, []);

  // State for Schedule Pickup tab
  const [shipmentType, setShipmentType] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [pickupErrors, setPickupErrors] = useState({});

  // State for Sender tab

  const [country, setCountry] = useState("");
  const [countrycode, setcountrycode] = useState("");
  const [countryId, setCountryId] = useState("");
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
  const [needsPickup, setNeedsPickup] = useState("No - I Will Drop Off My Package");
  const [pickupDate, setPickupDate] = useState("");
  const [senderErrors, setSenderErrors] = useState({});

  // Recipient tab
  const [recipientCountry, setRecipientCountry] = useState("");
  const [recipientcountrycode, setrecipientcountrycode] = useState("");
  const [recipientCountryId, setRecipientCountryId] = useState("");
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
      chargable_weight: 0,
      insured_value: 0,
    }))
  );
  const [samecountry, setSamecountry] = useState(false);
  const [commercialInvoiceData, setCommercialInvoiceData] = useState([
    {
      packageNumber: "1",
      contentDescription: "",
      quantity: 0,
      valuePerQty: 0,
    },
  ]);
  const [packageErrors, setPackageErrors] = useState({});

  const handleSubmit = async () => {
    console.log("Submitting data...");
    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error("Encryption key is missing!");
    }
  
    // Helper function to encrypt values safely
    const encrypt = (value) =>
      value ? CryptoJS.AES.encrypt(value, SECRET_KEY).toString() : "";
  
    const requestData = {
      UserID: userId,
      ipAddress: "",
      TrackingNumber: null,
      shipments: {
        tracking_number: "",
        shipment_type: shipmentType,
        location_type: recipientLocationType,
        is_pickup: needsPickup,
        pickup_date: pickupDate,
        package_type: packageType,
        total_packages: noOfPackages,
        is_pay_online: 0,
        is_pay_bank: 0,
        promo_code: "",
        is_agree: "",
        total_weight: packageData.reduce((sum, pkg) => sum + Number(pkg.weight || 0), 0).toFixed(2),
        total_chargable_weight: packageData.reduce((sum, pkg) => sum + Number(pkg.chargable_weight || 0), 0).toFixed(2),
        total_insured_value: packageData.reduce((sum, pkg) => sum + Number(pkg.insured_value || 0), 0).toFixed(2),
        duties_paid_by: dutiesPaidBy,
        total_declared_value:commercialInvoiceData? commercialInvoiceData.reduce((sum, _, index) => sum + Number(calculateTotalValue(index) || 0), 0).toFixed(2):"",
        userName: userName,
        ServiceName: "",
        SubServiceName: "",
        managed_by: "",
        ShippingID: null,
        InvoiceDueDate: null,
      },
      MovingBackToIndia: false,
      from_address: {
        AddressID: null,
        country_id: countryId,
        country_name: fromCountry,
        fromCountryCode: countrycode,
        company_name: companyName,
        contact_name: encrypt(contactName),
        address_1: encrypt(addressLine1),
        address_2: encrypt(addressLine2),
        address_3: encrypt(addressLine3),
        MovingBack: false,
        OriginalPassportAvailable: false,
        EligibleForTR: false,
        city_id: "",
        city_name: fromCity,
        fedex_city: "",
        state_id: "",
        state_name: state,
        zip_code: zipCode,
        phone1: encrypt(phone1),
        phone2: encrypt(phone2),
        email: encrypt(email),
      },
      to_address: {
        AddressID: null,
        country_id: recipientCountryId,
        country_name: recipientCountry,
        toCountryCode: recipientcountrycode,
        company_name: recipientCompanyName,
        contact_name: encrypt(recipientContactName),
        address_1: encrypt(recipientAddressLine1),
        address_2: encrypt(recipientAddressLine2),
        address_3: encrypt(recipientAddressLine3),
        city_id: "",
        city_name: recipientCity,
        fedex_city: "",
        state_id:"",
        state_name: recipientState,
        zip_code: recipientZipCode,
        phone1: encrypt(recipientPhone1),
        phone2: encrypt(recipientPhone2),
        email: encrypt(recipientEmail),
      },
      packages: packageData,
      commercial: commercialInvoiceData?commercialInvoiceData:[],
      invoiceData: [],
      TotalCommercialvalue:commercialInvoiceData? commercialInvoiceData.reduce((sum, _, index) => sum + Number(calculateTotalValue(index) || 0), 0).toFixed(2):"",
      TotalWeight: packageData.reduce((sum, pkg) => sum + Number(pkg.weight || 0), 0).toFixed(2),
    };
    
  
    console.log(requestData); 
  
    const toastId = toast.loading("Scheduling your shipment...");
  
    try {
      const response = await axios.post(
        `${api.BackendURL}/shipment/addShipments`,
        requestData
      );

      const {shipments,from_address,to_address}=requestData;
      const trackingNumber = response.data?.user?.TrackingNumber;
    
      if (trackingNumber) {
        toast.success(`Shipment scheduled successfully! Tracking Number: ${trackingNumber}`, {
          id: toastId,
        });
        setConfirmation(true);
        navigate("/admin/ScheduleConfirmation", { replace: true,state:{trackingNumber:trackingNumber,shipment:shipments,sender:from_address,recipient:to_address,packageData:packageData,commercialInvoiceData:commercialInvoiceData} });
        console.log("Tracking Number:", trackingNumber);
      } else {
        toast.error("Shipment scheduled error",{ id: toastId });
      }
    } catch (error) {
      toast.error("Failed to schedule shipment. Please try again.", { id: toastId });
      console.error(error);}
    
  };
  


  const [completedTabs, setCompletedTabs] = useState({
    "schedule-pickup": false, 
    sender: false,
    recipient: false,
    package: shipmentType !== "Ocean", 
    payment: false,
  });

  const [activeTab, setActiveTab] = useState("schedule-pickup"); // Default active tab
  const [activeModule, setActiveModule] = useState("Schedule Shipment");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerwidth, setDrawerWidth] = useState(250);
  useEffect(() => {
    if (
      activeModule === "My Shipment" &&
      activeTab === "my-shipment" && edit===false &&
      !location.pathname.endsWith("/ShipmentList")
    ) {
      navigate("/admin/ShipmentList", { replace: true });
    }
    else if (activeModule === "Schedule Shipment") {
      if (activeTab === "schedule-pickup") {
        setEdit(false);
        navigate("/admin/Scheduleshipment", { replace: true });
      }
    }
  }, [activeModule, activeTab, navigate]);

  

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
        chargable_weight: 0,
        insured_value: 0,
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
      const dimensionalWeight = fromCountry === toCountry
      ? (pkg.length * pkg.width * pkg.height) / 166 // Domestic
      : (pkg.length * pkg.width * pkg.height) / 139; // International
      updatedPackageData[index].chargable_weight = Math.max(
        Number(pkg.weight) || 0,
        dimensionalWeight || 0
      ).toFixed(2);
    }

    setPackageData(updatedPackageData);
  };

  const handleAddPackage = () => {
    const newData = [
      ...packageData,
      {
        noOfPackages: packageData.length + 1,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        chargable_weight: 0,
        insured_value: 0,
      },
    ];
    setPackageData(newData);
    setNoOfPackages(Math.min(newData.length, 10)); // Sync with dropdown, cap at 10
  };

  const handleRemovePackage = (index) => {
    const newData = packageData.filter((_, i) => i !== index);
    setPackageData(newData);
    setNoOfPackages(Math.max(newData.length, 1)); // Sync with dropdown, minimum 1
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
  
    if (!country?.trim()) newErrors.country = "Country name is required";
  
    if (!contactName?.trim()) newErrors.contactName = "Contact name is required";
  
    if (!addressLine1?.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
    } else if (!/^[a-zA-Z0-9\s.,-]+$/.test(addressLine1.trim())) {
      newErrors.addressLine1 = "Address Line 1 should not contain special characters";
    }
  
    if (addressLine2?.trim() && !/^[a-zA-Z0-9\s.,-]+$/.test(addressLine2.trim())) {
      newErrors.addressLine2 = "Address Line 2 should not contain special characters";
    }
  
    if (addressLine3?.trim() && !/^[a-zA-Z0-9\s.,-]+$/.test(addressLine3.trim())) {
      newErrors.addressLine3 = "Address Line 3 should not contain special characters";
    }
  
    if (!zipCode?.trim()) {
      newErrors.zipCode = "Zip Code is required";
    } 
    // else if (!/^[a-zA-Z0-9\s]+$/.test(zipCode.trim())) {
    //   newErrors.zipCode = "Zip Code should only contain numbers";
    // }
  
    if (!fromCity?.trim()) newErrors.fromCity = "City is required";
  
    if (!state?.trim()) newErrors.state = "State is required";
  
    if (!phone1?.trim()) {
      newErrors.phone1 = "Phone 1 is required";
    } else if (!/^\+?[1-9]\d{8,14}$/.test(phone1.trim())) {
      newErrors.phone1 = "Please enter a valid phone number";
    }
  
    if (!email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
  
    if (needsPickup === "Yes - I Need Pickup Service" && !pickupDate) {
      newErrors.pickupDate = "Pickup Date is required";
    }
  
    setSenderErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  // Validation for Recipient tab
  const validateRecipientForm = () => {
    const newErrors = {};
  
    if (!recipientContactName?.trim()) {
      newErrors.contactName = "Contact Name is required";
    }
  
    if (!recipientAddressLine1?.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
    } else if (!/^[a-zA-Z0-9\s.,-]+$/.test(recipientAddressLine1.trim())) {
      newErrors.addressLine1 = "Address Line 1 should not contain special characters";
    }
  
    if (recipientAddressLine2?.trim() && !/^[a-zA-Z0-9\s.,-]+$/.test(recipientAddressLine2.trim())) {
      newErrors.addressLine2 = "Address Line 2 should not contain special characters";
    }
  
    if (recipientAddressLine3?.trim() && !/^[a-zA-Z0-9\s.,-]+$/.test(recipientAddressLine3.trim())) {
      newErrors.addressLine3 = "Address Line 3 should not contain special characters";
    }
  
    if (!recipientZipCode?.trim()) {
      newErrors.recipientZipCode = "Zip Code is required";
    }
    // else if (!/^[a-zA-Z0-9\s]+$/.test(recipientZipCode.trim())) {
    //   newErrors.zipCode = "Zip Code should only contain numbers";
    // }
  
    if (!recipientCity?.trim()) {
      newErrors.recipientCity = "City is required";
    }
  
    if (!recipientState?.trim()) {
      newErrors.state = "State is required";
    }
  
    if (!recipientPhone1?.trim()) {
      newErrors.phone1 = "Phone 1 is required";
    } else if (!/^\+?[1-9]\d{8,14}$/.test(recipientPhone1.trim())) {
      newErrors.phone1 = "Please enter a valid phone number (9-15 digits, optional + prefix)";
    }
  
    if (!recipientEmail?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(recipientEmail.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
  
    setRecipientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  // Validation for Package tab
  const validatePackageForm = () => {
    console.log("starting to validate")
    const newErrors = {};
  
    // Main form validations
    if (!packageType) {
      newErrors.packageType = "Package Type is required";
    }
  
    if (!noOfPackages || noOfPackages < 1) {
      newErrors.noOfPackages = "Number of packages must be at least 1";
    }
  
    if (!dutiesPaidBy) {
      newErrors.dutiesPaidBy = "Duties & Taxes Paid By is required";
    }
  
    // Package data validation
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
      if (pkg.insured_value === undefined || pkg.insured_value < 0) {
        newErrors[`insured_value_${index}`] = "Insured value is required and must be 0 or greater";
      }
    });
  
    // ✅ Validate commercialInvoiceData only if any field in the invoice is filled
    if (samecountry === false && Array.isArray(commercialInvoiceData)) {
      commercialInvoiceData.forEach((invoice, index) => {
        const hasAnyField =
          invoice.packageNumber ||
          invoice.contentDescription ||
          invoice.quantity ||
          invoice.valuePerQty;
    
        if (hasAnyField) {
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
        }
      });
    }
    
  
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
        package: shipmentType !== "Ocean",
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
        needsPickup,
        pickupDate,
      });
      setCompletedTabs((prev) => ({
         ...prev,
         sender: true,
         package: shipmentType !== "Ocean" }));
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
      });
      setCompletedTabs((prev) => {
        const updatedTabs = { ...prev, recipient: true };
        console.log("Updated completedTabs:", updatedTabs);
        return updatedTabs;
      });
      const nextTab = shipmentType === "Ocean" ? "payment" : "package";
      // console.log("Navigating to:", nextTab);
      setActiveTab(nextTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle form submission for Package tab
  const handlePackageSubmit = () => {
    if (validatePackageForm()) {
      console.log("Package Form submitted:", {
        packageData,
        commercialInvoiceData,
      });
      setCompletedTabs((prev) => ({ ...prev, package: true }));
      // setActiveTab("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleSubmit(); 
      // navigate("/admin/ScheduleConfirmation", { replace: true });

    }
  };

  // Handle tab change with validation
  const handleTabChange = (newTab) => {
    const tabOrder =
      shipmentType === "Ocean"
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
      setConfirmation(false);
      setActiveTab("schedule-pickup");
      setCompletedTabs({
        "schedule-pickup": false,
        sender: false,
        recipient: false,
        package: shipmentType !== "Ocean",
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

    setcountrycode(fromCountryObj ? fromCountryObj.value.toLowerCase() : "");
    setCountryId(fromCountryObj ? fromCountryObj.countryid : "");
    setRecipientCountry(toCountryObj ? toCountryObj.label : "");
    setRecipientCountryId(toCountryObj ? toCountryObj.countryid : "");
    setrecipientcountrycode(toCountryObj ? toCountryObj.value.toLowerCase() : "");

    setSamecountry(fromCountryObj && toCountryObj && fromCountryObj.value === toCountryObj.value);

  }, [fromCountry, toCountry,countrycode,countryId,recipientCountryId,recipientcountrycode]);

  return (
    <Root>
      <Sidebar
        drawerOpen={drawerOpen}
        Loginname={Loginname}
        toggleDrawer={toggleDrawer}
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        activeModule={activeModule}
        handleModuleClick={handleModuleClick}
        drawerWidth={drawerwidth}
        setDrawerWidth={setDrawerWidth}
      />

      {/* Main Content */}
      <MainContent>
        {/* Header */}
        <AppBar position="static" color="default" elevation={1} sx={{ boxShadow: "none", }}>
          <AppBarBox>
            <DesktopToggleBtn>
              <IconButton
                edge="start"
                color="primary"
                onClick={halfopen}
              >
                {drawerwidth ===70 ? <ListIcon /> : <MoreVertIcon />}
              </IconButton>
            </DesktopToggleBtn>

            <MobileToggleBtn>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </MobileToggleBtn>


            <Box sx={{ flexGrow: 1 }} />


            <UsernameButton
              startIcon={<AccountCircleIcon />}
              onClick={handleMenuOpen}
            >
              {Loginname}
            </UsernameButton>


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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </AppBarBox>
        </AppBar>
        {activeModule === "Schedule Shipment" && !confirmation && (
        <ContentBox >
        
          <Typography variant="h5" sx={{ mb: 3 }}>
            <IconBox className="card-icon">
              <FlightTakeoffIcon className={classes.iconBox} />
            </IconBox>
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
              countrycode={countrycode}
              countryId={countryId}
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
              needsPickup={needsPickup}
              setNeedsPickup={setNeedsPickup}
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              senderErrors={senderErrors}
              setSenderErrors={setSenderErrors}
              handleSenderSubmit={handleSenderSubmit}
              handlePrevious={handlePrevious}
            />
          )}
          {activeModule === "Schedule Shipment" && activeTab === "recipient" && (
            <Recipient
              {...{
                recipientCountry,
                recipientcountrycode,
                recipientCountryId,
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
                recipientErrors,
                setRecipientErrors,
                handleRecipientSubmit,
                handleRecipientPrevious,
              }}
            />
          )}
          {/* Package Tab - Only render if shipmentType is not "Ocean" */}
          {activeModule === "Schedule Shipment" && activeTab === "package" && shipmentType !== "Ocean" && (
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
              samecountry={samecountry}
            />
          )}

          {/* {activeModule === "Schedule Shipment" && activeTab === "payment" && (
            <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
              <Typography variant="h5">Payment Form</Typography>
              <Typography>Form for payment details will go here.</Typography>
            </Box>
          )} */}
        </ContentBox>)}

        {/* Placeholder for other modules */}
        {/* {activeModule === "My Shipment" && activeTab === "my-shipment" && (
         navigate("ShipmentList")
        )} */}

        {/* {activeModule === "Billing" && (
          <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
            <Typography variant="h5">Billing</Typography>
            <Typography>Content for Billing will go here.</Typography>
          </Box>
        )} */}
        {/* {activeModule === "File a Claim" && (
          <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
            <Typography variant="h5">File a Claim</Typography>
            <Typography>Content for File a Claim will go here.</Typography>
          </Box>
        )} */}
        <Routes>
        <Route path="ShipmentList" element={<Myshipment edit={edit} setEdit={setEdit}/>} />
        <Route path="MyShipmentNew" element={<Myshipmentnew setEdit={setEdit} /> } />
        <Route path="ScheduleConfirmation" element={<ScheduleConfirmation />} />
      </Routes>
      </MainContent>
      
    </Root>
  );
};

export default Schedule;