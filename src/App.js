//import Header from "./components/Header";
//import Footer from "./components/Footer";
//import HamburgerMenu from "./components/Hamburgermenu";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Imports doc data from firestore
import Auth from "./components/Auth";
//import LogoutButton from "./components/LogoutButton"; // import the logout button
import UserProfile from "./components/UserProfile"; //Import the user profile from Firebase
import ProfileCompletion from "./components/ProfileCompletion";
import Home from "./components/Home";
import { ThemeProvider, CircularProgress, Toolbar } from "@mui/material";
import theme from "./theme/theme";
import Layout from "./components/Layout";
import Calendar from "./components/Calendar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

class App extends Component {
  // start loading while the auth state is being determined
  // added needsProfileCompletion flag to the state
  state = { user: null, loading: true, needsProfileCompletion: false };

  /* Rewriting componentDidMount to add a user profile check.
     This will check to see if the user is signed in and doesn't have a complete profile yet.
  componentDidMount() {
    this.authSubscription = onAuthStateChanged(auth, (user) => {
      this.setState({ user , loading: false}); // stop loading
    });
  }
  */

  /**
  Here, we're checking if a user document exists in the Firestore database whenever the
  auth state changes. If the user fdocument does not exist, we're setting 'needsProfileCompletion'
  to true, and we're using that flag to redirect the user to the ProfileCompletion page.
  */
  async componentDidMount() {
    this.authSubscription = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //user doc exists so they don't need to complete profile
          this.setState({
            user,
            loading: false,
            needsProfileCompletion: false,
          });
        } else {
          // no user doc, they need to complete profile
          this.setState({ user, loading: false, needsProfileCompletion: true });
        }
      } else {
        // no user, stop loading
        this.setState({
          user: null,
          loading: false,
          needsProfileCompletion: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { loading, user, needsProfileCompletion } = this.state;
    if (loading) {
      return <CircularProgress />;
    }
    return (
      <Router>
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout>
            <Toolbar>
            <div>
            <Routes>
              <Route
                path="/"
                element={
                  user ? (
                    !needsProfileCompletion ? (
                      <Home />
                    ) : (
                      <Navigate to="/complete-profile" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/login"
                element={!user ? <Auth /> : <Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={user ? <UserProfile /> : <Navigate to="/login" />}
              />
              <Route
                path="/complete-profile"
                element={
                  user ? (
                    !needsProfileCompletion ? (
                      <Navigate to="/" />
                    ) : (
                      <ProfileCompletion
                        onProfileComplete={() =>
                          this.setState({ needsProfileCompletion: false })
                        }
                      />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/calendar" element={user ? ( <Calendar />) : ( <Navigate to="/calendar"/>)}/>
            </Routes>
            </div>
            </Toolbar>
          </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
