import React from 'react';

class AdminPanel extends React.Component {
  render() {
    if (localStorage.getItem('role') === "Admin") {
      return (
        <p> this is an admin panel. </p>
      );
    }
  }
}

export default AdminPanel;
