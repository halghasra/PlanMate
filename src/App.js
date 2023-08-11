/**
 * The main component of the PlanMate application.
 * Renders the appropriate component based on the current route.
 * Subscribes to the authentication state changes and determines if the user needs to complete their profile.
 * @extends Component
 */
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
import UserProfile from "./components/UserProfile"; //Import the user profile from Firebase
import ProfileCompletion from "./components/ProfileCompletion";
import Home from "./components/Home";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import theme from "./theme/theme";
import Calendar from "./components/FullCalendar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Footer from "./components/Footer";
import Layout from "./components/Layout";

class App extends Component {
  // start loading while the auth state is being determined
  // added needsProfileCompletion flag to the state
  state = { 
    user: null,
    loading: true,
    needsProfileCompletion: false 
  };

  // Subscribes to the authentication state changes
  authSubscription = null;

  
  componentDidMount() {
    this.authSubscription = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //user document exists, no need to complete profile
          this.setState({
            user,
            loading: false,
            needsProfileCompletion: false,
          });
        } else {
          // no user document, needs to complete profile
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
    // unsubscribe from the auth state changes
    this.authSubscription();
  }

  render() {
    const { loading, user, needsProfileCompletion } = this.state;
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
      <Router>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      {user ? (
                        !needsProfileCompletion ? (
                          <>
                            <Home />
                            <Calendar user={user} />
                          </>
                        ) : (
                          <Navigate to="/complete-profile" />
                        )
                      ) : (
                        <Navigate to="/login" />
                      )}
                    </Layout>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Layout>
                      {!user ? <Auth /> : <Navigate to="/" />}
                    </Layout>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Layout>
                      {user ? <UserProfile /> : <Navigate to="/login" />}
                    </Layout>
                  }
                />
                <Route
                  path="/complete-profile"
                  element={
                    <Layout>
                      {user ? (
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
                      )}
                    </Layout>
                  }
                />
              </Routes>
            <Footer />
          </LocalizationProvider>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
