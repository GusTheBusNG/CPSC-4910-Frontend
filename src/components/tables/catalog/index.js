import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { deleteItemFromCatalog } from '../../../state/mutations';
import { getCatalog } from '../../../state/queries';

const Catalog = props => {
  const { companyId, name } = props;
  const { data, loading, refetch } = useQuery(getCatalog, { variables: { companyId }})
  const [deleteItemFromCatalogAction] = useMutation(deleteItemFromCatalog);

  const date = new Date();
  const timestamp = date.toISOString();

  setTimeout( function(){ if(data) {
    for(let i = 0; i < data.Catalog.length; i++) {
      if(data.Catalog[i].Product.endTime <= timestamp) {
        deleteItemFromCatalogAction({variables: { productId: data.Catalog[i].Product.id, companyId }})
      }
    }
  }}, 3000);
  
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
        { title: "Price", field: "price", type: "numeric" },
        { title: "End Time", field: "endTime", type: "datetime" },
      ]}
      data={data && data.Catalog.map(({ Product }) => ({ ...Product }))}
      title={name ? `${name}'s catalog` : 'Your catalog'}
      editable={{
        onRowDelete: ({ id }) => deleteItemFromCatalogAction({
          variables: {
            productId: id, companyId
          }
        }).then(() => refetch({ companyId }))
      }}
      {...props}
    />
  );
}

export default Catalog;
