import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import NavBar from "./NavBar";
import "./App.css";
import LoginUser from "./LoginForm";
import SignupUser from "./Signup";
import { CardComponent } from "./routesList";
import { useState, React, Fragment, useEffect } from "react";
import JoblyApi from "./api";
import { Profile } from "./Profile";
import EditUser from "./EditProfile";

/**
 * App
 * Main, top-level component for Jobly. Contains the states, functions, and routes necessary for running Jobly
 */
function App() {

  const [jobsApplied, setJobsApplied] = useState(localStorage.applied || '')
  // Keep track of current user. If there's no local storage (the user is logged out), just set to null
  const [currentUser, setCurrentUser] = useState(localStorage.user || null);
  const [token, setToken] = useState(localStorage.token || null);


/**
 * addUser
 * Passed to signup form and takes form data. Registers a new user and sets local storage to said user and corresponding token
 * @param {*} user The form data from Signup.js
 */
  async function addUser(user) {
    try {

      // Attempt to register, assuming all fields meet the schema requirements
      const resp = await JoblyApi.register({
        username: user.username,
        password: user.password,
        firstName: user.firstname, 
        lastName: user.lastname,
        email: user.email
      });

      // Set states for token and current user
      setToken(resp.token);
      setCurrentUser(resp.username);

      // To maintain persistent login, use local storage
      localStorage.user = resp.username
      localStorage.token = resp.token

      console.log(`Successfully registered ${resp.username}!`);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  /**
   * Login
   * Passed to login form and takes form data. Credentials are verified via API. If login successful, local storage and states are updated.
   * If not, logs an error.
   * 
   * @param {String} username 
   * @param {String} password 
   */
  async function login({ username, password }) {
    try {
      const resp = await JoblyApi.login(username, password);
      console.log(resp)
      setToken(resp.token);
      setCurrentUser(username);
      console.log("Successfully logged in!");
      localStorage.user = username
      localStorage.token = resp.token
      localStorage.isAdmin = resp.isAdmin
    } catch (e) {
      console.error("Could not login: " + e);
    }
  }

  /**
   *  logout()
   *  Log user out. Clears state and local storage.
   */
  async function logout() {
    setCurrentUser(null);
    setToken(null);
    JoblyApi.token = null
    localStorage.clear()
  }

  async function editUser(user, username){
    // console.log(user)
    try{
        const resp = await JoblyApi.patchUser({
        firstName: user.firstname, 
         lastName: user.lastname,
          email: user.email}, username, localStorage.token)

      console.log(`Successfully edited ${resp.username}!`);

    } catch(e){
    }

  }

  return (
    <div className="app">
      <BrowserRouter>

      {/* NavBar for Login, Signup, Profile, Users (admin only), Companies, Jobs */}
        <NavBar currentUser={currentUser} logout={logout} />
        <main>
          <Routes>

            {/* Click on the Jobly logo to go to homepage */}
            <Route exact path="/" element={<Home />} />



            {localStorage.isAdmin && 
            <Route exact path="/users" element={<Page />} />
            }
            {/* IF the user isn't logged in, show the login and signup routes. */}
            {currentUser == null ? (
              <Fragment>
                <Route exact path="/login" element={<LoginUser login={login} />} />
                <Route exact path="/signup" element={<SignupUser addUser={addUser} />} />
              </Fragment>
            ) : (

              // If the user IS logged in, show profile and the ability to logout
              <Fragment>
                <Route exact path="/profile" element={<Profile currentUser={currentUser} token={token}/>} />
                <Route exact path="/logout" element={<Navigate to="/" replace onClick={logout} />} />

                {/* Users have to be logged in to view these */}
                <Route exact path="/companies" element={<Page />} />
                <Route exact path="/jobs" element={<Page />} />
              </Fragment>
            )}


            {/* Not directly accessible via NavBar. Routes for individual companies.
            Uses CardComponent */}
            <Route exact path="/companies/:title" element={<CardComponent type="companies" jobsApplied={jobsApplied} />} />
            <Route exact path="/users/:username" element={<CardComponent type="users" />} />
            <Route exact path="/jobs/:id" element={<CardComponent type="jobs" />} />

            {/* For admin accounts. Shows list of users */}
            {localStorage.isAdmin == 'true' && 
            <Route exact path="/users" element={<CardComponent type="users" />} />
            
            }

            {/* Modify a user's profile */}
            <Route path='/users/:username/edit' element={<EditUser editUser={editUser} currentUser={currentUser} token={token} />} />

            {/* If route not found navigate to root */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
