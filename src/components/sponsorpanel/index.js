import React from 'react';
import AddCatalog from '../add-catalog';
import Catalog from '../tables/catalog';
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
              <Catalog companyId={data.Sponsors[0].Company.id} />
              <AddCatalog companyId={data.Sponsors[0].Company.id} />
            </>
          )
      }
      <p> this is a sponsor panel. </p>
    </>
  );
}

export default SponsorPanel;
