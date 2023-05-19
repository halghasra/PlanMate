import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import LogoutButton from './components/LogoutButton'; // import the logout button
import LoadingSpinner from './components/LoadingSpinner'; // Import the loading spinner
import UserProfile from './components/UserProfile'; //Import the user profile from Firebase
//import './App.css'; will be added later once I define App.css

class App extends Component {
  state = { user: null, loading: true }; // start loading while the auth state is being determined

  componentDidMount() {
    this.authSubscription = onAuthStateChanged(auth, (user) => {
      this.setState({ user , loading: false}); // stop loading
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner />
    }
    return (
      <Router>
        <div>
          {this.state.user && <LogoutButton />}
          <Routes>
            <Route path="/" element={this.state.user ? <p>Welcome, {this.state.user.email}</p> : <Navigate to="/login" />} />
            <Route path="/login" element={!this.state.user ? <Auth /> : <Navigate to="/" />} />
            <Route path="/profile" element={this.state.user ? <UserProfile /> : <Navigate to="/login" />} /> 
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;