import React, { useEffect, useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCatalog, getShoppingCartPerDriver } from '../../../state/queries';
import { addItemToShoppingCart } from '../../../state/mutations';
import Button from '@material-ui/core/Button';

const DriverCatalog = props => {
  const { companyId, name, driverId } = props;
  const [addItem] = useMutation(addItemToShoppingCart);
  const { data: shoppingCart, refetch } = useQuery(getShoppingCartPerDriver, { variables: { companyId, driverId }})
  const { data, loading } = useQuery(getCatalog, { variables: { companyId }})
  const [items, setItems] = useState([]);
  const [convertedPrice, setConvertedPrice] = useState(false);

  if (!convertedPrice && data) {
    data.Catalog.forEach(({Product, Company}) => {
      const price = parseFloat(Product.price.replace('$',''))
      Product.price = (price / Company.pointToDollarRatio ).toFixed(2);
    })
    setConvertedPrice(true);
  }

  useEffect(() => {
    if (data === undefined || shoppingCart === undefined) return ;

    setItems(data.Catalog.filter(({ Product }) => {
      let isNotInShoppingCart = true;

      shoppingCart.ShoppingCart.forEach(({ Product: { id }}) => {
        if (id === Product.id) {
          isNotInShoppingCart = false;
          return ;
        }
      });

      return isNotInShoppingCart;
    }))
  }, [data, shoppingCart])

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
        {
          title: "Add To Shopping Cart",
          field: "shoppingCart",
          render: ({ id: productId }) => <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addItem({
                            variables: {
                              productId,
                              companyId,
                              driverId
                            }
                          }).then(() => refetch())}
                        >
                          Add To Your Shopping Cart
                        </Button>
        }
      ]}
      data={items && items.map(({ Product }) => ({ ...Product }))}
      title={name + " Catalog"}
      {...props}
    />
  );
}

export default DriverCatalog;
