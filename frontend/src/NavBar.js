import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ml-auto navbar-nav" navbar>
          <NavItem>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/companies" className="nav-link">
              Companies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs" className="nav-link">
              Jobs
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
