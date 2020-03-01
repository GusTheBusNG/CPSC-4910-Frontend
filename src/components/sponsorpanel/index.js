import React from 'react';
import AddCatalog from '../add-catalog';
import { useQuery } from '@apollo/react-hooks';
import { getCompany } from '../../state/queries';

const SponsorPanel = props => {
  const { id: sponsorId } = props;
  const { data, error } = useQuery(getCompany, { variables: { sponsorId } });

  return (
    <>
      { !error && <AddCatalog companyId={data && data.Sponsors[0].Company.id} /> }
      <p> this is a sponsor panel. </p>
    </>
  );
}

export default SponsorPanel;
