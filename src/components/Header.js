/**
 * @desc: The header componend is used to render the header section of the application.
 * It uses the AppBar, Toolbar, Box, IconButton, InputBase, and Avatar components from Material UI to create a header with a search bar, menu, and avatar.
 * The component is rendered when the user is logged in.
 * @return {JSX} Return the header component
 */
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Notifications,
  Search as SearchIcon,
  ArrowBack,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { LogoSecondary } from "../theme/Logos";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

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

const Header = () => {
  // Create a state variable for the user
  const [user, setUser] = useState(null);
  // Create a navigate hook
  const navigate = useNavigate();

  // Creata a location hoook to use it for implementing a simple app menu
  const location = useLocation();
  // Create a state variable for the menu
  const [isMenuOpen, setMenuOpen] = useState(false);
  // the element that the menu is anchored to
  const [anchorEl, setAnchorEl] = useState(null);

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

  // Add a handleAvatarClick method to navigate to the profile page
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    handleMenuClose();
    if (menuItem === "profile") {
      navigate("/profile");
    } else if (menuItem === "logout") {
      // Call the signOut function from the auth object to sign out the user
      signOut(auth)
        // Use the navigate function to redirect the user to the login page
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleReturnClick = () => {
    navigate(-1);
  };

  // Render the header component
  return (
    <AppBar position="static" color="primary" sx={{ width: "100%" }}>
      <Toolbar>
        {!location.pathname === "/" && (
          <IconButton color="inherit" onClick={handleReturnClick}>
            <ArrowBack />
          </IconButton>
        )}
        <Box component="span" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={LogoSecondary} alt="PlanMate logo" height="50" />
          </Link>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        {user && (
          <div>
            <IconButton color="inherit" onClick={handleAvatarClick}>
              <Avatar src={user.picUrl} alt="User Avatar" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => handleMenuItemClick("profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("logout")}>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
