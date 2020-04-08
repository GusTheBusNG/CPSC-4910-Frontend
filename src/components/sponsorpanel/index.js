import React from 'react';
import AddCatalog from '../add-catalog';
import Catalog from '../tables/catalog';
import CompanyDrivers from '../tables/company-drivers'
import PointToDollar from '../point-to-dollar-form'
import { useQuery } from '@apollo/react-hooks';
import { getCompany, getTransactionsPerCompany } from '../../state/queries';
import { PDFViewer } from '@react-pdf/renderer';
import Download from '../reports/download';
import SponsorReport from '../reports/purchase';

const SponsorPanel = props => {
  const { id: sponsorId } = props;
  const { data, error } = useQuery(getCompany, { variables: { sponsorId } });
  const { data: reportData } = useQuery(getTransactionsPerCompany, { variables: { sponsorId }});

  if (error || !data) return <></>;

  const companyId = data.Sponsors[0].Company.id;

  return (
    <>
      <PointToDollar companyId={companyId} />
      <Catalog companyId={companyId} />
      <AddCatalog companyId={companyId} />
      <CompanyDrivers companyId={companyId} />
      {reportData && (
        <>
          <PDFViewer>
            <SponsorReport Companies={reportData.Companies} />
          </PDFViewer>
          <Download document={<SponsorReport Companies={reportData.Companies} />} filename="Driver-Purchases" />
        </>
      )}
    </>
  );
}

export default SponsorPanel;
