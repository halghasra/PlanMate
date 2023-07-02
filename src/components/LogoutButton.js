import React from 'react';
import { Button } from '@mui/material';
import { auth, signOut } from '../firebase';
import { useNavigate } from "react-router-dom";

// Retrieve the navigate function from the react-router-dom package
const LogoutButton = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Call the signOut function from the auth object to sign out the user
    signOut(auth)
      .then(() => {
        // Use the navigate function to redirect the user to the login page
        history.push("/login");
      }).catch((error) => {
        console.error(error);
      });
  }

  /* Adding a button to the UserProfile component to log out the user
  OnClick: Set the onClick event handler to the handeLogout function
  Color: Set the color to error for a red colour
  variant: Set the variant to contained to display a filled appearance
  sx: Apply custom styles to the button
  */
  return (
    <Button 
      onClick={handleLogout}
      color="error"
      variant='contained'
      sx={{ mt: 2, color:'white', '&:hover': {bgcolor: 'error.light'} }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton;
