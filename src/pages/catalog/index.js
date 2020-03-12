import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { decrypt } from '../../state/crypto';
import AddCatalog from '../../components/add-catalog';
import CatalogTable from '../../components/tables/catalog';
import DriverCatalog from '../../components/tables/driver-catalog'

const Catalog = props => {
  const session = localStorage.getItem('session');

  if (!props.location || !props.location.state) return <Redirect to='/dashboard' />;
  if (!session) return <Redirect to='/login' />;

  const { companyId, name } = props.location.state;
  const decrypted = decrypt(session.toString());
  const role = decrypted.split('.')[1];

  switch(role) {
    case 'Admin':
      return (
        <Fragment>
          <AddCatalog companyId={companyId} name={name} />
          <CatalogTable companyId={companyId} name={name} />
        </Fragment>
      );
    case 'Driver':
      return <DriverCatalog companyId={companyId} name={name}/>;
    default:
      return <Redirect to='/dashboard' />;
  }
}

export default Catalog;
