import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TextField, Button, Box, Avatar, CircularProgress } from '@mui/material';
//import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // to use Firestorage to store Profile pictures

// Adding state for name and bio
// Adding a loading state and setting it to true until the user data is fetched from Firestore
const UserProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // used to render a spinner when a profile update is submitted
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [picUrl, setPicUrl] = useState(''); // store the url of the uploaded pic
  const fileInputRef = useRef(null); // initialise a reference to the file input 

  // Asynchronous function to get the user data from Firestore
  const fetchUserData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setBio(docSnap.data().bio);
      setPicUrl(docSnap.data().picUrl); // fetch the picture URL
    } else {
      console.log("No such documents!");
    }
    setLoading(false);
  };

  const updateUserProfile = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    if (!name || !bio) {
      console.log('All fields are required');
      setSubmitting(false);
      return;
    }
  
    const userData = {
      name,
      bio,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
    };
  
    if (profilePic) {
      const storage = getStorage();
      const storageRef = ref(storage, 'profilePics/' + profilePic.name);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);
  
      // Use then method to wait for the upload to complete
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

    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);
      console.log('User data updated in Firestore');
      setTimeout(() => {
        navigate('/') // Navigate the user to home page after updating
      }, 2000);
    } catch (error) {
      console.error('Error updating user data in Firestore', error);
    }
    setSubmitting(false);
  };

  const resetFile = (event) => {
    event.preventDefault(); // prevent the form from being submitted
    fileInputRef.current.value = ""; // clear the value in the file input
    setProfilePic(null); // clear the selected file
  }

  // Calling the async function fetchUserData to run when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);
  
  // if the loading state is true, the component will render a loading message
  if (loading) {
    return <CircularProgress />;
  }
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Avatar alt="User Profile Picture" src={picUrl} sx={{ width: 96, height: 96, mb: 1 }}/> {/* Display the profile picture here */}
      <form onSubmit={updateUserProfile}>
        <Box dispaly="flex" alignItems="center" sx={{ mb: 1 }}>
          <TextField
            accept="image/*"
            type="file"
            onChange={event => setProfilePic(event.target.files[0])}
            inputRef={fileInputRef}
            sx={{ mb: 1 }}
          />
          <Button onClick={resetFile} variant="contained" color="secondary" sx={{ ml: 1}} type="button">
            Reset
          </Button>
          {profilePic && <Box sx={{ ml:2 }}>{profilePic.name}</Box>}
        </Box>
        <TextField
          name="name"
          label="Name"
          value={name}
          onChange={event => setName(event.target.value)}
          required
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          name="bio"
          label="Bio"
          value={bio}
          onChange={event => setBio(event.target.value)}
          required
          fullWidth
          multiline
          sx={{ mb: 1 }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
        {submitting ? <CircularProgress size={24} /> : "Update profile"}
        </Button>
      </form>
    </Box>
  );
};

export default UserProfile;
