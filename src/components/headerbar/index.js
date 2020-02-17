import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from 'react';
import {
  withRouter
} from 'react-router-dom'

class HeaderBar extends React.Component {
  state = { redirect: false };

  logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("session");
    this.props.history.push("/");
  }

  render() {
    const session = localStorage.getItem('session')
    return (
      <div>
        <Navbar className='navbar-dark' bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">Driver Incentive</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              { !session ? (
                <React.Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>,
                  <Nav.Link href="/">Home</Nav.Link>,
                  <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}

export default withRouter(HeaderBar);
