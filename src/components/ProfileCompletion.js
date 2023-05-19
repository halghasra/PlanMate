import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../firebase';

function ProfileCompletion() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // In a real app, you would want to validate these values more thoroughly
    if (!name || !bio) {
      console.log('All fields are required');
      return;
    }

    const userData = {
      name,
      bio,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
    };

    try {
      // Here, 'users' is the name of my Firestore collection, and I'm using
      // the user's uid as the document ID
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);
      // Once the user data has been added to Firestore, we can redirect the user
      // to the home page or somewhere else
      console.log('User data added to Firestore');
      this.props.onProfileComplete();
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