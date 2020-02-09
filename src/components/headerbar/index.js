import './index.css';
import HamMenu from '../hammenu/'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react';

class HeaderBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar className='navbar-dark' bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/home">
            <span>Driver Incentive</span>
          </Navbar.Brand>
          <HamMenu/>
        </Navbar>
      </div>
    )
  }

}

export default HeaderBar;
