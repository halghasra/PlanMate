/**
 * @desc: Adding a profile completion form to the application using Firebase Firestore.
 * The form uses the TextField, Button, Box, Avatar, and CircularProgress components from Material UI to create a form for the user to complete their profile.
 * The component is only rendered when the user signs up for the first time.
 * @return {JSX} Return the profile completion form component
 */

import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Snackbar, Avatar } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // to be used in navigating the user to home after profile completion //
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { CircularProgress } from '@mui/material'; // import circularProgress for the loading spinner

// ProfileCompletion component
function ProfileCompletion({ onProfileComplete }) { 
  // A state for name and bio
  const [name, setName] = useState(''); 
  const [bio, setBio] = useState('');

  // A navigate hook to redirect the user to the home page after updating the profile
  const navigate = useNavigate();

  // A state for handling error display
  const [error, setError] = useState(false); // Added a new state for handling error display

  // A state for the profile picture and its URL
  const [profilePic, setProfilePic] = useState(null);
  const [picUrl, setPicUrl] = useState('');

  // A reference to the file input
  const fileInputRef = useRef(null);

  // A state for handling form submission loading state
  const [loading, setLoading] = useState(false);

  // An async function to update the user profile  
  const handleSubmit = async (event) => {
    // Preventing the default behavior of the form submission
    event.preventDefault();
    // Setting the loading state to true before form submission begins
    setLoading(true);
    
    // Validating name and bio section
    if (!name || !bio) {
      // If name or bio is empty, set the error state to true and return
      setError(true);
      return;
    }

    // Creating a user data object
    const userData = {
      name,
      bio,
      email: auth.currentUser.email, // email is taken from auth
      uid: auth.currentUser.uid, // uid is taken from auth
    };

    // Uploading the profile picture to Firestorage
    if (profilePic) {
      const storage = getStorage();
      const storageRef = ref(storage, 'profilePics/' + profilePic.name);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Upload failed', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            userData.picUrl = downloadURL;
            setPicUrl(downloadURL); 
            resolve();
          }
        );
      });
    }

    try {
      // Here, 'users' is the name of my Firestore collection, and I'm using the user's uid as the document ID
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);

      // Once the user data has been added to Firestore, we can redirect the user to the home page or somewhere else
      console.log('User data added to Firestore');

      // call onProfileComplete function
      onProfileComplete(); 
      // Set a timeout function to delay the navigate for a couple of seconds to give the onProfileComplete() enough time to update the state and navigate to home page.
      setTimeout(() => {
        navigate('/') // when the profile is completed, navigate user to home page
      }, 2000); 

      // Set loading state back to false once form submition is completed
      setLoading(false); 
    } catch (error) {
      // Also set loading state back to false in case of an error
      setLoading(false);
      console.error('Error adding user data to Firestore', error);
    }
  };

  // A function to handle file change and set the selected file as a profile picture
  const handleFileChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  // Adds the ability to reset the selected file
  const resetFile = (event) => {
    // prevent the form from being submitted
    event.preventDefault(); 
    // clear the value in the file input
    fileInputRef.current.value = ""; 
    // clear the selected file
    setProfilePic(null); 
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  } // this handles the dismissal of the snackbar

  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      {loading ? <CircularProgress /> : (
        <>
        <Avatar alt="User Profile Picture" src={picUrl} sx={{ width: 192, height: 192, mb: 1 }} /> {/* Display the profile picture here */}
        <Box width="500px">
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <TextField
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              inputRef={fileInputRef}
              size='small'
              sx={{ mb: 1 }}
            />
            <Button onClick={resetFile} variant="contained" color="secondary" sx={{ ml: 1, '&:hover': {bgcolor: 'secondary.light'}}} type="button">
              Reset
            </Button>
            {profilePic && <Box sx={{ ml: 2 }}>{profilePic.name}</Box>}
          </Box>
          <TextField
            name="name"
            label="Name"
            size="medium"
            value={name}
            onChange={event => setName(event.target.value)}
            required
            fullWidth
            sx={{ mb: 1}}
          />
          <TextField
            name="bio"
            label="Bio"
            size="medium"
            value={bio}
            onChange={event => setBio(event.target.value)}
            required
            fullWidth
            multiline
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, color:'white', '&:hover': {bgcolor: 'primary.light'} }}>
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
      </>
      )}
    </Box>
  );
}

export default ProfileCompletion;
