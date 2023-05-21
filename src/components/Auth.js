import React, { Component } from 'react';
import { Paper, Tabs, Tab, Box, Snackbar, Alert } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import logo from '../assets/planmate-logo-purple.png'

class Auth extends Component {
  state = { value: 0, error: null };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleError = (error) => {
    this.setState({ error });
  };

  handleClose = () => {
    this.setState({ error: null });
  };

  render() {
    const { value, error } = this.state;
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
