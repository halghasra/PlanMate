/**
 * @desc This component represents the authentication page of the application.
 * It uses MUI components such as Paper, Tabs, Tab, Box, and Snackbar to create a login and sign up interfaces.
 * The component is rendered when the user is not logged in.
 * @return {JSX} Return the authentication component with login and sign up forms
 */
import React, { Component } from 'react';
import { Paper, Tabs, Tab, Box, Snackbar, Alert } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import logo from '../assets/planmate-logo-purple.png'

class Auth extends Component {
  // Initialise state with value and error properties
  state = { value: 0, error: null };

  handleChange = (event, newValue) => {
    // When the tab is changed, update the value in the state
    this.setState({ value: newValue });
  };

  handleError = (error) => {
    // Update the errror state when an error occurs
    this.setState({ error });
  };

  handleClose = () => {
    // Close the error snackbar by setting the error state to null
    this.setState({ error: null });
  };

  render() {
    // Destructure the value and error properties from the state
    const { value, error } = this.state;
    // Render the login and sign up forms, and render the error snackbar if there is an error
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="grey.100"
      >
        <Paper elevation={3} sx={{ width: '90%', maxWidth: '500px', p: 2 }}>
          <Box textAlign="center" pb={2}>
            <img src={logo} alt="PlanMate logo" style={{ width: '50%' }} />
          </Box>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="login and sign up tabs"
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          {value === 0 ? <Login handleError={this.handleError} /> : <SignUp handleError={this.handleError} />}
          <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    );
  }
}

export default Auth;
