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
        <h5> Placeholder text here</h5>
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
