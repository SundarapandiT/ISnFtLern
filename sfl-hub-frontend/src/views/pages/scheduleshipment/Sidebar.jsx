import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListIcon from '@mui/icons-material/List';

import {
  SidebarWrapper,
  MobileDrawer,
  LogoBox,
  UsernameButton,
  ProfileBox,
  StyledListItem,
} from '../../styles/sidebarStyles'; 

import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

const Sidebar = ({
  drawerWidth,
  drawerOpen,
  toggleDrawer,
  anchorEl,
  open,
  handleMenuOpen,
  handleMenuClose,
  activeModule,
  handleModuleClick,
  setDrawerOpen,
  halfopen,
}) => {
  const modules = ['Schedule Shipment', 'My Shipment'];

  return (
    <>
      {/* Mobile Drawer */}
      <MobileDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <ProfileBox >
          <LogoBox>
            <img src="/sfllogo2--.png" alt="Logo" width={120} style={{ marginBottom: 10 }} />
          </LogoBox>

          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <UsernameButton startIcon={<AccountCircleIcon />} onClick={handleMenuOpen}>
              Daredevil
            </UsernameButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>

          <List>
            {modules.map((module) => (
              <StyledListItem
                key={module}
                component="button"
                selected={activeModule === module}
                onClick={() => handleModuleClick(module)}
                active={activeModule === module}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {module === 'Schedule Shipment' ? <LocalShippingIcon /> : <DirectionsBoatIcon />}
                </ListItemIcon>
                <ListItemText primary={module} sx={{ color: 'white' }} />
              </StyledListItem>
            ))}
          </List>
        </ProfileBox>
      </MobileDrawer>

      {/* Permanent Sidebar (Desktop) */}
      <SidebarWrapper
        sx={{
          width: drawerWidth,
        }}
        onMouseEnter={() => {
          if (drawerWidth ===60) setDrawerOpen(true);
        }}
      >
        <LogoBox>
          <img
            src={drawerWidth === 250 ? '/sfllogo2--.png' : '/logo-icon.png'}
            alt="Logo"
            width={drawerWidth === 250 ? 200 : 60}
            style={{ marginBottom: 10 }}
          />
        </LogoBox>

        <List>
          {modules.map((module) => (
            <StyledListItem
              key={module}
              component="button"
              selected={activeModule === module}
              onClick={() => handleModuleClick(module)}
              active={activeModule === module}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {module === 'Schedule Shipment' ? <LocalShippingIcon /> : <DirectionsBoatIcon />}
              </ListItemIcon>
              <ListItemText primary={module} sx={{ color: 'white' }} />
            </StyledListItem>
          ))}
        </List>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
