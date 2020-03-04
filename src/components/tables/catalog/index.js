import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { deleteItemFromCatalog } from '../../../state/mutations';
import { getCatalog } from '../../../state/queries';

const Catalog = props => {
  const { companyId } = props;
  const { data, loading, refetch } = useQuery(getCatalog, { variables: { companyId }})
  const [deleteItemFromCatalogAction] = useMutation(deleteItemFromCatalog);
  
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
      title="Your Catalog"
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
