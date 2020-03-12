import React from 'react';

import DriverProfile from '../../components/driverprofile'
import SponsorProfile from '../../components/sponsorprofile'
import {decrypt} from "../../state/crypto";

const Profile = () => {

    const session = localStorage.getItem('session')
    if (session) {
      const decrypted = decrypt(session.toString());
      const role = decrypted.split(".")[1];
      switch(role) {
        case "Admin":
          return <p>Admin profile</p>;
        case "Driver":
          return <DriverProfile id={decrypted.split(".")[2]} userId={decrypted.split(".")[0]}/>;
        case "Sponsor":
          return <SponsorProfile sponsorId={decrypted.split(".")[2]} userId={decrypted.split(".")[0]} />;
        default:
          return <p> Invalid login. </p>;
      }
    }
    return <p> Invalid session. </p>;

}

export default Profile;
