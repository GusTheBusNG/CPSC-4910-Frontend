import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getShoppingCartPerDriver } from '../../../state/queries';
import { deleteItemFromShoppingCart } from '../../../state/mutations';

const ShoppingCart = ({ companyId, driverId, ...props }) => {
  const { data, loading, refetch } = useQuery(getShoppingCartPerDriver, { variables: { driverId, companyId }})
  const [deleteItem] = useMutation(deleteItemFromShoppingCart)

  data && data.ShoppingCart.forEach(({Product, Company}) => {
    const price = parseFloat(Product.price.replace('$',''))
    Product.price = (price / Company.pointToDollarRatio ).toFixed(2);
  })

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
        { title: "Purchased", field: "completed", type: "boolean" },
        { title: "Deadline", field: "endTime", type: "datetime" },
        { title: "Added at", field: "created_at", type: "datetime" },
        { title: "Updated at", field: "updated_at", type: "datetime"}
      ]}
      data={data && data.ShoppingCart.map(({ Product, ...everythingElse}) => ({ ...Product, ...everythingElse}))}
      editable={{
        onRowDelete: ({ id }) => deleteItem({ variables: { companyId, driverId, productId: id }})
          .then(() => refetch())
      }}
      title="Your Shopping Cart"
      {...props}
    />
  )
}

export default ShoppingCart;