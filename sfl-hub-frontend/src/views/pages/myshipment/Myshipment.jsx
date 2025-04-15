import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Box,
  Menu,
  Checkbox,
  ListItemText,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import EditIcon from "@mui/icons-material/Edit";
import { IconBox } from "../../styles/scheduleshipmentStyle";
import { useStyles } from "../../styles/MyshipmentStyle";
import Myshipmentnew from "./MyShipmentNew";

const ShipmentDashboard = ({setEdit}) => {
  const classes = useStyles();
  const sampleData = [
    {
      id: 1,
      date: "2025-04-11",
      tracking: "TRK12345",
      sender: "John Doe",
      senderCity: "New York",
      senderState: "NY",
      receiver: "Jane Smith",
      receiverCity: "Los Angeles",
      receiverState: "CA",
      type: "Standard",
      status: "In Transit",
    },
    {
      id: 2,
      date: "2025-04-10",
      tracking: "TRK67890",
      sender: "Alice Brown",
      senderCity: "Chicago",
      senderState: "IL",
      receiver: "Bob Wilson",
      receiverCity: "Miami",
      receiverState: "FL",
      type: "Express",
      status: "Delivered",
    },
    {
      id: 3,
      date: "2025-04-09",
      tracking: "TRK11223",
      sender: "Emma Davis",
      senderCity: "Seattle",
      senderState: "WA",
      receiver: "Liam Johnson",
      receiverCity: "Boston",
      receiverState: "MA",
      type: "Standard",
      status: "Customs Clearance",
    },
    {
      id: 4,
      date: "2025-04-08",
      tracking: "TRK44556",
      sender: "Olivia Lee",
      senderCity: "Austin",
      senderState: "TX",
      receiver: "Noah Clark",
      receiverCity: "Denver",
      receiverState: "CO",
      type: "Fragile",
      status: "Cancelled",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [filteredData, setFilteredData] = useState(sampleData); // New state for filtered data
  const navigate = useNavigate();
  const statuses = [
    "Cancelled",
    "Customs Clearance",
    "Delivered",
    "Delivery In Route",
    "Destuffing",
    "In Consolidation",
    "In Transit",
    "In-Distribution",
    "Incomplete",
    "Lost/Damaged",
    "New Request",
    "On Hold",
    "Pickup scheduled",
    "To Be Deleted",
  ];
  const open = Boolean(anchorEl);
  const handleEdit = (row) => {
    // Navigate to MyShipmentnew page with row data
    setEdit(true);
    navigate("/admin/MyShipmentNew", { state: { shipment: row }, replace: true  });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (status) => {
    if (status === "All") {
      if (selectedStatuses.length === statuses.length) {
        setSelectedStatuses([]);
      } else {
        setSelectedStatuses(statuses);
      }
    } else {
      setSelectedStatuses((prev) =>
        prev.includes(status)
          ? prev.filter((s) => s !== status)
          : [...prev, status]
      );
    }
  };

  const handleSearch = () => {
    if (selectedStatuses.length === 0 || selectedStatuses.length === statuses.length) {
      // If no statuses selected or all selected, show all data
      setFilteredData(sampleData);
    } else {
      // Filter data based on selected statuses
      const filtered = sampleData.filter((row) =>
        selectedStatuses.includes(row.status)
      );
      setFilteredData(filtered);
    }
    console.log("Selected Statuses:", selectedStatuses);
    handleClose();
  };

  const isAllSelected =
    selectedStatuses.length === statuses.length && statuses.length > 0;

  
  

  return (
    <div>
      <div className="page-wrap">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h2>
                <IconBox className="card-icon">
                  <DirectionsBoatIcon className={classes.iconBox} />
                </IconBox>
                <span>My Shipment</span>
              </h2>
            </div>
            <div className="card-filter">
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
                className={classes.mainButton}
              >
                Search Shipment Status
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  className: classes.menuPaper,
                }}
              >
                <MenuItem
                  onClick={() => handleSelect("All")}
                  className={classes.menuItem}
                >
                  <Checkbox checked={isAllSelected} />
                  <ListItemText primary="All" />
                </MenuItem>
                {statuses.map((status) => (
                  <MenuItem
                    key={status}
                    onClick={() => handleSelect(status)}
                    className={classes.menuItem}
                  >
                    <Checkbox checked={selectedStatuses.includes(status)} />
                    <ListItemText primary={status} />
                  </MenuItem>
                ))}
                <Box className={classes.searchButtonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}
                    className={classes.searchButton}
                  >
                    Search
                  </Button>
                </Box>
              </Menu>
            </div>
          </div>
          <div className="card-body">
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    {[
                      "Date",
                      "Tracking",
                      "Sender",
                      "City",
                      "State",
                      "Receiver",
                      "City",
                      "State",
                      "Type",
                      "Status",
                      "Actions",
                    ].map((heading,index) => (
                      <TableCell key={index} className={classes.tableCell}>
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.tracking}</TableCell>
                        <TableCell>{row.sender}</TableCell>
                        <TableCell>{row.senderCity}</TableCell>
                        <TableCell>{row.senderState}</TableCell>
                        <TableCell>{row.receiver}</TableCell>
                        <TableCell>{row.receiverCity}</TableCell>
                        <TableCell>{row.receiverState}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <EditIcon
                            className={classes.editIcon}
                            onClick={() => handleEdit(row)}
                            style={{ cursor: "pointer" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        No rows found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="table-footer">
              <Button disabled variant="outlined">
                Previous
              </Button>
              <Typography>Total rows: {filteredData.length} of {sampleData.length}</Typography>
              <Select defaultValue={10}>
                <MenuItem value={5}>5 rows</MenuItem>
                <MenuItem value={10}>10 rows</MenuItem>
                <MenuItem value={20}>20 rows</MenuItem>
                <MenuItem value={25}>25 rows</MenuItem>
                <MenuItem value={50}>50 rows</MenuItem>
                <MenuItem value={100}>100 rows</MenuItem>
              </Select>
              <Button disabled variant="outlined">
                Next
              </Button>
            </Box>
          </div>
        </div>
        <Box
          sx={{
            position: "fixed",
            bottom: 10,
            right: 10,
            zIndex: 1000,
            textAlign: "right",
          }}
        >
          <Typography align="center" className={classes.footerTypography}>
            All Rights Reserved. Site Powered by{" "}
            <a href="https://sflworldwide.com/" target="_blank">
              <span className={classes.sflLink}>SFL Worldwide</span>
            </a>
          </Typography>
        </Box>
      </div>
      
    </div>
  );
};

export default ShipmentDashboard; 