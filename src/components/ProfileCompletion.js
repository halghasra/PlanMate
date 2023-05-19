import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // to be used in navigating the user to home after profile completion

function ProfileCompletion({ onProfileComplete }) { //destructure onProfileComplete from props
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // initialise navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validating name and bio section
    if (!name || !bio) {
      console.log('All fields are required');
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
      navigate('/') // when the profile is completed, navigate user to home page
    } catch (error) {
      console.error('Error adding user data to Firestore', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={name}
        onChange={event => setName(event.target.value)}
        required
      />
      <TextField
        name="bio"
        label="Bio"
        value={bio}
        onChange={event => setBio(event.target.value)}
        required
      />
      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}

export default ProfileCompletion;
