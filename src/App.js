import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

class App extends Component {
  render() {
    const navbarInstance = (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>Star Wars</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/logout">Logout</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    return (
      <div>
        {navbarInstance}
        {this.props.children}
      </div>
    );
  }
}

export default App;
