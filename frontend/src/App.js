import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import NavBar from "./NavBar";
import "./App.css";
import LoginUser from "./LoginForm";
import SignupUser from "./Signup";
import { CardComponent } from "./routesList";

function App() {
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
            <Route exact path="/signup" element={<SignupUser /> }/>
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
