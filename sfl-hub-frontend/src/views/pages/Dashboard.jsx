import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// MUI Components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ListIcon from '@mui/icons-material/List';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Child Components
import Schedule from './scheduleshipment/Scheduleshipment'; // Your provided Schedule component
import ShipmentDashboard from './myshipment/Myshipment';
import Myshipmentnew from './myshipment/MyShipmentNew';
import ScheduleConfirmation from './scheduleconfirmation/ScheduleConfirmation';
import GetRate from './getrate/GetRate';

// Styles
import { styled } from '@mui/material/styles';

const Root = styled(Box)({  
  display: 'flex',
  minHeight: '100vh',
});

const MainContent = styled(Box)(({ theme, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

const AppBarBox = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

const UsernameButton = styled(IconButton)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Sidebar = ({ drawerOpen, toggleDrawer, handleMenuOpen, anchorEl, open, handleMenuClose, activeModule, handleModuleClick, drawerWidth, Loginname, account_number }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const modules = [
    { name: 'Get Rates', icon: <MonetizationOnIcon />, path: '/admin/GetRate' },
    { name: 'Schedule Shipment', icon: <FlightTakeoffIcon />, path: '/admin/Scheduleshipment' },
    { name: 'My Shipment', icon: <LocalShippingIcon />, path: '/admin/ShipmentList' },
    
    // { name: 'File a Claim', icon: <ReportProblemIcon />, path: '/admin/FileClaim' },
  ];

  const drawerContent = (
    <Box sx={{ width: drawerWidth, pt: 4 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        {Loginname}
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 4 }}>
        Account: {account_number || 'N/A'}
      </Typography>
      <List>
        {modules.map((module) => (
          <ListItem
            button
            key={module.name}
            selected={activeModule === module.name}
            onClick={() => handleModuleClick(module.name, module.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon>{module.icon}</ListItemIcon>
            <ListItemText primary={module.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(250);
  const [activeModule, setActiveModule] = useState('Schedule Shipment');
  const [anchorEl, setAnchorEl] = useState(null);
  const [Loginname, setLoginname] = useState('Unknown');
  const [account_number, setAccountNumber] = useState('');
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setLoginname(storedUser.name);
      setAccountNumber(storedUser.account_number);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('PersonID');
    navigate('/auth/login-page');
    window.location.reload();
    handleMenuClose();
    toast.success('Logged out successfully');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleModuleClick = (module, path) => {
    setActiveModule(module);
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Root>
      <Sidebar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        open={open}
        handleMenuClose={handleMenuClose}
        activeModule={activeModule}
        handleModuleClick={handleModuleClick}
        drawerWidth={drawerWidth}
        Loginname={Loginname}
        account_number={account_number}
      />
      <MainContent drawerWidth={isMobile ? 0 : drawerWidth}>
        <AppBar position="static" color="default" elevation={1}>
          <AppBarBox>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {activeModule}
            </Typography>
            <UsernameButton onClick={handleMenuOpen}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              {Loginname}
            </UsernameButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </AppBarBox>
        </AppBar>
        <Box sx={{ mt: 3 }}>
          <Routes>
            <Route path="Scheduleshipment" element={<Schedule setActiveModule={setActiveModule} />} />
            <Route path="ShipmentList" element={<ShipmentDashboard />} />
            <Route path="MyShipmentNew" element={<Myshipmentnew />} />
            <Route path="ScheduleConfirmation" element={<ScheduleConfirmation />} />
            <Route path="GetRate" element={<GetRate setActiveModule={setActiveModule} />} />
            {/* <Route path="FileClaim" element={<Typography>File a Claim - Placeholder</Typography>} /> */}
          </Routes>
        </Box>
        <Box sx={{ mt: 2, textAlign: 'center', py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            All Rights Reserved. Site Powered by{' '}
            <a
              href="https://sflworldwide.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
            >
              SFL Worldwide
            </a>
          </Typography>
        </Box>
      </MainContent>
    </Root>
  );
};

export default Dashboard;