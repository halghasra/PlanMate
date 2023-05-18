import React from 'react';
import { Button } from '@mui/material';
import { auth, signOut } from '../firebase';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const history = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push("/login");
      }).catch((error) => {
        console.error(error);
      });
  }

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton;
