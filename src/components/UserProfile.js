import React from 'react';
import { auth } from '../firebase';

const UserProfile = () => {
  const user = auth.currentUser;
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
