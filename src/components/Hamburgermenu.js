import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu, Home, Logout, AccountBox } from '@mui/icons-material';
import { auth, signOut } from '../firebase';
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const history = useNavigate();

    const toggleDrawer = (open) => (event) => {
        setIsOpen(open);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                history.push("/login");
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <IconButton color="inherit" onClick={toggleDrawer(true)}><Menu /></IconButton>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button key="Home" onClick={() => history.push("/")}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key="Profile" onClick={() => history.push("/profile")}>
                        <ListItemIcon><AccountBox /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button key="Logout" onClick={handleLogout}>
                        <ListItemIcon><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default HamburgerMenu;