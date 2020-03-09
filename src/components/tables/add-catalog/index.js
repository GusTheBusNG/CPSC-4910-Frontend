import React, { useState, useEffect } from 'react';
import Table from '../table';
import AddBox from '@material-ui/icons/AddBox';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { insertProductToCatalog } from '../../../state/mutations';
import { getCatalog } from '../../../state/queries';

const AddCatalog = props => {
  const { ebayResponse, loading, companyId, name } = props;
  const { data, refetch } = useQuery(getCatalog, { variables: { companyId }})
  const [canAddItems, setCanAddItems] = useState([]);
  const [insertProductToCatalogAction] = useMutation(insertProductToCatalog)

  useEffect(() => {
    if (data === undefined || ebayResponse === undefined) return ;

    setCanAddItems(ebayResponse.ebayResponse.filter(({ ebayLink }) => {
      let isNotInCatalog = true
      data.Catalog.forEach(({ Product: { link: offeredLink } }) => {
        if (ebayLink === offeredLink) {
          isNotInCatalog = false;
          return ;
        }
      });
      return isNotInCatalog;
    }))
  }, [ebayResponse, data])
  
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
      data={canAddItems}
      title={name ? `Add to ${name}'s catalog` : 'Add to your catalog'}
      actions={[
        {
          icon: (props) => <AddBox {...props} />,
          tooltip: 'Save Item',
          onClick: (event, { endTime, ebayLink, photo, price, title }) => insertProductToCatalogAction({
            variables: { companyId, endTime, ebayLink, photo, price, title }
          }).then(() => refetch({ companyId }))
        }
      ]}
      {...props}
    />
  );
}

export default AddCatalog;
