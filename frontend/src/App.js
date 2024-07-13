import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import NavBar from "./NavBar";
import "./App.css";
import LoginUser from "./LoginForm";
import SignupUser from "./Signup";
import { CardComponent } from "./routesList";
import { useState } from "react";
import JoblyApi from "./api";

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)


  // {username, password, firstName, lastName, email}
  async function addUser(user) {
    console.log("f")
    console.log(user)
    try {
      const resp = await JoblyApi.register({
        username: user.username,
        password: user.password,
        firstName: user.firstname, // Ensure these match your API endpoint
        lastName: user.lastname,
        email: user.email
      });
      // Handle the response as needed
      return resp;
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error appropriately (e.g., show error message)
      throw error;
    }
  }
  

  // async function login({user}){
  //   const resp = await JoblyApi.login
  // }

  async function logout(){
    setCurrentUser(null)
    setToken(null)
  }


  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />


            <Route exact path="/companies" element={<Page />} />
            <Route exact path="/users" element={<Page />} />
            <Route exact path="/jobs" element={<Page />} />
            <Route exact path="/login" element={<LoginUser />} />
            <Route exact path="/signup" element={<SignupUser addUser={addUser} /> }/>
            <Route exact path="/profile" element={<div>Profile Page</div>} />


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
