/**
 * @desc: This component is used to render the header, hamburger menu, footer, and children components.
 * It uses the Box component from Material UI to create a layout with a header, main content area, and footer.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the layout component
 */
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import HamburgerMenu from "./Hamburgermenu";
import Footer from "./Footer";

// Add a Layout component to wrap the Header, HamburgerMenu, Footer, and children components
const Layout = ({ children }) => {
  // Add a state to handle the drawer open and close
  const [isOpen, setIsOpen] = useState(false);

  // Add functions to handle the drawer open
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  // Add functions to handle the drawer close
  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  /*
    // onOpen: Render the Header component and pass the onOpen function as a prop
    // if isOpen is true, render the HamburgerMenu component and pass the isOpen, onOpen and onClose function as a prop
    // Children: Render the children components inside the main content area
    // Finally, render the Footer component
    */
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
      }}
    >
      <Header onOpen={handleDrawerOpen} />
      <HamburgerMenu
        isOpen={isOpen}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={{
            gridColumn: '1 / 2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            pt: (theme) => theme.spacing(8), // Add the header height as padding-top
            pb: (theme) => theme.spacing(8), // Add the footer height as padding-bottom
            minHeight: `calc(100vh - ${theme => theme.spacing(8) * 2}px)`, // Subtract the combined height of the header and footer from 100vh
            minWidth: "100vw", // Expand to the full width of the viewport
            overflow: "auto", // Enable scrolling when needed
          }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
