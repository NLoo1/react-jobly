import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import NavBar from "./NavBar";
import "./App.css";
import LoginUser from "./LoginForm";
import SignupUser from "./Signup";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />


            <Route exact path="/companies" element={<Page />} />
            {/* <Route exact path="/users" element={<div>Users Page</div>} /> */}
            <Route exact path="/jobs" element={<Page />} />
            <Route exact path="/login" element={<LoginUser />} />
            <Route exact path="/signup" element={<SignupUser /> }/>
            <Route exact path="/profile" element={<div>Profile Page</div>} />


            <Route exact path="/companies/:id" element={<div>Company Detail</div>} />
            <Route exact path="/users/:id" element={<div>User Detail</div>} />
            <Route exact path="/jobs/:id" element={<div>Job Detail</div>} />
            <Route exact path="/auth/:id" element={<div>Auth Detail</div>} />

            {/* If route not found navigate to root */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
