import React from 'react';
import AllDrivers from '../tables/all-drivers';
import AllSponsors from '../tables/all-sponsors';

const AdminPanel = () => (
  <div style={{ maxWidth: "98%", margin: "1rem auto" }}>
    <AllDrivers />
    <AllSponsors style={{ marginTop: "1rem" }} />
  </div>
);

export default AdminPanel;
