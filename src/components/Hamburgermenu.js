import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu, Home, Logout, AccountBox } from '@mui/icons-material';
import { auth, signOut } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

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

    // testing wrapping a box element around the main app content and sidebar, so the menu would appear under the header
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100vh',
        }}>
            <Drawer
                variant="permanent"
                open={isOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        boxSizing: 'border-box',
                        position: 'relative',
                    },
                }}
            >
                <IconButton onClick={isOpen ? handleDrawerClose : handleDrawerOpen}>
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
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                width: `calc(100% - ${isOpen ? drawerWidth : theme.spacing(7) + 1}px)`,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}>
                {/* Rest of your application goes here */}
            </Box>
        </Box>
    );
};

export default HamburgerMenu;