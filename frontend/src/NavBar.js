import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  return (
    <div>
      {/* Brand name */}
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        {/* Nav stuff */}
        <Nav className="ml-auto navbar-nav" navbar>

        {/* ADD CONDITIONAL IF LOGGED IN */}
          {/* Login */}
          {location.pathname !== "/login" && (
            <NavItem>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </NavItem>
          )}

          {/* Signup */}
          {location.pathname !== "/signup" && (
            <NavItem>
              <NavLink to="/signup" className="nav-link">
                Sign up
              </NavLink>
            </NavItem>
          )}

          {/* Companies */}
          {location.pathname !== "/companies" && (
            <NavItem>
              <NavLink to="/companies" className="nav-link">
                Companies
              </NavLink>
            </NavItem>
          )}

          {/* Jobs */}
          {location.pathname !== "/jobs" && (
            <NavItem>
              <NavLink to="/jobs" className="nav-link">
                Jobs
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;