import React from 'react';
import AddCatalog from '../add-catalog';
import Catalog from '../tables/catalog';
import CompanyDrivers from '../tables/company-drivers'
import PointToDollar from '../point-to-dollar-form'
import { useQuery } from '@apollo/react-hooks';
import { getCompany } from '../../state/queries';

const SponsorPanel = props => {
  const { id: sponsorId } = props;
  const { data, error } = useQuery(getCompany, { variables: { sponsorId } });

  return (
    <>
      {
        !error && data &&
          (
            <>
              <PointToDollar companyId={data.Sponsors[0].Company.id} />
              <Catalog companyId={data.Sponsors[0].Company.id} />
              <AddCatalog companyId={data.Sponsors[0].Company.id} />
              <CompanyDrivers companyId={data.Sponsors[0].Company.id} />
            </>
          )
      }
    </>
  );
}

export default SponsorPanel;
