import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from 'react';

class HeaderBar extends React.Component {
  logout(event) {
    event.preventDefault();
    localStorage.removeItem("session");
    window.location.href="/";
  }

  render() {
    var session = localStorage.getItem('session')
    if (!session) {
      return (
        <div>
          <Navbar className='navbar-dark' bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Driver Incentive</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
    }
    return (
      <div>
        <Navbar className='navbar-dark' bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">Driver Incentive</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}

export default HeaderBar;
