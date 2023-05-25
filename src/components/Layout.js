import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import HamburgerMenu from './Hamburgermenu';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsOpen(true);
    }

    const handleDrawerClose = () => {
        setIsOpen(false);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <HamburgerMenu isOpen={isOpen} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
            <Header onOpen={handleDrawerOpen} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: 'calc(100vh - 128px)', marginLeft: isOpen ? 240: 72, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;