import React from 'react';

import DriverCatalog from '../../components/tables/driver-catalog'

import {
  withRouter
} from 'react-router-dom'

const CatalogView = (props) => {
  if (props.location.state) {
    const {companyId, name} = props.location.state

    return <DriverCatalog companyId={companyId} name={name}/>;
  }
  return <p> Error. Please access catalogs through your dashboard. </p>
}

export default withRouter(CatalogView);
