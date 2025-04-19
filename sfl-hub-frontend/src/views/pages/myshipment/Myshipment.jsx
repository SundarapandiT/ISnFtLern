import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, encryptURL } from "../../../utils/api";
import { toast } from "react-hot-toast";
// import CryptoJS from "crypto-js";
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
import CircularProgress from '@mui/material/CircularProgress';

import EditIcon from "@mui/icons-material/Edit";
import { IconBox } from "../../styles/scheduleshipmentStyle";
import { useStyles } from "../../styles/MyshipmentStyle";

const ShipmentDashboard = ({ setEdit }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);


  const [shipmentsData, setShipmentsData] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const Person_ID = user ? user.personID : "cant find PersonID";
  console.log("Person_ID:", Person_ID); // Check if Person_ID is being set correctly

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        // const loading = toast.loading("Loading shipments...");
        setLoading(true);
        // const encodedUrl= encryptURL("/shipment/myShipments"); 
        const response = await axios.post(`${api.BackendURL}/shipment/myShipments`,
          { data: { Person_ID } }
        );
        const data = response.data?.user?.[0]; // Get the array of shipments
        if (data) {
          // toast.dismiss(loading);
          // toast.success("Shipments loaded successfully!");
          setLoading(false);
          setShipmentsData(data);
          console.log("Shipments data:", data);
        }
      } catch (error) {
        console.error('Error fetching shipments:', error);
        // toast.dismiss(loading);
        toast.error("Failed to load shipments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);
  useEffect(() => {
    setFilteredData(shipmentsData);
  }, [shipmentsData]);


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [filteredData, setFilteredData] = useState(shipmentsData); // New state for filtered data
  const navigate = useNavigate();
  const statuses = [
    "New Request",
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
    "On Hold",
    "Pickup scheduled",
    "To Be Deleted",
  ];
  const open = Boolean(anchorEl);
  const handleEdit = (row) => {
    // Navigate to MyShipmentnew page with row data
    setEdit(true);
    navigate("/admin/MyShipmentNew", { state: { shipment: row }, replace: true });
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
      setFilteredData(shipmentsData);
    } else {
      // Filter data based on selected statuses
      const filtered = shipmentsData.filter((row) =>
        selectedStatuses.includes(row.shipmentstatus)
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
                    ].map((heading, index) => (
                      <TableCell key={index} className={classes.tableCell}>
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{new Date(row.shipmentdate).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell>{row.trackingnumber}</TableCell>
                        <TableCell>{row.fromcontactname}</TableCell>
                        <TableCell>{row.fromcity}</TableCell>
                        <TableCell>{row.fromstate}</TableCell>
                        <TableCell>{row.tocontactname}</TableCell>
                        <TableCell>{row.tocity}</TableCell>
                        <TableCell>{row.tostate}</TableCell>
                        <TableCell>{row.shipmenttype}</TableCell>
                        <TableCell>{row.shipmentstatus}</TableCell>
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
              <Typography>Total rows: {filteredData.length} of {shipmentsData.length}</Typography>
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
        {/* <Box className="footer-box">
          <Typography align="center" className={classes.footerTypography}>
          All Rights Reserved. Site Powered by{" "}
          <span
            className={`${classes.sflLink} sfl-link`}
            onClick={() => window.open("https://sflworldwide.com/", "_blank")}
          >

          SFL Worldwide
          </span>
          </Typography>
        </Box> */}
      </div>

    </div>
  );
};

export default ShipmentDashboard;