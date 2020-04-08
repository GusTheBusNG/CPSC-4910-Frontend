import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import DriverImage from "./happy-driver.png";
import "./index.css"
import "../../fonts/fonts.css"

class HomePageBody extends React.Component {
  render() {
    return (
      <div className="body">
        <h3>Good Driver Incentive Program</h3>
        <h4> What we do:</h4>
        <h5> The Driver Incentive program is designed to encourage good driving behavior by rewarding drivers with points based on their driving habits. </h5>
        <div className="centerContainer">
          <ul className="leftAlign">
            <li> Drivers can earn points for good driving</li>
            <li> Drivers can apply to multiple different companies and earn rewards from all of them </li>
            <li> Using your points, you can purchase items from your affiliated companies catalogs</li>
          </ul>
        </div>
      </div>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
        <div>
          <img className="center"
          alt="Happy Driver"
          src={DriverImage}
          />
          <HomePageBody/>
        </div>
    );
  }
}

export default HomePage;
