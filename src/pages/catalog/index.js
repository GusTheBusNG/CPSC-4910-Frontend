import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { decrypt } from '../../state/crypto';
import AddCatalog from '../../components/add-catalog';
import CatalogTable from '../../components/tables/catalog';
import DriverCatalog from '../../components/tables/driver-catalog'
import ShoppingCart from '../../components/tables/shopping-cart';

const Catalog = props => {
  const session = localStorage.getItem('session');

  if (!props.location || !props.location.state) return <Redirect to='/dashboard' />;
  if (!session) return <Redirect to='/login' />;

  const { companyId, name } = props.location.state;
  const decrypted = decrypt(session.toString());
  const role = decrypted.split('.')[1];
  const id = decrypted.split('.')[2];

  switch(role) {
    case 'Admin':
      return (
        <Fragment>
          <AddCatalog companyId={companyId} name={name} />
          <CatalogTable companyId={companyId} name={name} />
        </Fragment>
      );
    case 'Driver':
      return (
        <Fragment>
          <DriverCatalog
            companyId={companyId}
            name={name}
            driverId={id}
          />
          <ShoppingCart
            companyId={companyId}
            name={name}
            driverId={id}
          />
        </Fragment>
      )
    default:
      return <Redirect to='/dashboard' />;
  }
}

export default Catalog;
