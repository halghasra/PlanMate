import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu, Home, Logout, AccountBox } from '@mui/icons-material';
import { auth, signOut } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const history = useNavigate();
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setIsOpen(true);
    }

    const handleDrawerClose = () => {
        setIsOpen(false);
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                history.push("/login");
            }).catch((error) => {
                console.error(error);
            });
    }

    const drawerWidth = isOpen ? 240 : theme.spacing(7) + 1;

    return (
        <div>
      <IconButton color="inherit" onClick={handleDrawerOpen} sx={{
        display: isOpen ? 'none' : 'block'
      }}>
        <Menu />
      </IconButton>
      <Drawer
        variant="persistent"
        open={isOpen}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            boxSizing: 'border-box',
          },
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          <Menu />
        </IconButton>
        <List>
          <ListItem button key="Home" onClick={() => history.push("/")}>
            <ListItemIcon><Home /></ListItemIcon>
            {isOpen && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button key="Profile" onClick={() => history.push("/profile")}>
            <ListItemIcon><AccountBox /></ListItemIcon>
            {isOpen && <ListItemText primary="Profile" />}
          </ListItem>
          <ListItem button key="Logout" onClick={handleLogout}>
            <ListItemIcon><Logout /></ListItemIcon>
            {isOpen && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;