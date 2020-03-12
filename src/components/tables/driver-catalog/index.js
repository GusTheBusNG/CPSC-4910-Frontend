import React from 'react';
import Table from '../table';
import { useQuery } from '@apollo/react-hooks';
import { getCatalog } from '../../../state/queries';

const DriverCatalog = props => {
  const { companyId, name } = props;
  const { data, loading } = useQuery(getCatalog, { variables: { companyId }})
  if (data) {
    data.Catalog.forEach(({Product, Company}) => {
      const price = parseFloat(Product.price.replace('$',''))
      Product.price = (Company.pointToDollarRatio * price).toFixed(2);
    })
  }
  return (
    <Table
      style={{ margin: '1rem' }}
      loading={loading}
      columns={[
        {
          title: "Photo",
          field: "photo",
          render: ({ photo, title }) => <img src={photo} alt={title} className="add-catalog-image" />
        },
        { title: "Title", field: "title" },
        {
          title: "Link",
          field: "link",
          render: ({ ebayLink }) => <a href={ebayLink}>View Item</a>
        },
        { title: "Price (Points)", field: "price", type: "numeric" },
        { title: "End Time", field: "endTime", type: "datetime" },
      ]}
      data={data && data.Catalog.map(({ Product }) => ({ ...Product }))}
      title={name + " Catalog"}
      {...props}
    />
  );
}

export default DriverCatalog;
