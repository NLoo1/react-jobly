import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";


/**
 * NavBar
 * 
 * Navigation bar that persists between routes. Conditionally shows links depending on route
 */
function NavBar({currentUser, logout}) {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Brand name */}
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        {/* Nav stuff */}
        <Nav className="ml-auto navbar-nav" navbar>

          {/* Login 
          Hide if user is logged in*/}
          {location.pathname !== "/login" && currentUser == null && (
            <NavItem>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </NavItem>
          )}



          {/* Signup 
            Hide this if a user is logged in.
          */}
          {location.pathname !== "/signup" && currentUser==null && (
            <NavItem>
              <NavLink to='/signup' className="nav-link">
                Sign up
              </NavLink>
            </NavItem>
          )}

          {/* Logout */}
          {location.pathname !== "/logout" && currentUser && (
            <NavItem>
              <span onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
              Logout
              </span>
            </NavItem>
          )}
          
          {/* Profile */}
          {location.pathname !== "/profile" && currentUser && (
            <NavItem>
              <NavLink to='/profile' className="nav-link" >
              Profile
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
