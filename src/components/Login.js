import React, { Component } from 'react';
//import { signInWithPopup } from 'firebase/auth';
import { Button, TextField } from '@mui/material'; //Adding MUI components styling
import { auth, GoogleAuthProvider } from '../firebase';
//mport { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingSpinner from './LoadingSpinner'; // import the loading spinner

class Login extends Component {
    state = { email: '', password: '', error: null, loading: false };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        this.setState({ loading: true }); // start loading
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            this.props.handleError(error.message);
        } finally {
          this.setState({ loading: false }); // stop loading
      }
    };

    // Method to handle the sign-in with Google
    handleGoogleSignIn = async () => {
      this.setState({ loading: true }); // start loading  
      try {
            await signInWithPopup(auth, GoogleAuthProvider);
        } catch (error) {
            this.props.handleError(error.message);
        } finally {
          this.setState({ loading: false }); // stop loading
      }
    };
    

    render() {
        const { email, password, loading } = this.state;
        if (loading) {
          return <LoadingSpinner />
        }
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
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
            <hr style={{ margin: "20px 0" }} />
            <p style={{ textAlign: "center" }}>or</p>
            <Button 
              onClick={this.handleGoogleSignIn} 
              fullWidth 
              variant="contained" 
              startIcon={<GoogleIcon />}
              sx={{ mt: 2, bgcolor: '#db4437', color: 'white' }}
            >
              Sign In with Google
            </Button>
          </form>
        );
    }
}

export default Login;