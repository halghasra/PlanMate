import React, { Component } from 'react';
import { auth } from '../firebase';

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
            this.setState({ error: error.message });
        }
    };

    render() {
        const { email, password, error } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleInputChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleInputChange}
                    />
                    {error ? <p>{error}</p> : null}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
