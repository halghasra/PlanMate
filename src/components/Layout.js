/**
 * @desc: This component is used to render the header, hamburger menu, footer, and children components.
 * It uses the Box component from Material UI to create a layout with a header, main content area, and footer.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the layout component
 */
import React from "react";
import { Box } from "@mui/system";
import Header from "./Header";
import Footer from "./Footer";

// Add a Layout component to wrap the Header, Footer, and children components
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: (theme) => theme.spacing(1),
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // Align content to the top
          p: 3,
          paddingTop: (theme) => theme.spacing(1),
        }}
      >
        <Box
          sx={{
            maxWidth: "1000px",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
