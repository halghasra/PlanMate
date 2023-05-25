import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu, Home, Logout, AccountBox } from '@mui/icons-material';
import { auth, signOut } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const HamburgerMenu = ({ isOpen, onOpen, onClose }) => {
    const history = useNavigate();
    const theme = useTheme();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                history("/login");
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <Drawer
      variant="persistent"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          boxSizing: 'border-box',
        },
      }}
    >
      <IconButton onClick={onClose}>
        <Menu />
      </IconButton>
      <List>
        <ListItem button key="Home" onClick={() => history("/")}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Profile" onClick={() => history("/profile")}>
            <ListItemIcon><AccountBox /></ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button key="Logout" onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default HamburgerMenu;