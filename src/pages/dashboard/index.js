import AdminPanel from '../../components/adminpanel'
import DriverPanel from '../../components/driverpanel'
import SponsorPanel from '../../components/sponsorpanel'

import React from 'react';

import crypto from "../../state/crypto";

class Dashboard extends React.Component {
  render() {
    var session = localStorage.getItem('session')
    if (session) {
      var decrypted = crypto.decrypt(session.toString());
      var role = decrypted.split(".")[1];
      switch(role) {
        case "Admin":
          return <AdminPanel/>;
        case "Driver":
          return <DriverPanel/>;
        case "Sponsor":
          return <SponsorPanel/>;
        default:
          return <p> Invalid login. </p>;
      }
    }
    return <p> Invalid session. </p>;
  }
}

export default Dashboard;
