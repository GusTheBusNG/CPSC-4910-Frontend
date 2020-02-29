import React from 'react';
import Table from '../table';

const AddCatalog = props => {
  const { ebayResponse, loading } = props;

  return (
    <Table
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
          field: "ebayLink",
          render: ({ ebayLink }) => <a href={ebayLink}>View Item</a>
        },
        { title: "Price", field: "price", type: "currency" },
        { title: "End Time", field: "endTime", type: "datetime" },
      ]}
      data={ebayResponse && ebayResponse.ebayResponse}
      title="Add To Your Catalog"
      {...props}
    />
  );
}

export default AddCatalog;
