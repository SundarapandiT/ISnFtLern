import {React,useState} from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { 
  TextField,
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  InputAdornment 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Import missing icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { IconBox } from "../../styles/scheduleshipmentStyle";
import TabNavigation from "./TabNavigation";

const Myshipmentnew = ({setEdit}) => {
  const location = useLocation();
  const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("customer");
  const { shipment } = location.state || {};

  if (!shipment) {
    return <div style={{ padding: "20px", color: "red" }}>No shipment data available.</div>;
  }

  const handleBack = () => {
  
    setEdit(false);
    navigate("/admin/ShipmentList", {replace: true});
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <IconBox>
              <FlightTakeoffIcon sx={{ fontSize: 23, color: "white" }} />
            </IconBox>
            <h2 style={{ margin: 0 }}>Shipment Information</h2>
          </div>
    
          <div style={{ 
            background: "#fff", 
            padding: "20px", 
            borderRadius: "8px", 
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Shipment Status</InputLabel>
                <Select value={shipment.status || "Cancelled"} label="Shipment Status">
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="In Transit">In Transit</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Customs Clearance">Customs Clearance</MenuItem>
                </Select>
              </FormControl>
    
              <TextField fullWidth label="Tracking Number" value={shipment.tracking || "101049399"} InputProps={{ readOnly: true }} variant="outlined" />
    
              <FormControl fullWidth variant="outlined">
                <InputLabel>Package Type</InputLabel>
                <Select value="Package" label="Package Type">
                  <MenuItem value="Package">Package</MenuItem>
                  <MenuItem value="Document">Document</MenuItem>
                </Select>
              </FormControl>
    
              <TextField fullWidth label="No. of Packages" value="1" InputProps={{ readOnly: true }} variant="outlined" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
              <TextField fullWidth label="Managed By" value="Nirav Shah" InputProps={{ readOnly: true }} variant="outlined" />
    
              <FormControl fullWidth variant="outlined">
                <InputLabel>Shipment Type</InputLabel>
                <Select value="Air" label="Shipment Type">
                  <MenuItem value="Air">Air</MenuItem>
                  <MenuItem value="Sea">Sea</MenuItem>
                </Select>
              </FormControl>
    
              <FormControl fullWidth variant="outlined">
                <InputLabel>Service Type</InputLabel>
                <Select value="Standard" label="Service Type">
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Express">Express</MenuItem>
                </Select>
              </FormControl>
    
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sub Service Type</InputLabel>
                <Select value="" label="Sub Service Type">
                  <MenuItem value="">Select</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
         {/* {tabsection} */}
         <TabNavigation activeTab={activeTab} handleTabClick={handleTabClick} />
        
          
    
          {activeTab === "customer" && (
            <>
              {/* Sender Information */}
              <div style={{ 
                background: "#fff", 
                padding: "20px", 
                borderRadius: "8px", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                marginTop: "20px" 
              }}>
                <h2 style={{ margin: "0 0 20px 0" }}>Sender Information</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    value="Test"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><PersonIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    value="Test"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><LocationOnIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><LocationOnIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 3"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><PublicIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>From Country</InputLabel>
                    <Select value="United States" label="From Country">
                      <MenuItem value="United States">United States</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Zip"
                    value="75063"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="City"
                    value="Irving"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><BusinessIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>State</InputLabel>
                    <Select value="Texas" label="State">
                      <MenuItem value="Texas">Texas</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value="Test"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><BusinessCenterIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone 1"
                    value="1234567890"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><LocalPhoneIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone 2"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><LocalPhoneIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value="test@gmail.com"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </div>
              </div>
    
              {/* Recipient Details */}
              <div style={{ 
                background: "#fff", 
                padding: "20px", 
                borderRadius: "8px", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                marginTop: "20px" 
              }}>
                <h2 style={{ margin: "0 0 20px 0" }}>Recipient Details</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    value="Test"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><PersonIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    value="Test"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><LocationOnIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><LocationOnIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 3"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><PublicIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>To Country</InputLabel>
                    <Select value="India" label="To Country">
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Zip"
                    value="380001"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="City"
                    value="Ahmedabad"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><BusinessIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>State</InputLabel>
                    <Select value="Gujarat" label="State">
                      <MenuItem value="Gujarat">Gujarat</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><BusinessCenterIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone 1"
                    value="1234567890"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><LocalPhoneIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone 2"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><LocalPhoneIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value=""
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </div>
              </div>
    
              {/* Additional Details */}
              <div style={{ 
                background: "#fff", 
                padding: "20px", 
                borderRadius: "8px", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                marginTop: "20px" 
              }}>
                <h2 style={{ margin: "0 0 20px 0" }}>Additional Details</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
                  <TextField
                    fullWidth
                    label="Ship Date"
                    value="04/11/2025"
                    InputProps={{
                      readOnly: true,
                      endAdornment: <InputAdornment position="end"><PersonIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Location Type</InputLabel>
                    <Select value="Residential" label="Location Type">
                      <MenuItem value="Residential">Residential</MenuItem>
                      <MenuItem value="Commercial">Commercial</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Duties & Taxes Paid By</InputLabel>
                    <Select value="Recipient" label="Duties & Taxes Paid By">
                      <MenuItem value="Recipient">Recipient</MenuItem>
                      <MenuItem value="Sender">Sender</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Username"
                    value="Testinganshu1@"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />
                </div>
              </div>
            </>
          )}
    
          {activeTab === "package" && (
            <div style={{ 
              background: "#fff", 
              padding: "20px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h2 style={{ margin: "0 0 20px 0" }}>Package</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#424242", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Number</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Weight</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Dim(L)</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Dim(W)</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Dim(H)</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Charge Weight</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Insurance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="10"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="10"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="10"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="10"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="0.00"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <TextField
                    label="Total"
                    value="0"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Total"
                    value="0.00"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            </div>
          )}
    
          {activeTab === "commercial" && (
            <div style={{ 
              background: "#fff", 
              padding: "20px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h2 style={{ margin: "0 0 20px 0" }}>Commercial Invoice</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#424242", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Package Number</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Package Content</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Quantity</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Value Per Qty</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="Test"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1.00"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1.00"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <TextField
                    label="Total Cost:"
                    value="1.00"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            </div>
          )}
    
          {activeTab === "tracking" && (
            <div style={{ 
              background: "#fff", 
              padding: "20px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h2 style={{ margin: "0 0 20px 0" }}>Tracking</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#424242", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Date</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Time</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Updates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="C"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="1"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value=""
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
    
          {activeTab === "accounts" && (
            <div style={{ 
              background: "#fff", 
              padding: "20px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h2 style={{ margin: "0 0 20px 0" }}>Invoice</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#424242", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Date</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Service</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Description</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Qty</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Cost</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="04/15/2025"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Service</InputLabel>
                        <Select value="" label="Service">
                          <MenuItem value="">Select</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value=""
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="0"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="0.00"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="0.00"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <TextField
                    label="Total Cost:"
                    value="0.00"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
    
              <h2 style={{ margin: "20px 0 20px 0" }}>Payment Made</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#424242", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Date</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Payment Type</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Number</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Confirmation</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="04/15/2025"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Payment Type</InputLabel>
                        <Select value="" label="Payment Type">
                          <MenuItem value="">Select</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="XXXX XXXX XXXX"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value=""
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="0.00"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <TextField
                    label="Total Cost:"
                    value="0.00"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            </div>
          )}
    
          {activeTab === "documentation" && (
            <div style={{ 
              background: "#fff", 
              padding: "20px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h2 style={{ margin: "0 0 20px 0" }}>Documentation</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#424242", color: "#fff" }}>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Document Type</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Document Name</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>CreatedOn</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Attachment</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Status</th>
                    <th style={{ padding: "10px", border: "1px solid #424242" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Document Type</InputLabel>
                        <Select value="Commercial Invoice" label="Document Type">
                          <MenuItem value="Commercial Invoice">Commercial Invoice</MenuItem>
                          <MenuItem value="Invoice">Invoice</MenuItem>
                          <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value=""
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="04/15/2025"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#f44336", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>VIEW FILE</button>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#ff9800", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>APPROVED</button>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#2196f3", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>...</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Document Type</InputLabel>
                        <Select value="Invoice" label="Document Type">
                          <MenuItem value="Commercial Invoice">Commercial Invoice</MenuItem>
                          <MenuItem value="Invoice">Invoice</MenuItem>
                          <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value=""
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="04/15/2025"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#f44336", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>VIEW FILE</button>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#ff9800", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>APPROVED</button>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#2196f3", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>...</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Document Type</InputLabel>
                        <Select value="Contract" label="Document Type">
                          <MenuItem value="Commercial Invoice">Commercial Invoice</MenuItem>
                          <MenuItem value="Invoice">Invoice</MenuItem>
                          <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value=""
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        value="04/15/2025"
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#f44336", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>VIEW FILE</button>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#ff9800", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>APPROVED</button>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button style={{ background: "#2196f3", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>...</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", alignItems: "center" }}>
                <button style={{ background: "#e0e0e0", color: "#757575", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>Previous</button>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>Page 1 of 1</span>
                  <TextField
                    variant="outlined"
                    value="10 rows"
                    InputProps={{ readOnly: true }}
                    style={{ width: "100px" }}
                  />
                </div>
                <button style={{ background: "#e0e0e0", color: "#757575", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>Next</button>
              </div>
            </div>
          )}
    
          {/* Buttons */}
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <button 
              style={{ 
                background: "#ab47bc", 
                color: "#fff", 
                padding: "10px 20px", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
            >
              DUPLICATE
            </button>
            <button 
              style={{ 
                background: "#f44336", 
                color: "#fff", 
                padding: "10px 20px", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
              onClick={handleBack}
            >
              BACK TO MY SHIPMENT
            </button>
          </div>
        </div>
  );
};

export default Myshipmentnew;