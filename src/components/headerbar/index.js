import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from 'react';
import {
  withRouter
} from 'react-router-dom'
import { decrypt } from '../../state/crypto';
import Notifications from '../notifications'
import './headerbar.scss'

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      loggedIn: false,
      role: '',
      userId: 0
    };
  }

  componentDidMount() {
    const session = localStorage.getItem('session');

    if (session) {
      const decrypted = decrypt(session.toString());
      const role = decrypted.split(".")[1];
      const userId = decrypted.split(".")[0];
      this.setState({
        role,
        userId,
        loggedIn: !!session
      });
    }
  }

  componentDidUpdate() {
    const session = localStorage.getItem('session');

    if (session && !this.state.role) {
      const decrypted = decrypt(session.toString());
      const role = decrypted.split(".")[1];
      const userId = decrypted.split(".")[0];
      this.setState({
        role,
        userId,
        loggedIn: !!session
      });
    }
  }

  logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("session");
    this.setState({ loggedIn: false, role: '' })
    this.props.history.push("/");
  }

  render() {
    const { loggedIn, role, userId } = this.state;
    return (
      <div>
        <Navbar
          className="navbar"
          expand="lg"
          variant="dark"
          bg={role === 'Admin' ? 'admin' : 'dark'}
        >
          <Navbar.Brand href="/">Driver Incentive</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              { loggedIn ? (
                <React.Fragment>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
                  {role === 'Driver' && <Notifications userId={userId} />}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Sign Up</Nav.Link>
                </React.Fragment>
              )}
              <Nav.Link href="/support">Support</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}

export default withRouter(HeaderBar);
