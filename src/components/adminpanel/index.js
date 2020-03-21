import React from 'react';
import AllDrivers from '../tables/all-drivers';
import AllSponsors from '../tables/all-sponsors';
import AllCompanies from '../tables/all-companies';
import AllDriverApplications from '../tables/all-driver-applications';
import AllAdmins from '../tables/all-admins';
import Purchase from '../reports/purchase';
import { PDFViewer } from '@react-pdf/renderer';
import Download from '../reports/download';

import { useQuery } from '@apollo/react-hooks';
import { getAllCompletedTransactions } from '../../state/queries'

const AdminPanel = () => { 
  const { data, loading } = useQuery(getAllCompletedTransactions)
  if (loading) return <p>Loading...</p>
  return (
    <div style={{ maxWidth: "98%", margin: "1rem auto" }}>
      <AllDrivers />
      <AllSponsors style={{ marginTop: "1rem" }} />
      <AllCompanies style={{ marginTop: "1rem" }} />
      <AllDriverApplications style={{ marginTop: "1rem" }} />
      <AllAdmins style={{ marginTop: "1rem" }} />
      <PDFViewer>
        <Purchase Companies={data.Companies} />
      </PDFViewer>
      <Download document={<Purchase Companies={data.Companies} />} filename="Purchases" />
    </div>
  );
}

export default AdminPanel;
