import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListIconText, IconButton } from '@mui/material';
import { MenuIcon, HomeIcon, AccountBoxIcon, LogoutIcon } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen ] = useState(false);

    const toggleDrawer = (open) => (event) => {
        setIsOpen(open);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button key="Home" onClick={() => <Navigate to="/" />}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key="Profile" onClick={() => <Navigate to="/profile" />}>
                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button key="Logout" onClick={() => { /* Add logout functionality here */ }}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default HamburgerMenu;