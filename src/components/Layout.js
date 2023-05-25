import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import HamburgerMenu from './Hamburgermenu';
import Footer from './Footer';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsOpen(true);
    }

    const handleDrawerClose = () => {
        setIsOpen(false);
    }

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '240px auto', gridTemplateRows: 'auto 1fr auto' }}>
            <Header onOpen={handleDrawerOpen} />
            <HamburgerMenu isOpen={isOpen} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
            <Box component="main" sx={{ gridColumn: '2 / 3', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3}}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;