import React from 'react';

import crypto from "../../state/crypto";

class AdminPanel extends React.Component {
  render() {
    var session = localStorage.getItem('session')
    var decrypted = crypto.decrypt(session.toString());
    var role = decrypted.split(".")[1];

    if (role === "Admin") {
      return (
        <p> this is an admin panel. </p>
      );
    }
    else {
      return (
        <p> you are not an admin </p>
      );
    }
  }
}

export default AdminPanel;
