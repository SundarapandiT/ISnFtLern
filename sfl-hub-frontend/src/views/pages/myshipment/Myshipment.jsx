import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, encryptURL } from "../../../utils/api";
import { toast } from "react-hot-toast";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconBox } from "../../styles/scheduleshipmentStyle";
import { useStyles } from "../../styles/MyshipmentStyle";

const ShipmentDashboard = ({ setEdit }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [shipmentsData, setShipmentsData] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const Person_ID = user ? user.personID : "cant find PersonID";
  console.log("Person_ID:", Person_ID);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const encodedUrl = encryptURL("/shipment/myShipments");
        const response = await axios.post(`${api.BackendURL}/shipment/${encodedUrl}`, {
          data: { Person_ID }
        });
        const data = response.data?.user?.[0];
        if (data) {
          setLoading(false);
          const sortedData = [...data].sort((a, b) => 
            new Date(b.shipmentdate) - new Date(a.shipmentdate)
          );
          setShipmentsData(sortedData);
          console.log("Shipments data:", data);
        }
      } catch (error) {
        console.error('Error fetching shipments:', error);
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
  const [filteredData, setFilteredData] = useState(shipmentsData);
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

  const handleEdit = async (row) => {
    try {
      const encodedUrl = encryptURL("/shipment/getmyShipments");
      const response = await axios.post(`${api.BackendURL}/shipment/${encodedUrl}`, {
        data: { Shipping_ID: row.shippingid },
      });

      if (response.status === 200 && response.data?.user) {
        const shipmentData = response.data.user;
        console.log("Fetched Shipment Data:", shipmentData);
        setEdit(true);
        navigate("/admin/MyShipmentNew", {
          state: { shipment: shipmentData },
          replace: true,
        });
      } else {
        console.log("Failed to fetch shipment details");
      }
    } catch (error) {
      console.error("Error fetching shipment details:", error);
      console.log(error?.response?.data?.message || "Failed to fetch shipment details");
    }
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
      setFilteredData(shipmentsData);
    } else {
      const filtered = shipmentsData.filter((row) =>
        selectedStatuses.includes(row.shipmentstatus)
      );
      setFilteredData(filtered);
    }
    console.log("Selected Statuses:", selectedStatuses);
    setPage(0);
    handleClose();
  };

  const isAllSelected = selectedStatuses.length === statuses.length && statuses.length > 0;

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage) - 1));
  };

  const displayedRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <div className="page-wrap">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h2 style={{ fontSize: "1rem" }}>
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
                sx={{ fontSize: "0.75rem" }}
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
                  sx={{ fontSize: "0.75rem" }}
                >
                  <Checkbox checked={isAllSelected} />
                  <ListItemText primary="All" sx={{ "& .MuiListItemText-primary": { fontSize: "0.75rem" } }} />
                </MenuItem>
                {statuses.map((status) => (
                  <MenuItem
                    key={status}
                    onClick={() => handleSelect(status)}
                    className={classes.menuItem}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    <Checkbox checked={selectedStatuses.includes(status)} />
                    <ListItemText primary={status} sx={{ "& .MuiListItemText-primary": { fontSize: "0.75rem" } }} />
                  </MenuItem>
                ))}
                <Box className={classes.searchButtonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}
                    className={classes.searchButton}
                    sx={{ fontSize: "0.75rem" }}
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
                      <TableCell key={index} className={classes.tableCell} sx={{ fontSize: "0.75rem" }}>
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
                  ) : displayedRows.length > 0 ? (
                    displayedRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{new Date(row.shipmentdate).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.trackingnumber}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.fromcontactname}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.fromcity}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.fromstate}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.tocontactname}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.tocity}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.tostate}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.shipmenttype}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.shipmentstatus}</TableCell>
                        <TableCell>
                          <VisibilityIcon
                            className={classes.editIcon}
                            onClick={() => handleEdit(row)}
                            style={{ cursor: "pointer" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} align="center" sx={{ fontSize: "0.75rem" }}>
                        No rows found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="table-footer">
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={page === 0}
                sx={{ fontSize: "0.75rem" }}
              >
                Previous
              </Button>
              <Typography sx={{ fontSize: "0.75rem" }}>
                Total rows: {filteredData.length} of {shipmentsData.length}
              </Typography>
              <Select 
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                sx={{ fontSize: "0.75rem", height: "2rem" }}
              >
                <MenuItem value={5} sx={{ fontSize: "0.75rem" }}>5 rows</MenuItem>
                <MenuItem value={10} sx={{ fontSize: "0.75rem" }}>10 rows</MenuItem>
                <MenuItem value={20} sx={{ fontSize: "0.75rem" }}>20 rows</MenuItem>
                <MenuItem value={25} sx={{ fontSize: "0.75rem" }}>25 rows</MenuItem>
                <MenuItem value={50} sx={{ fontSize: "0.75rem" }}>50 rows</MenuItem>
                <MenuItem value={100} sx={{ fontSize: "0.75rem" }}>100 rows</MenuItem>
              </Select>
              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
                sx={{ fontSize: "0.75rem" }}
              >
                Next
              </Button>
            </Box>
          </div>
        </div>
        {/* <Box className="footer-box">
          <Typography align="center" className={classes.footerTypography} sx={{ fontSize: "0.75rem" }}>
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