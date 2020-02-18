import AdminPanel from '../../components/adminpanel'
import DriverPanel from '../../components/driverpanel'
import SponsorPanel from '../../components/sponsorpanel'

import React from 'react';

import {decrypt} from "../../state/crypto";

class Dashboard extends React.Component {
  render() {
    const session = localStorage.getItem('session')
    if (session) {
      const decrypted = decrypt(session.toString());
      const role = decrypted.split(".")[1];
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
