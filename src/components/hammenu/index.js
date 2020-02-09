import './index.css';
import React from 'react';
import {slide as Menu} from 'react-burger-menu';

class HamMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <div className="bm-burger-button">
      <Menu right>
        <a id="Login" className="menu-item" href="/login">
          <div class="itemBox">Login</div>
        </a>
        <a id="Register" className="menu-item" href="/register">
          <div class="itemBox">Register</div>
        </a>
        <a id="contact" className="menu-item" href="/home">
          <div class="itemBox">Home</div>
        </a>
      </Menu>
      </div>
    );
  }
}

export default HamMenu;
