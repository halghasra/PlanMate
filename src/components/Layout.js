/**
 * @desc: This component is used to render the header, hamburger menu, footer, and children components.
 * It uses the Box component from Material UI to create a layout with a header, main content area, and footer.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the layout component
 */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import HamburgerMenu from './Hamburgermenu';
import Footer from './Footer';

// Add a Layout component to wrap the Header, HamburgerMenu, Footer, and children components
const Layout = ({ children }) => {
    // Add a state to handle the drawer open and close
    const [isOpen, setIsOpen] = useState(false);

    // Add functions to handle the drawer open
    const handleDrawerOpen = () => {
        setIsOpen(true);
    }

    // Add functions to handle the drawer close
    const handleDrawerClose = () => {
        setIsOpen(false);
    }

    /*
    // onOpen: Render the Header component and pass the onOpen function as a prop
    // if isOpen is true, render the HamburgerMenu component and pass the isOpen, onOpen and onClose function as a prop
    // Children: Render the children components inside the main content area
    // Finally, render the Footer component
    */
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