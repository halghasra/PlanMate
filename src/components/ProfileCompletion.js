import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // to be used in navigating the user to home after profile completion
import { Box, Snackbar } from '@mui/material'; //Import Box and Snackbar from MUI to improve page UI

function ProfileCompletion({ onProfileComplete }) { //destructure onProfileComplete from props
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // initialise navigate
  const [error, setError] = useState(false); // Added a new state for handling error display

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validating name and bio section
    if (!name || !bio) {
      setError(true); // If fields are empty, set error to true
      return;
    }

    const userData = {
      name,
      bio,
      email: auth.currentUser.email, // email is taken from auth
      uid: auth.currentUser.uid, // uid is taken from auth
    };

    try {
      // Here, 'users' is the name of my Firestore collection, and I'm using
      // the user's uid as the document ID
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);
      // Once the user data has been added to Firestore, we can redirect the user
      // to the home page or somewhere else
      console.log('User data added to Firestore');
      onProfileComplete(); // call onProfileComplete function
      setTimeout(() => {
        navigate('/') // when the profile is completed, navigate user to home page
      }, 2000); // Set a timeout function to delay the navigate for a couple of seconds to give
      // the onProfileComplete() enough time to update the state and navigate to home page.
    } catch (error) {
      console.error('Error adding user data to Firestore', error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  } // this handles the dismissal of the snackbar

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width="500px"> {/* Limit the form width */}
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
            fullWidth
            sx={{ mb: 1}} // add bottom margin
          />
          <TextField
            name="bio"
            label="Bio"
            value={bio}
            onChange={event => setBio(event.target.value)}
            required
            fullWidth
            multiline
            //sx={{ mb: 1}} // add bottom margin
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
        {/* Snackbar for error messages */}
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          message="All fields are required"
          action={
            <Button color="secondary" size="small" onClick={handleClose}>
              Close
            </Button>
          }
        />
      </Box>
    </Box>
  );
}

export default ProfileCompletion;
