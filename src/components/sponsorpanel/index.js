import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

import AddCatalog from '../add-catalog';
import Catalog from '../tables/catalog';
import CompanyDrivers from '../tables/company-drivers'
import CompanySponsors from '../tables/company-sponsors'
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
  const [view, changeView] = useState('drivers');
  if (error || !data) return <></>;

  const companyId = data.Sponsors[0].Company.id;

  const setBody = () => {
    if (view === "drivers") {
      return <CompanyDrivers companyId={companyId} />;
    }
    else if (view === "catalog") {
      return (
      <>
        <PointToDollar companyId={companyId} />
        <Catalog companyId={companyId} />
        <AddCatalog companyId={companyId} />
      </>)
    }
    else {
      return (
        <CompanySponsors companyId={companyId} companyName={data.Sponsors[0].Company.name}/>
      )
    }
  }

  return (
    <Card>
    <Card.Header>
      <Nav fill variant="tabs" defaultActiveKey="#drivers">
        <Nav.Item>
          <Nav.Link
            href="#drivers"
            onClick={() => changeView("drivers")}>
              Drivers
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#catalog"
            onClick={() => changeView("catalog")}>
              Catalog
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#company"
            onClick={() => changeView('company')}>
              Company
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Card.Header>
    <Card.Body>
      {setBody()}
      {reportData && (
        <>
          <PDFViewer>
            <SponsorReport Companies={reportData.Companies} />
          </PDFViewer>
          <Download document={<SponsorReport Companies={reportData.Companies} />} filename="Driver-Purchases" />
        </>
      )}
    </Card.Body>
    </Card>
  );
}

export default SponsorPanel;
