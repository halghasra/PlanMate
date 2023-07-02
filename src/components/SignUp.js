/**
 * @desc: Adding a sign-up form to the application using Firebase Authentication.
 * The form uses the TextField and Button components from Material UI to create a form for the user to sign up.
 * The component is rendered when the user clicks on the Sign Up tab within the Login page.
 * @return {JSX} Return the sign-up form component
 */

import React, { Component } from 'react';
import { auth } from '../firebase';
import { Button, TextField } from '@mui/material'; //Adding MUI components styling
import { createUserWithEmailAndPassword } from '../firebase';

// Adding a sign-up form
class SignUp extends Component {
    // Adding state for the email, password, and error message
    state = { email: '', password: '', error: null };

    // Function to handle input change
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Function to handle form submission
    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        // Adding validation to check if the email and password fields are not empty
        try {
            // Call the createUserWithEmailAndPassword function from Firebase to create a new user
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            this.props.handleError(error.message);
        }
    };

    // Adding a render method to display the sign-up form
    render() {
        const { email, password } = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
              required
              type="password"
            />
            <Button 
              type="submit"
              fullWidth 
              variant="contained"
              color="primary"
              sx={{ mt: 2, '&:hover': {bgcolor: 'primary.light'} }}
            >
              Sign Up
            </Button>
          </form>
        );
    }
}

export default SignUp;
