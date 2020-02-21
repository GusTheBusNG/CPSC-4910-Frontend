import React from 'react';
import AllDrivers from '../tables/all-drivers';
import AllSponsors from '../tables/all-sponsors';
import AllCompanies from '../tables/all-companies';
import AllDriverApplications from '../tables/all-driver-applications';

const AdminPanel = () => (
  <div style={{ maxWidth: "98%", margin: "1rem auto" }}>
    <AllDrivers />
    <AllSponsors style={{ marginTop: "1rem" }} />
    <AllCompanies style={{ marginTop: "1rem" }} />
    <AllDriverApplications style={{ marginTop: "1rem" }} />
  </div>
);

export default AdminPanel;
