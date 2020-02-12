import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from 'react';

class HeaderBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar className='navbar-dark' bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">Driver Incentive</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}

export default HeaderBar;
