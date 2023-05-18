import React, { Component } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { Button, TextField } from '@mui/material'; //Adding MUI components styling
import { auth, GoogleAuthProvider } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';

class Login extends Component {
    state = { email: '', password: '', error: null };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            this.props.handleError(error.message);
        }
    };

    // Method to handle the sign-in with Google
    handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleAuthProvider);
            // The signed-in user info.
            const user = result.user;
            // This gives us a Google Access Token, which we can use to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
        } catch (error) {
            this.props.handleError(error.message);
        }
    };
    

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

