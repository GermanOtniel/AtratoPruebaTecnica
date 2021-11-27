import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './Navbar';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import '../pages/dashboard/dash.css';

const openedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NavigationDrawer = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuOptions] = useState([
    {
      label: 'Inicio',
      icon: (<HomeIcon/>)
    },
    {
      label: 'Reportes',
      icon: (<AssignmentIcon/>)
    },
    {
      label: 'Usuarios',
      icon: (<GroupIcon/>)
    },
    {
      label: 'Ajustes',
      icon: (<SettingsIcon/>)
    }
  ]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box  sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer 
        className={
          'drawer-wrapper ' + (open ? 'open' : 'close')} 
          variant="permanent" 
          open={open}
        >
        <DrawerHeader>
          <img 
            src={process.env.PUBLIC_URL + '/imgs/ColorLogo.png'} 
            alt='Logo atrato'
            className='navbar-logo'
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? 
              <KeyboardArrowRightIcon/> :
              <KeyboardArrowLeftIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuOptions.map((option, index) => (
            <ListItem 
              button 
              key={index} 
              className={index === 2 ? 'drawer-item-selected' : ''}
            >
              <ListItemIcon>
                { option.icon }
              </ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { children }
      </Box>
    </Box>
  );
}

export default NavigationDrawer;