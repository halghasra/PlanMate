import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import LogoutButton from './components/LogoutButton';
//import './App.css'; will be added later once I define App.css

class App extends Component {
  state = { user: null };

  componentDidMount() {
    this.authSubscription = onAuthStateChanged(auth, (user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.user && <LogoutButton />}
          <Routes>
            <Route path="/" element={this.state.user ? <p>Welcome, {this.state.user.email}</p> : <Navigate to="/login" />} />
            <Route path="/login" element={!this.state.user ? <Auth /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;