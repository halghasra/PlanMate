import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Snackbar, Avatar } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // to be used in navigating the user to home after profile completion
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'; 

function ProfileCompletion({ onProfileComplete }) { //destructure onProfileComplete from props
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // initialise navigate
  const [error, setError] = useState(false); // Added a new state for handling error display
  const [profilePic, setProfilePic] = useState(null);
  const [picUrl, setPicUrl] = useState(''); // store the url of the uploaded pic
  const fileInputRef = useRef(null) //used to display the name of the selected file

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

  const handleFileChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  // Adds the ability to reset the selected file
  const resetFile = (event) => {
    event.preventDefault(); // prevent the form from being submitted
    fileInputRef.current.value = ""; // clear the value in the file input
    setProfilePic(null); // clear the selected file
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  } // this handles the dismissal of the snackbar

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Avatar alt="User Profile Picture" src={picUrl} sx={{ width: 96, height: 96, mb: 1 }} /> {/* Display the profile picture here */}
      <Box width="500px">
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <TextField
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              inputRef={fileInputRef}
            />
            <Button onClick={resetFile} variant="contained" color="secondary" sx={{ ml: 1 }} type="button">
              Reset
            </Button>
            {profilePic && <Box sx={{ ml: 2 }}>{profilePic.name}</Box>}
          </Box>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
            fullWidth
            sx={{ mb: 1}}
          />
          <TextField
            name="bio"
            label="Bio"
            value={bio}
            onChange={event => setBio(event.target.value)}
            required
            fullWidth
            multiline
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
