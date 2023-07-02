/**
 * @desc: This component represents a hamburger menu that can be used for navigation.
 * It uses the Drawer, List, ListItem, ListItemIcon, ListItemText, and IconButton components from Material UI to create a hamburger menu.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the hamburger menu component
 * The menu items are rendered using the List, ListItem, ListItemIcon, and ListItemText components from Material UI.
 * Each menu item has an associated icon and text label. The 'IconButton' with the 'Menu' icon is used to open the menu.
 * The Drawer component is responsible for displaying the menu.
 */

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Menu, Home, Logout, AccountBox } from "@mui/icons-material";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const HamburgerMenu = ({ isOpen, onOpen, onClose }) => {
  // Retrieve the navigate function from the react-router-dom package
  const history = useNavigate();
  // Retrieve the theme object from the Material UI theme
  const theme = useTheme();

  // Add a function to handle the logout
  const handleLogout = () => {
    // Call the signOut function from the auth object to sign out the user
    signOut(auth)
    // Use the navigate function to redirect the user to the login page
      .then(() => {
        history("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Add a button to open the menu
  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        gridRow: '1 / 4', // this will make the HamburgerMenu take up all the rows
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
        <ListItem button key="Home" onClick={() => {history("/"); onClose();}}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Profile" onClick={() => {history("/profile"); onClose();}}>
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
