import React, { Component } from 'react';
import { auth } from '../firebase';

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
                        onChange={this.handleInputchange}
                    />
                    <input
                     name="password"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={this.handleInputChange}
                    />
                    {error ? <p>{error}</p> : null}
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;

