import React, { Component } from 'react';
import { auth } from '../firebase';
import { Button, TextField } from '@mui/material'; //Adding MUI components styling


class SignUp extends Component {
    state = { email: '', password: '', error: null };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.createUserWithEmailAndPassword(email, password);
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
        );
    }
}

export default SignUp;
