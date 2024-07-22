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


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  // // TODO: From server, set state for current user
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://api.example.com/data');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // {username, password, firstName, lastName, email}
  async function addUser(user) {
    try {
      const resp = await JoblyApi.register({
        username: user.username,
        password: user.password,
        firstName: user.firstname, 
        lastName: user.lastname,
        email: user.email
      });

      setToken(resp.token);
      setCurrentUser(resp.username);
      console.log(`Successfully registered ${resp.username}!`);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async function login({ username, password }) {
    try {
      const resp = await JoblyApi.login(username, password);
      console.log(resp)
      setToken(resp.token);
      setCurrentUser(username);
      console.log("Successfully logged in!");
      // localStorage.user = username
      // localStorage.isAdmin = resp.isAdmin
    } catch (e) {
      console.error("Could not login: " + e);
    }
  }

  async function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.clear()
  }

  return (
    <div className="app">
      <BrowserRouter>
        <NavBar currentUser={currentUser} logout={logout} />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/companies" element={<Page />} />
            <Route exact path="/users" element={<Page />} />
            <Route exact path="/jobs" element={<Page />} />

            {currentUser == null ? (
              <Fragment>
                <Route exact path="/login" element={<LoginUser login={login} />} />
                <Route exact path="/signup" element={<SignupUser addUser={addUser} />} />
              </Fragment>
            ) : (
              <Fragment>
                <Route exact path="/profile" element={<Profile currentUser={currentUser} token={token}/>} />
                <Route exact path="/logout" element={<Navigate to="/" replace onClick={logout} />} />
              </Fragment>
            )}

            <Route exact path="/companies/:title" element={<CardComponent type="companies" />} />
            <Route exact path="/users/:username" element={<CardComponent type="users" />} />
            <Route exact path="/jobs/:id" element={<CardComponent type="jobs" />} />

            {/* If route not found navigate to root */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
