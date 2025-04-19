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

  if (!shipment) {
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
            <Select value={shipment.status || "Cancelled"} label="Shipment Status">
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Customs Clearance">Customs Clearance</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Tracking Number"
            value={shipment.tracking || "101049399"}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Package Type</InputLabel>
            <Select value="Package" label="Package Type">
              <MenuItem value="Package">Package</MenuItem>
              <MenuItem value="Document">Document</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="No. of Packages"
            value="1"
            InputProps={{ readOnly: true }}
            variant="outlined"
          />
        </GridContainer>
        <GridContainer>
          <TextField
            fullWidth
            label="Managed By"
            value="Nirav Shah"
            InputProps={{ readOnly: true }}
            variant="outlined"
          />

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
                value="Test"
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
                value="Test"
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
                value=""
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
                value=""
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
                value="Irving"
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
                <Select value="Texas" label="State">
                  <MenuItem value="Texas">Texas</MenuItem>
                </Select>
              </FormControl>
            </GridContainer>
            <GridContainer>
              <TextField
                fullWidth
                label="Company Name"
                value="Test"
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
                value="1234567890"
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
                value=""
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
                value="test@gmail.com"
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
                value="Test"
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
                value="Test"
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
                value=""
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
                value=""
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
                value="Ahmedabad"
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
                <Select value="Gujarat" label="State">
                  <MenuItem value="Gujarat">Gujarat</MenuItem>
                </Select>
              </FormControl>
            </GridContainer>
            <GridContainer>
              <TextField
                fullWidth
                label="Company Name"
                value=""
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
                value="1234567890"
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
                value=""
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
                value=""
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
                value="04/11/2025"
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
              rows={[{
                number: "1",
                weight: "10",
                dimL: "1",
                dimW: "10",
                dimH: "10",
                chargeWeight: "10",
                insurance: "0.00"
              }]}
            />
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 2.5 }}>
            <TextField
              label="Total"
              value="0"
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ width: isMobile ? '100%' : 'auto' }}
            />
            <TextField
              label="Total"
              value="0.00"
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
              rows={[{
                packageNumber: "1",
                packageContent: "Test",
                quantity: "1",
                valuePerQty: "1.00",
                totalValue: "1.00"
              }]}
            />
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
            <TextField
              label="Total Cost:"
              value="1.00"
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
              rows={[{
                date: "C",
                time: "1",
                updates: ""
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
                <TableRow>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="04/15/2025"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Service</InputLabel>
                      <Select value="" label="Service">
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value=""
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="0"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="0.00"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="0.00"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableStyled>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
            <TextField
              label="Total Cost:"
              value="0.00"
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
                <TableRow>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="04/15/2025"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Payment Type</InputLabel>
                      <Select value="" label="Payment Type">
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="XXXX XXXX XXXX"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value=""
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value="0.00"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableStyled>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
            <TextField
              label="Total Cost:"
              value="0.00"
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