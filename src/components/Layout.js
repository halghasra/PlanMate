/**
 * @desc: This component is used to render the header, hamburger menu, footer, and children components.
 * It uses the Box component from Material UI to create a layout with a header, main content area, and footer.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the layout component
 */
import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

// Add a Layout component to wrap the Header, HamburgerMenu, Footer, and children components
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
            gridColumn: '1 / 2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
          }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
