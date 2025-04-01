import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = ({
  drawerOpen,
  toggleDrawer,
  handleMenuOpen,
  anchorEl,
  open,
  handleMenuClose,
  activeModule,
  handleModuleClick,
  drawerWidth,
}) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box sx={{ width: 250, bgcolor: "#1a202c", height: "100%", p: 2}}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4,borderBottom:"1px solid grey" }}>
          <img
            src={drawerWidth==250?"/sfllogo2--.png":"/logo-icon.png"}
            alt="Logo"
            width={120}
            style={{ marginBottom: 10, justifySelf: "center", alignSelf: "center" }}
          />
          </Box>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Button
              startIcon={<AccountCircleIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleMenuOpen}
            >
              Daredevil
            </Button>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>

          <List>
            {["Schedule Shipment", "My Shipment", "Billing", "File a Claim"].map(
              (module) => (
                <ListItem
                  key={module}
                  component="button"
                  selected={activeModule === module}
                  onClick={() => handleModuleClick(module)}
                  sx={{
                    backgroundColor: activeModule === module ? "#04c5cc" : "transparent",
                    color: activeModule === module ? "white" : "inherit",
                    borderRadius: 1,
                    "&.Mui-selected": { backgroundColor: "#04c5cc", color: "white", borderRadius: 1 },
                    "&:hover": { backgroundColor: "#04c5cc", color: "white", borderRadius: 1 },
                    transition: "background-color 0.3s ease-in-out",
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {module === "Schedule Shipment" ? <LocalShippingIcon /> :
                      module === "My Shipment" ? <DirectionsBoatIcon /> :
                        module === "Billing" ? <ReceiptIcon /> :
                          <NoteAddIcon />}
                  </ListItemIcon>
                  <ListItemText primary={module} sx={{ color: "white" }} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>

      {/* Permanent Sidebar for larger screens */}
      <Box
        sx={{
          width: drawerWidth,
          bgcolor: "#1a202c",
          color: "white",
          p: 1,
          display: { xs: "none", sm: "block", overflowY:"hidden" },
          transition: "width 0.3s ease-in-out",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4,borderBottom:"1px solid grey" }}>
          <img
            src={drawerWidth==250?"/sfllogo2--.png":"/logo-icon.png"}
            alt="Logo"
            width={200}
            style={{ marginBottom: 10, justifySelf: "center", alignSelf: "center" }}
          />
        </Box>
        <List>
          {["Schedule Shipment", "My Shipment", "Billing", "File a Claim"].map(
            (module) => (
              <ListItem
                key={module}
                component="button"
                selected={activeModule === module}
                onClick={() => handleModuleClick(module)}
                sx={{
                  backgroundColor: activeModule === module ? "#04c5cc" : "transparent",
                  color: activeModule === module ? "white" : "inherit",
                  borderRadius: 1, cursor: "pointer",
                  "&.Mui-selected": { backgroundColor: "#04c5cc", color: "white", borderRadius: 1 },
                  "&:hover": { backgroundColor: "#04c5cc", color: "white", borderRadius: 1 },
                  transition: "background-color 0.3s ease-in-out",
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {module === "Schedule Shipment" ? <LocalShippingIcon /> :
                    module === "My Shipment" ? <DirectionsBoatIcon /> :
                      module === "Billing" ? <ReceiptIcon /> :
                        <NoteAddIcon />}
                </ListItemIcon>
                <ListItemText primary={module} sx={{ color: "white" }} />
              </ListItem>
            )
          )}
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
