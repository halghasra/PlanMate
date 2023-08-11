/**
 * @desc: This component represents the user profile page of the application where the user can edit/update their profile information.
 * It uses the TextField, Button, Box, Avatar, and CircularProgress components from Material UI to create a form for the user to update their profile.
 * The component is rendered when the user clicks on the Profile link in the navigation menu.
 * @return {JSX} Return the user profile component
 */

import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TextField, Button, Box, Avatar, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // to use Firestorage to store Profile pictures
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const UserProfile = () => {
  // Adding state for name and bio
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  // Adding a loading state and setting it to true until the user data is fetched from Firestore
  const [loading, setLoading] = useState(true);

  // Adding a submitting state to render a spinner when a profile update is submitted
  const [submitting, setSubmitting] = useState(false);

  // Adding a navigate hook to redirect the user to the home page after updating the profile
  const navigate = useNavigate();

  // Adding state for the profile picture and its URL
  const [profilePic, setProfilePic] = useState(null);
  const [picUrl, setPicUrl] = useState('');

  // Adding a reference to the file input
  const fileInputRef = useRef(null);

  // Adding an async function to fetch the user data from Firestore
  const fetchUserData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    // if the document exists, set the state of the user profile
    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setBio(docSnap.data().bio);
      setPicUrl(docSnap.data().picUrl); // fetch the picture URL
    } 
    // otherwise, log an error message
    else {
      console.log("No such documents!");
    }
    // set the loading state to false after fetching the data
    setLoading(false);
  };

  // Adding an async function to update the user profile
  const updateUserProfile = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    // Adding validation to check if the name and bio fields are not empty
    if (!name || !bio) {
      console.log('All fields are required');
      setSubmitting(false);
      return;
    }
  
    // Prepare the data to be updated
    const userData = {
      name,
      bio,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
    };
  
    // Adding a condition to check if the user has selected a new profile picture
    if (profilePic) {
      const storage = getStorage();
      const storageRef = ref(storage, 'profilePics/' + profilePic.name);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);
  
      // Use a promise to wait for the upload to complete
      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => {
            console.error('Upload failed', error);
            setSubmitting(false);
            reject(error);
          }, 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            userData.picUrl = downloadURL; // add the URL to userData here
            resolve();
          }
        );
      });
    }

    // Adding a try/catch block to update the user data in Firestore
    try {
      // Update the user document in users collection
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);
      console.log('User data updated in Firestore');

      // Delay the navigation to the home page after updating the user data
      setTimeout(() => {
        navigate('/') // Navigate the user to home page after updating
      }, 2000);
    } catch (error) {
      console.error('Error updating user data in Firestore', error);
    }
    setSubmitting(false);
  };

  // Function to reset the selected file
  const resetFile = (event) => {
    event.preventDefault(); // prevent the form from being submitted
    fileInputRef.current.value = ""; // clear the value in the file input
    setProfilePic(null); // clear the selected file
  }

  // Calling the async function fetchUserData to run when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);
  
  // if the loading state is true, the component will render a loading spinner
  if (loading) {
    return <CircularProgress />;
  }
  
  // Otherwise, the component will render the user profile form
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Avatar alt="User Profile Picture" src={picUrl} sx={{ width: 192, height: 192, mb: 1 }}/> {/* Display the profile picture here */}
      <form onSubmit={updateUserProfile}>
        <Box dispaly="flex" alignItems="center" sx={{ mb: 1 }}>
          <TextField
            accept="image/*"
            type="file"
            onChange={event => setProfilePic(event.target.files[0])}
            inputRef={fileInputRef}
            size='small'
            sx={{ mb: 1 }}
          />
          <Button onClick={resetFile} variant="contained" color="secondary" sx={{ ml: 1, '&:hover': {bgcolor: 'secondary.light'}}} type="button">
            Reset
          </Button>
          {profilePic && <Box sx={{ ml:2 }}>{profilePic.name}</Box>}
        </Box>
        <TextField
          name="name"
          label="Name"
          size="medium"
          value={name}
          onChange={event => setName(event.target.value)}
          required
          fullWidth
          sx={{ mb: 1 }}
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
          sx={{ mb: 1 }}
        />
        <Button component={Link} to="/" variant="contained" color="secondary" sx={{ mt: 1, mr: 1, '&:hover': {bgcolor: 'secondary.light'}}}>
          <ArrowBackIcon /> Back
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, ml: 1, color:'white', '&:hover': {bgcolor: 'primary.light'} }}>
        {submitting ? <CircularProgress size={24} /> : "Update profile"}
        </Button>
      </form>
    </Box>
  );
};

export default UserProfile;
