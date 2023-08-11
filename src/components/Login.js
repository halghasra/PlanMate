/**
 * @desc: Adding a login form to the application using Firebase Authentication.
 * The form uses the TextField and Button components from Material UI to create a form for the user to log in.
 * The component is rendered when the user clicks on the Login tab within the Login page.
 * @return {JSX} Return the login form component
 */
import React, { Component } from "react";
import { Button, TextField, CircularProgress, Box } from "@mui/material"; //Adding MUI components styling
import { auth, GoogleAuthProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

class Login extends Component {
  state = { email: "", password: "", error: null, loading: false };

  // Function to handle input change
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Function to handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    // Adding validation to check if the email and password fields are not empty
    this.setState({ loading: true });
    try {
      // Call the signInWithEmailAndPassword function from Firebase to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // If there is an error, set the error message in the state
      this.props.handleError(error.message);
    } finally {
      // Set loading to false to stop the loading spinner
      this.setState({ loading: false }); // stop loading
    }
  };

  // Method to handle the sign-in with Google
  handleGoogleSignIn = async () => {
    this.setState({ loading: true }); // start loading
    try {
      // Call the signInWithPopup function from Firebase to sign in the user with Google
      await signInWithPopup(auth, GoogleAuthProvider);
    } catch (error) {
      this.props.handleError(error.message);
    } finally {
      this.setState({ loading: false }); // stop loading
    }
  };

  // Adding a render method to display the sign-up form
  render() {
    const { email, password, loading } = this.state;
    if (loading) {
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>;
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
          color="primary"
          sx={{ mt: 2, "&:hover": { bgcolor: "primary.light" } }}
        >
          Login
        </Button>
        <hr style={{ margin: "20px 0" }} />
        <p style={{ textAlign: "center" }}>or</p>
        <Button
          onClick={this.handleGoogleSignIn}
          fullWidth
          variant="contained"
          color="error"
          startIcon={<GoogleIcon />}
          sx={{ mt: 2, color: "white", "&:hover": { bgcolor: "error.light" } }}
        >
          Sign In with Google
        </Button>
      </form>
    );
  }
}

export default Login;
