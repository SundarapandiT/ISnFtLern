import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Box,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  IconBox,
  SectionPaper,
  GridContainer,
  TableStyled,
  ButtonContainer,
  ResponsiveTypography,
  ResponsiveButton,
} from "../../styles/myshipmentnew";
import TabNavigation from "./TabNavigation";

// Define StyledTextField if not already defined in styles
const StyledTextField = ({ sx, ...props }) => (
  <TextField
    {...props}
    sx={{
      ...sx,
      "& .MuiInputBase-input": { fontSize: "0.875rem" },
      "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    }}
  />
);

const ResponsiveTable = ({ columns, rows, columnWidths = {} }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {rows.map((row, rowIndex) => (
          <SectionPaper key={rowIndex} sx={{ p: 1.5 }}>
            {columns.map((col, colIndex) => (
              <Box
                key={colIndex}
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="caption"
                  sx={{ minWidth: 120, fontWeight: "bold", fontSize: "0.75rem" }}
                >
                  {col}:
                </Typography>
                <StyledTextField
                  fullWidth
                  value={row[col.toLowerCase().replace(/\(|\)/g, "")] || ""}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Box>
            ))}
          </SectionPaper>
        ))}
      </Box>
    );
  }

  return (
    <TableStyled>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col} sx={{ width: columnWidths[col] || "auto", fontSize: "0.75rem" }}>
              {col}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell key={col} sx={{ width: columnWidths[col] || "auto", fontSize: "0.75rem" }}>
                <StyledTextField
                  fullWidth
                  value={row[col.toLowerCase().replace(/\(|\)/g, "")] || ""}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableStyled>
  );
};

const Myshipmentnew = ({ setEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");
  const { shipment } = location.state || {};
  const isMobile = useMediaQuery("(max-width:600px)");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const shipmentInfo = shipment?.SHIPMENTINFO?.[0] || {};
  const fromAddress =
    shipment?.SHIPMENTDETAILS?.find((d) => d.entitytype === "FromAddress") ||
    {};
  const toAddress =
    shipment?.SHIPMENTDETAILS?.find((d) => d.entitytype === "ToAddress") || {};
  const packages = shipment?.PACKAGE || [];
  const commercialItems = shipment?.COMMERCIAL || [];
  const trackingDetails = shipment?.TRACKINGDETAILS || [];
  const invoiceData = shipment?.ACCOUNTSDETAILS?.[0]?.InvoiceData || [];
  const paymentData = shipment?.ACCOUNTSDETAILS?.[0]?.PaymentReceivedData || [];

  const isSameCountry =
    fromAddress.countryid && toAddress.countryid
      ? fromAddress.countryid === toAddress.countryid
      : false;

  useEffect(() => {
    if (isSameCountry && activeTab === "commercial") {
      setActiveTab("customer");
    }
  }, [isSameCountry, activeTab]);

  const documents = [
    {
      type: "Commercial Invoice",
      documentName: "",
      createdOn: "",
      attachment: "VIEW FILE",
      status: "IN PROGRESS",
    },
    {
      type: "Invoice",
      documentName: "",
      createdOn: "",
      attachment: "VIEW FILE",
      status: "IN PROGRESS",
    },
    {
      type: "Contract",
      documentName: "",
      createdOn: "",
      attachment: "VIEW FILE",
      status: "IN PROGRESS",
    },
  ];

  if (!shipment || !shipmentInfo) {
    return (
      <Box sx={{ p: isMobile ? 1.5 : 2.5, color: "error.main", fontSize: "0.75rem" }}>
        No shipment data available.
      </Box>
    );
  }

  const handleBack = () => {
    setEdit(false);
    navigate("/admin/ShipmentList", { replace: true });
  };

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, Math.ceil(documents.length / rowsPerPage) - 1));
  };

  const displayedRows = documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box
      sx={{
        p: isMobile ? 1.5 : 2.5,
        fontFamily: "Arial, sans-serif",
        width: "100%",
      }}
    >
      <SectionPaper>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: isMobile ? 1.5 : 2.5,
            position: "relative",
            pl: 6,
          }}
        >
          <IconBox>
            <FlightTakeoffIcon
              sx={{ fontSize: isMobile ? 20 : 23, color: "white" }}
            />
          </IconBox>
          <ResponsiveTypography variant="h5" sx={{ pl: 1.5, mt: -1.5, mb: 3 }}>
            Shipment Information
          </ResponsiveTypography>
        </Box>

        <GridContainer>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ fontSize: "0.875rem" }}>Shipment Status</InputLabel>
            <Select
              value={shipmentInfo.shipmentstatus || ""}
              label="Shipment Status"
              disabled
              sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
            >
              {shipment?.SHIPMENTSTATUS?.map((status) => (
                <MenuItem key={status.stringmapid} value={status.description} sx={{ fontSize: "0.75rem" }}>
                  {status.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <StyledTextField
            fullWidth
            label="Tracking Number"
            disabled
            value={shipmentInfo.trackingnumber || ""}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />

          {/* <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ fontSize: "0.875rem" }}>Package Type</InputLabel>
            <Select
              value={fromAddress.packagetype || "Package"}
              label="Package Type"
              disabled
              sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
            >
              <MenuItem value="Package" sx={{ fontSize: "0.75rem" }}>Package</MenuItem>
              <MenuItem value="Document" sx={{ fontSize: "0.75rem" }}>Document</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            fullWidth
            label="Package Type"
            disabled
            value={packages && packages.length > 0 ? packages[0].packagetype || "" : ""}
            InputProps={{ readOnly: true }}
            variant="outlined"
            sx={{ fontSize: "0.875rem" }} // You can adjust the overall font size here if needed
            InputLabelProps={{ style: { fontSize: "0.875rem" } }} // Style the label
            inputProps={{ style: { fontSize: "0.875rem" } }} // Style the input text
          />
          <StyledTextField
            fullWidth
            label="No. of Packages"
            disabled
            value={fromAddress.totalpackages || "0"}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />
        </GridContainer>
        <GridContainer>
          <StyledTextField
            fullWidth
            disabled
            label="Managed By"
            value={shipmentInfo.managedbyname || ""}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ fontSize: "0.875rem" }}>Shipment Type</InputLabel>
            <Select
              disabled
              value={shipmentInfo.shipmenttype || "Ocean"}
              label="Shipment Type"
              sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
            >
              {shipment?.SHIPMENTTYPE?.map((type) => (
                <MenuItem key={type.stringmapid} value={type.description} sx={{ fontSize: "0.75rem" }}>
                  {type.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ fontSize: "0.875rem" }}>Service Type</InputLabel>
            <Select
              value={fromAddress.servicename || ""}
              label="Service Type"
              disabled
              sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
            >
              <MenuItem value="" sx={{ fontSize: "0.75rem" }}>Select</MenuItem>
              <MenuItem value="Standard" sx={{ fontSize: "0.75rem" }}>Standard</MenuItem>
              <MenuItem value="Express" sx={{ fontSize: "0.75rem" }}>Express</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ fontSize: "0.875rem" }}>Sub Service Type</InputLabel>
            <Select
              value={fromAddress.subservicename || ""}
              label="Sub Service Type"
              disabled
              sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
            >
              <MenuItem value="" sx={{ fontSize: "0.75rem" }}>Select</MenuItem>
            </Select>
          </FormControl>
        </GridContainer>
      </SectionPaper>

      <TabNavigation
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        isSameCountry={isSameCountry}
      />

      {activeTab === "customer" && (
        <>
          <SectionPaper>
            <ResponsiveTypography
              variant="h6"
              sx={{ mb: isMobile ? 1.5 : 2.5 }}
            >
              Sender Information
            </ResponsiveTypography>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Contact Name"
                value={fromAddress.contactname || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Address Line 1"
                value={fromAddress.addressline1 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Address Line 2"
                value={fromAddress.addressline2 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Address Line 3"
                value={fromAddress.addressline3 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <PublicIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </GridContainer>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Country"
                value={fromAddress.countryname || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Zip"
                value={fromAddress.zipcode || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="City"
                value={fromAddress.city || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <BusinessIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="State"
                value={fromAddress.state || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </GridContainer>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Company Name"
                value={fromAddress.companyname}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <BusinessCenterIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Phone 1"
                value={fromAddress.phone1 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalPhoneIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Phone 2"
                value={fromAddress.phone2 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalPhoneIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Email"
                value={fromAddress.email || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </GridContainer>
          </SectionPaper>

          <SectionPaper>
            <ResponsiveTypography
              variant="h6"
              sx={{ mb: isMobile ? 1.5 : 2.5 }}
            >
              Recipient Details
            </ResponsiveTypography>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Contact Name"
                value={toAddress.contactname || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Address Line 1"
                value={toAddress.addressline1 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Address Line 2"
                value={toAddress.addressline2 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Address Line 3"
                value={toAddress.addressline3 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <PublicIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </GridContainer>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Country"
                value={toAddress.countryname || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Zip"
                value={toAddress.zipcode || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="City"
                value={toAddress.city || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <BusinessIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="State"
                value={toAddress.state || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </GridContainer>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Company Name"
                value={toAddress.companyname || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <BusinessCenterIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Phone 1"
                value={toAddress.phone1 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalPhoneIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Phone 2"
                value={toAddress.phone2 || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocalPhoneIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <StyledTextField
                fullWidth
                label="Email"
                value={toAddress.email || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon sx={{ fontSize: isMobile ? 18:24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </GridContainer>
          </SectionPaper>

          <SectionPaper>
            <ResponsiveTypography
              variant="h6"
              sx={{ mb: isMobile ? 1.5 : 2.5 }}
            >
              Additional Details
            </ResponsiveTypography>
            <GridContainer>
              <StyledTextField
                fullWidth
                label="Ship Date"
                value={shipmentInfo.shipmentdate || ""}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ fontSize: "0.875rem" }}>Location Type</InputLabel>
                <Select
                  disabled
                  value={fromAddress.locationtype || ""}
                  label="Location Type"
                  sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
                >
                  <MenuItem value="Residential" sx={{ fontSize: "0.75rem" }}>Residential</MenuItem>
                  <MenuItem value="Commercial" sx={{ fontSize: "0.75rem" }}>Commercial</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ fontSize: "0.875rem" }}>Duties & Taxes Paid By</InputLabel>
                <Select
                  disabled
                  value={fromAddress.dutiespaidby || "Recipient"}
                  label="Duties & Taxes Paid By"
                  sx={{ "& .MuiSelect-select": { fontSize: "0.875rem" } }}
                >
                  <MenuItem value="" sx={{ fontSize: "0.75rem" }}>Select</MenuItem>
                  <MenuItem value="Recipient" sx={{ fontSize: "0.75rem" }}>Recipient</MenuItem>
                  <MenuItem value="Sender" sx={{ fontSize: "0.75rem" }}>Sender</MenuItem>
                </Select>
              </FormControl>
              <StyledTextField
                fullWidth
                label="Username"
                value={shipmentInfo.createdbyname || ""}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </GridContainer>
          </SectionPaper>
        </>
      )}

      {activeTab === "package" && (
        <SectionPaper>
          <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
            Package
          </ResponsiveTypography>
          <TableContainer sx={{ overflowX: "auto" }}>
            <ResponsiveTable
              columns={[
                "Number",
                "Weight",
                "Dim(L)",
                "Dim(W)",
                "Dim(H)",
                "ChargeWeight",
                "Insurance",
              ]}
              rows={packages.map((pkg) => ({
                number: pkg.packagenumber.toString() || "1",
                weight: pkg.estimetedweight || "0.00",
                diml: pkg.length || "0.00",
                dimw: pkg.width || "0.00",
                dimh: pkg.height || "0.00",
                chargeweight: pkg.chargableweight || "0.00",
                insurance: pkg.insuredvalue || "0.00",
              }))}
            />
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1.25,
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 1 : 2.5,
            }}
          >
            <StyledTextField
              label="Total Packages"
              value={fromAddress.totalpackages || "0"}
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ width: isMobile ? "100%" : "auto" }}
            />
            <StyledTextField
              label="Total Insured Value"
              value={fromAddress.totalinsuredvalue || "0.00"}
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ width: isMobile ? "100%" : "auto" }}
            />
          </Box>
        </SectionPaper>
      )}

      {activeTab === "commercial" && !isSameCountry && (
        <SectionPaper>
          <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
            Commercial Invoice
          </ResponsiveTypography>
          <TableContainer sx={{ overflowX: "auto" }}>
            <ResponsiveTable
              columns={[
                "PackageNumber",
                "PackageContent",
                "Quantity",
                "ValuePerQty",
                "TotalValue",
              ]}
              rows={commercialItems.map((item) => ({
                packagenumber: item.packagenumber.toString() || "1",
                packagecontent: item.contentdescription || "",
                quantity: item.quantity.toString() || "0",
                valueperqty: item.valueperquantity || "0.00",
                totalvalue: item.totalvalue || "0.00",
              }))}
            />
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.25 }}>
            <StyledTextField
              label="Total Cost:"
              value={commercialItems
                .reduce(
                  (sum, item) => sum + parseFloat(item.totalvalue || 0),
                  0
                )
                .toFixed(2) || "0.00"}
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ width: isMobile ? "100%" : "auto" }}
            />
          </Box>
        </SectionPaper>
      )}

      {activeTab === "tracking" && (
        <SectionPaper>
          <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
            Tracking
          </ResponsiveTypography>
          <TableContainer sx={{ overflowX: "auto" }}>
            <ResponsiveTable
              columns={["Date", "Time", "Updates"]}
              columnWidths={{
                Date: "15%",
                Time: "15%",
                Updates: "70%", 
              }}
              rows={
                trackingDetails.length > 0
                  ? trackingDetails.map((track) => ({
                      date: track.PickupDate || "",
                      time: track.PickupTime || "",
                      updates: track.Updates || "",
                    }))
                  : [
                      {
                        date: "",
                        time: "",
                        updates: "No tracking details available",
                      },
                    ]
              }
            />
          </TableContainer>
        </SectionPaper>
      )}

      {activeTab === "accounts" && (
        <SectionPaper>
  <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
    Invoice
  </ResponsiveTypography>
  <TableContainer sx={{ overflowX: "auto" }}>
    <ResponsiveTable
      columns={["Date", "Service", "Description", "Qty", "Cost", "Total"]}
      columnWidths={{
        Date: "11%",
        Service: "25%",
        Description: "30%",
        Qty: "9%",
        Cost: "10%",
        Total: "15%",
      }}
      rows={
        invoiceData.length > 0
          ? invoiceData.map((inv) => ({
              date: inv.InvoiceDate || "",
              service: inv.ServiceDescription || "",
              description: inv.Description || "",
              qty: inv.Quantity || "0",
              cost: inv.Amount || "0.00",
              total: inv.TotalAmount || "0.00",
            }))
          : [
              {
                date: "",
                service: "",
                description: "",
                qty: "",
                cost: "",
                total: "No invoice ",
              },
            ]
      }
    />
  </TableContainer>

  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.25 }}>
    <StyledTextField
      label="Total Cost:"
      value={invoiceData
        .reduce((sum, inv) => sum + parseFloat(inv.TotalAmount || 0), 0)
        .toFixed(2)}
      variant="outlined"
      InputProps={{ readOnly: true }}
      sx={{ width: isMobile ? "100%" : "auto" }}
    />
  </Box>
  <ResponsiveTypography
    variant="h6"
    sx={{ mt: isMobile ? 1.5 : 2.5, mb: isMobile ? 1.5 : 2.5 }}
  >
    Payment Made
  </ResponsiveTypography>
  <TableContainer sx={{ overflowX: "auto" }}>
    <ResponsiveTable
      columns={["Date", "Payment Type", "Number", "Confirmation", "Amount"]}
      columnWidths={{
        Date: "11%",
        "Payment Type": "29%",
        Number: "20%",
        Confirmation: "20%",
        Amount: "20%",
      }}
      rows={
        paymentData.length > 0
          ? paymentData.map((pay) => ({
              date: pay.PaymentDate || "05-06-2025",
              "payment type": pay.PaymentType || "",
              number: pay.PaymentNumber || "",
              confirmation: pay.Confirmation || "",
              amount: pay.Amount || "0.00",
            }))
          : [
              {
                date: "",
                "payment type": "",
                number: "",
                confirmation: "",
                amount: "No payment",
              },
            ]
      }
    />
  </TableContainer>

  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.25 }}>
    <StyledTextField
      label="Total Cost:"
      value={paymentData
        .reduce((sum, pay) => sum + parseFloat(pay.Amount || 0), 0)
        .toFixed(2)}
      variant="outlined"
      InputProps={{ readOnly: true }}
      sx={{ width: isMobile ? "100%" : "auto" }}
    />
  </Box>
</SectionPaper>

      )}

      {activeTab === "documentation" && (
        <SectionPaper>
          <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5, textAlign: "center", color: "orange" }}>
            In-Progress
          </ResponsiveTypography>
          {/* <TableContainer sx={{ overflowX: "auto" }}>
            <TableStyled>
              <TableHead>
                <TableRow>
                  <TableCell>Document Type</TableCell>
                  <TableCell>Document Name</TableCell>
                  <TableCell>CreatedOn</TableCell>
                  <TableCell>Attachment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRows.length > 0 ? (
                  displayedRows.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Document Type</InputLabel>
                          <Select
                            value={doc.type}
                            label="Document Type"
                          >
                            <MenuItem value="Commercial Invoice">
                              Commercial Invoice
                            </MenuItem>
                            <MenuItem value="Invoice">Invoice</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={doc.documentName || ""}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={doc.createdOn || ""}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </TableCell>
                      <TableCell>
                        <ResponsiveButton
                          
                          variant="contained"
                          color="error"
                          sx={{
                            textTransform: "none",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          {doc.attachment}
                        </ResponsiveButton>
                      </TableCell>
                      <TableCell>
                        <ResponsiveButton
                          
                          variant="contained"
                          sx={{
                            backgroundColor: "#ff9800",
                            textTransform: "none",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          {doc.status}
                        </ResponsiveButton>
                      </TableCell>
                      <TableCell>
                        <ResponsiveButton
                          variant="contained"
                          color="primary"
                          sx={{
                            textTransform: "none",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          ...
                        </ResponsiveButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <TextField
                        fullWidth
                        value="No documents available"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableStyled>
          </TableContainer> */}
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1.25,
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 1 : 0,
            }}
          > */}
          {/* <ResponsiveButton
              variant="contained"
              onClick={handlePreviousPage}
              disabled={page === 0}
              sx={{
                backgroundColor: page === 0 ? "#e0e0e0" : undefined,
                color: page === 0 ? "#757575" : undefined,
                textTransform: "none",
              }}
            >
              Previous
            </ResponsiveButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 1 : 1.25,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <ResponsiveTypography>
                Page {page + 1} of {Math.ceil(documents.length / rowsPerPage)}
              </ResponsiveTypography>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                sx={{ width: isMobile ? "100%" : "100px" }}
              >
                <MenuItem value={5}>5 rows</MenuItem>
                <MenuItem value={10}>10 rows</MenuItem>
                <MenuItem value={20}>20 rows</MenuItem>
                <MenuItem value={25}>25 rows</MenuItem>
                <MenuItem value={50}>50 rows</MenuItem>
                <MenuItem value={100}>100 rows</MenuItem>
              </Select>
            </Box> */}
          {/* <ResponsiveButton
              variant="contained"
              onClick={handleNextPage}
              disabled={page >= Math.ceil(documents.length / rowsPerPage) - 1}
              sx={{
                backgroundColor:
                  page >= Math.ceil(documents.length / rowsPerPage) - 1
                    ? "#e0e0e0"
                    : undefined,
                color:
                  page >= Math.ceil(documents.length / rowsPerPage) - 1
                    ? "#757575"
                    : undefined,
                textTransform: "none",
              }}
            >
              Next
            </ResponsiveButton>
          </Box> */}
        </SectionPaper>
      )}

      <ButtonContainer>
        <ResponsiveButton
          variant="contained"
          color="error"
          onClick={handleBack}
          sx={{ textTransform: "none" }}
        >
          BACK TO MY SHIPMENT
        </ResponsiveButton>
      </ButtonContainer>
    </Box>
  );
};

export default Myshipmentnew;