import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { 
  TextField,
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  InputAdornment,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
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


const ResponsiveTable = ({ columns, rows }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");




  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {rows.map((row, rowIndex) => (
          <SectionPaper key={rowIndex} sx={{ p: 1.5 }}>
            {columns.map((col, colIndex) => (
              <Box key={colIndex} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ minWidth: 120, fontWeight: 'bold' }}>
                  {col}:
                </Typography>
                <TextField
                  fullWidth
                  value={row[col.toLowerCase().replace(/\(|\)/g, '')] || ""}
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
            <TableCell key={col}>{col}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell key={col}>
                <TextField
                  fullWidth
                  value={row[col.toLowerCase().replace(/\(|\)/g, '')] || ""}
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
  const isMobile = useMediaQuery('(max-width:600px)');

  const shipmentInfo = shipment?.SHIPMENTINFO?.[0] || {};
  const fromAddress = shipment?.SHIPMENTDETAILS?.find((d) => d.entitytype === "FromAddress") || {};
  const toAddress = shipment?.SHIPMENTDETAILS?.find((d) => d.entitytype === "ToAddress") || {};
  const packages = shipment?.PACKAGE || [];
  const commercialItems = shipment?.COMMERCIAL || [];
  const trackingDetails = shipment?.TRACKINGDETAILS || [];
  const accountsDetails = shipment?.ACCOUNTSDETAILS || [];
  console.log("shipmentInfo", shipment?.PACKAGE);

  if (!shipment || !shipmentInfo) {
    return (
      <Box sx={{ p: isMobile ? 1.5 : 2.5, color: 'error.main' }}>
        No shipment data available.
      </Box>
    );
  }

  const handleBack = () => {
    setEdit(false);
    navigate("/admin/ShipmentList", { replace: true });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab);
  };

  return (
    <Box sx={{ p: isMobile ? 1.5 : 2.5, fontFamily: 'Arial, sans-serif', width: '100%' }}>
      <SectionPaper>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 1.5 : 2.5 , position:'relative',pl:6}}>
        <IconBox>
          <FlightTakeoffIcon sx={{ fontSize: isMobile ? 20 : 23, color: 'white' }} />
        </IconBox>
        <ResponsiveTypography variant="h5" sx={{pl:1.5,mt:-1.5,mb:3}}>
          Shipment Information
        </ResponsiveTypography>
      </Box>

      
      <GridContainer>
  <FormControl fullWidth variant="outlined">
    <InputLabel>Shipment Status</InputLabel>
    <Select value={shipmentInfo.shipmentstatus || "New Request"} label="Shipment Status">
      {shipment?.SHIPMENTSTATUS?.map((status) => (
        <MenuItem key={status.stringmapid} value={status.description}>
          {status.description}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <TextField
    fullWidth
    label="Tracking Number"
    value={shipmentInfo.trackingnumber || ""}
    InputProps={{ readOnly: true }}
    variant="outlined"
  />

  <FormControl fullWidth variant="outlined">
    <InputLabel>Package Type</InputLabel>
    <Select value={fromAddress.packagetype || "Package"} label="Package Type">
      <MenuItem value="Package">Package</MenuItem>
      <MenuItem value="Document">Document</MenuItem>
    </Select>
  </FormControl>

  <TextField
    fullWidth
    label="No. of Packages"
    value={fromAddress.totalpackages || "0"}
    InputProps={{ readOnly: true }}
    variant="outlined"
  />
</GridContainer>
<GridContainer>
  <TextField
    fullWidth
    label="Managed By"
    value={shipmentInfo.managedbyname || ""}
    InputProps={{ readOnly: true }}
    variant="outlined"
  />

  <FormControl fullWidth variant="outlined">
    <InputLabel>Shipment Type</InputLabel>
    <Select value={shipmentInfo.shipmenttype || "Ocean"} label="Shipment Type">
      {shipment?.SHIPMENTTYPE?.map((type) => (
        <MenuItem key={type.stringmapid} value={type.description}>
          {type.description}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl fullWidth variant="outlined">
    <InputLabel>Service Type</InputLabel>
    <Select value={fromAddress.servicename || ""} label="Service Type">
      <MenuItem value="">Select</MenuItem>
      <MenuItem value="Standard">Standard</MenuItem>
      <MenuItem value="Express">Express</MenuItem>
    </Select>
  </FormControl>

  <FormControl fullWidth variant="outlined">
    <InputLabel>Sub Service Type</InputLabel>
    <Select value={fromAddress.subservicename || ""} label="Sub Service Type">
      <MenuItem value="">Select</MenuItem>
    </Select>
  </FormControl>
</GridContainer>
      </SectionPaper>

      <TabNavigation activeTab={activeTab} handleTabClick={handleTabClick} />

      {activeTab === "customer" && (
        <>
          <SectionPaper>
  <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
    Sender Information
  </ResponsiveTypography>
  <GridContainer>
    <TextField
      fullWidth
      label="Contact Name"
      value={fromAddress.contactname || ""}
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
    <TextField
      fullWidth
      label="Address Line 1"
      value={fromAddress.addressline1 || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <LocationOnIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Address Line 2"
      value={fromAddress.addressline2 || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <LocationOnIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Address Line 3"
      value={fromAddress.addressline3 || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PublicIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  </GridContainer>
  <GridContainer>
    <FormControl fullWidth variant="outlined">
      <InputLabel>From Country</InputLabel>
      <Select value={fromAddress.countryid === "341168f9-1ba3-4511-8c84-aa3bdd3cf349" ? "India" : ""} label="From Country">
        <MenuItem value="India">India</MenuItem>
        <MenuItem value="Australia">Australia</MenuItem>
      </Select>
    </FormControl>
    <TextField
      fullWidth
      label="Zip"
      value={fromAddress.zipcode || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <EmailIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="City"
      value={fromAddress.city || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <BusinessIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <FormControl fullWidth variant="outlined">
      <InputLabel>State</InputLabel>
      <Select value={fromAddress.state || ""} label="State">
        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
        <MenuItem value="Victoria">Victoria</MenuItem>
      </Select>
    </FormControl>
  </GridContainer>
  <GridContainer>
    <TextField
      fullWidth
      label="Company Name"
      value={fromAddress.companyname || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <BusinessCenterIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Phone 1"
      value={fromAddress.phone1 || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <LocalPhoneIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Phone 2"
      value={fromAddress.phone2 || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <LocalPhoneIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Email"
      value={fromAddress.email || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <EmailIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  </GridContainer>
</SectionPaper>

<SectionPaper>
  <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
    Recipient Details
  </ResponsiveTypography>
  <GridContainer>
    <TextField
      fullWidth
      label="Contact Name"
      value={toAddress.contactname || ""}
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
    <TextField
      fullWidth
      label="Address Line 1"
      value={toAddress.addressline1 || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <LocationOnIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Address Line 2"
      value={toAddress.addressline2 || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <LocationOnIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Address Line 3"
      value={toAddress.addressline3 || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PublicIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  </GridContainer>
  <GridContainer>
    <FormControl fullWidth variant="outlined">
      <InputLabel>To Country</InputLabel>
      <Select value={toAddress.countryid === "4e37f702-cbe7-4a01-822e-900d21a30bf8" ? "Australia" : ""} label="To Country">
        <MenuItem value="India">India</MenuItem>
        <MenuItem value="Australia">Australia</MenuItem>
      </Select>
    </FormControl>
    <TextField
      fullWidth
      label="Zip"
      value={toAddress.zipcode || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <EmailIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="City"
      value={toAddress.city || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <BusinessIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <FormControl fullWidth variant="outlined">
      <InputLabel>State</InputLabel>
      <Select value={toAddress.state || ""} label="State">
        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
        <MenuItem value="Victoria">Victoria</MenuItem>
      </Select>
    </FormControl>
  </GridContainer>
  <GridContainer>
    <TextField
      fullWidth
      label="Company Name"
      value={toAddress.companyname || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <BusinessCenterIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Phone 1"
      value={toAddress.phone1 || ""}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <LocalPhoneIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Phone 2"
      value={toAddress.phone2 || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <LocalPhoneIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Email"
      value={toAddress.email || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <EmailIcon sx={{ fontSize: isMobile ? 18 : 24 }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  </GridContainer>
</SectionPaper>

<SectionPaper>
  <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
    Additional Details
  </ResponsiveTypography>
  <GridContainer>
    <TextField
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
      <InputLabel>Location Type</InputLabel>
      <Select value={fromAddress.locationtype || "Residential"} label="Location Type">
        <MenuItem value="Residential">Residential</MenuItem>
        <MenuItem value="Commercial">Commercial</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth variant="outlined">
      <InputLabel>Duties & Taxes Paid By</InputLabel>
      <Select value={fromAddress.dutiespaidby || ""} label="Duties & Taxes Paid By">
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Recipient">Recipient</MenuItem>
        <MenuItem value="Sender">Sender</MenuItem>
      </Select>
    </FormControl>
    <TextField
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
        <TableContainer sx={{ overflowX: 'auto' }}>
          <ResponsiveTable
            columns={["Number", "Weight", "Dim(L)", "Dim(W)", "Dim(H)", "Charge Weight", "Insurance"]}
            rows={packages.map((pkg) => ({
              number: pkg.packagenumber.toString(),
              weight: pkg.estimetedweight,
              dimL: pkg.length,
              dimW: pkg.width,
              dimH: pkg.height,
              chargeWeight: pkg.chargableweight,
              insurance: pkg.insuredvalue,
            }))}
          />
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 2.5 }}>
          <TextField
            label="Total Packages"
            value={fromAddress.totalpackages || "0"}
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
          <TextField
            label="Total Insured Value"
            value={fromAddress.totalinsuredvalue || "0.00"}
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        </Box>
      </SectionPaper>
      )}

      {activeTab === "commercial" && (
       <SectionPaper>
       <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
         Commercial Invoice
       </ResponsiveTypography>
       <TableContainer sx={{ overflowX: 'auto' }}>
         <ResponsiveTable
           columns={["Package Number", "Package Content", "Quantity", "Value Per Qty", "Total Value"]}
           rows={commercialItems.map((item) => ({
             packageNumber: item.packagenumber.toString(),
             packageContent: item.contentdescription,
             quantity: item.quantity.toString(),
             valuePerQty: item.valueperquantity,
             totalValue: item.totalvalue,
           }))}
         />
       </TableContainer>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
         <TextField
           label="Total Cost:"
           value={commercialItems.reduce((sum, item) => sum + parseFloat(item.totalvalue || 0), 0).toFixed(2)}
           variant="outlined"
           InputProps={{ readOnly: true }}
           sx={{ width: isMobile ? '100%' : 'auto' }}
         />
       </Box>
     </SectionPaper>
      )}

      {activeTab === "tracking" && (
        <SectionPaper>
        <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
          Tracking
        </ResponsiveTypography>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <ResponsiveTable
            columns={["Date", "Time", "Updates"]}
            rows={trackingDetails.length > 0 ? trackingDetails.map((track) => ({
              date: track.date || "",
              time: track.time || "",
              updates: track.updates || "",
            })) : [{
              date: "",
              time: "",
              updates: "No tracking details available",
            }]}
          />
        </TableContainer>
      </SectionPaper>
      )}

      {activeTab === "accounts" && (
        <SectionPaper>
        <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
          Invoice
        </ResponsiveTypography>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <TableStyled>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountsDetails.length > 0 ? (
                accountsDetails.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={invoice.date || ""}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Service</InputLabel>
                        <Select value={invoice.service || ""} label="Service">
                          <MenuItem value="">Select</MenuItem>
                          {shipment?.INVENTORY?.map((inv) => (
                            <MenuItem key={inv.stringmapid} value={inv.description}>
                              {inv.description}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={invoice.description || ""}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={invoice.quantity || "0"}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={invoice.cost || "0.00"}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={invoice.total || "0.00"}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <TextField
                      fullWidth
                      value="No invoice details available"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableStyled>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
          <TextField
            label="Total Cost:"
            value={accountsDetails.reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0).toFixed(2)}
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        </Box>
      
        <ResponsiveTypography variant="h6" sx={{ mt: isMobile ? 1.5 : 2.5, mb: isMobile ? 1.5 : 2.5 }}>
          Payment Made
        </ResponsiveTypography>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <TableStyled>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Confirmation</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountsDetails.length > 0 ? (
                accountsDetails.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={payment.paymentDate || ""}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Payment Type</InputLabel>
                        <Select value={payment.paymenttype || ""} label="Payment Type">
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="Credit Card">Credit Card</MenuItem>
                          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={payment.paymentNumber || ""}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={payment.confirmation || ""}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={payment.amount || "0.00"}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <TextField
                      fullWidth
                      value="No payment details available"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableStyled>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
          <TextField
            label="Total Cost:"
            value={accountsDetails.reduce((sum, pay) => sum + parseFloat(pay.amount || 0), 0).toFixed(2)}
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        </Box>
      </SectionPaper>
      )}

      {activeTab === "documentation" && (
        <SectionPaper>
          <ResponsiveTypography variant="h6" sx={{ mb: isMobile ? 1.5 : 2.5 }}>
            Documentation
          </ResponsiveTypography>
          <TableContainer sx={{ overflowX: 'auto' }}>
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
                {[
                  { type: "Commercial Invoice" },
                  { type: "Invoice" },
                  { type: "Contract" },
                ].map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Document Type</InputLabel>
                        <Select value={doc.type} label="Document Type">
                          <MenuItem value="Commercial Invoice">Commercial Invoice</MenuItem>
                          <MenuItem value="Invoice">Invoice</MenuItem>
                          <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TextField
                      fullWidth
                      value=""
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                    <TableCell>
                      <TextField
                        fullWidth
                        value="04/15/2025"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <ResponsiveButton
                        variant="contained"
                        color="error"
                        sx={{ textTransform: 'none', fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                      >
                        VIEW FILE
                      </ResponsiveButton>
                    </TableCell>
                    <TableCell>
                      <ResponsiveButton
                        variant="contained"
                        sx={{ backgroundColor: '#ff9800', textTransform: 'none', fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                      >
                        APPROVED
                      </ResponsiveButton>
                    </TableCell>
                    <TableCell>
                      <ResponsiveButton
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none', fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                      >
                        ...
                      </ResponsiveButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableStyled>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1.25,
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 1 : 0,
            }}
          >
            <ResponsiveButton
              variant="contained"
              sx={{ backgroundColor: '#e0e0e0', color: '#757575', textTransform: 'none' }}
            >
              Previous
            </ResponsiveButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 1.25, flexDirection: isMobile ? 'column' : 'row' }}>
              <ResponsiveTypography>Page 1 of 1</ResponsiveTypography>
              <TextField
                variant="outlined"
                value="10 rows"
                InputProps={{ readOnly: true }}
                sx={{ width: isMobile ? '100%' : '100px' }}
              />
            </Box>
            <ResponsiveButton
              variant="contained"
              sx={{ backgroundColor: '#e0e0e0', color: '#757575', textTransform: 'none' }}
            >
              Next
            </ResponsiveButton>
          </Box>
        </SectionPaper>
      )}

      <ButtonContainer>
        <ResponsiveButton
          variant="contained"
          sx={{ backgroundColor: '#ab47bc', textTransform: 'none' }}
        >
          DUPLICATE
        </ResponsiveButton>
        <ResponsiveButton
          variant="contained"
          color="error"
          onClick={handleBack}
          sx={{ textTransform: 'none' }}
        >
          BACK TO MY SHIPMENT
        </ResponsiveButton>
      </ButtonContainer>
    </Box>
  );
};

export default Myshipmentnew;