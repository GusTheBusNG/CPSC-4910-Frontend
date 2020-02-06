import './index.css';
import HamMenu from '../navmenu/'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react';

class HeaderBar extends React.Component {
  // render () {
  //   return (
  //     <div class='HeaderBar'>
  //     <HamMenu/>
  //     </div>
  //   )
  // }
  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Driver Incentive</Navbar.Brand>
      <HamMenu/>
      </Navbar>
    )
  }

}

export default HeaderBar;
