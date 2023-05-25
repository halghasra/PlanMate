import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import HamburgerMenu from './Hamburgermenu';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsOpen(true);
    }

    const handleDrawerClose = () => {
        setIsOpen(false);
    }

    return (
        <Box sx={{ display: 'flex'}}>
            <HamburgerMenu isOpen={isOpen} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
            <Header onOpen={handleDrawerOpen} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: isOpen ? 240: 72}}>
                {/* Main Content */}
            </Box>
        </Box>
    );
};

export default Layout;