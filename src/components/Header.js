/**
 * @desc: The header componend is used to render the header section of the application.
 * It uses the AppBar, Toolbar, Box, IconButton, InputBase, and Avatar components from Material UI to create a header with a search bar, menu, and avatar.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the header component
 */
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, IconButton, InputBase, Avatar } from "@mui/material";
import { Menu, Notifications, Search as SearchIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { LogoSecondary } from "../theme/Logos";
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";


// Create a styled component for the search bar
const Search = styled("div")(({ theme }) => ({ 
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

// Create a styled component for the search icon wrapper
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Create a styled component for the search input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = ({ onOpen }) => {
  // Create a state variable for the user
    const [user, setUser] = useState(null);
    
    // Get the user from the database
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        // If the user is logged in, get the user from the database
        if (authUser) {
          const docRef = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
          }
        }
      });
      // Return the unsubscribe method to prevent memory leaks
      return unsubscribe;
    }, []);
  
    // Render the header component
    return (
      <AppBar position="static" color="primary" sx={{ width: '100%' }}>
        <Toolbar>
          <IconButton color ="inherit" onClick={onOpen} edge="start">
            <Menu />
          </IconButton>
          <Box component="span" sx={{ flexGrow: 1 }}>
            <img src={LogoSecondary} alt="PlanMate logo" height="50" />
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          {user && (
            <IconButton color="inherit">
              <Avatar src={user.picUrl} alt="User Avatar" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;
