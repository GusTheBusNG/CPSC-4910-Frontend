import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getShoppingCartPerDriver, getPoints } from '../../../state/queries';
import { deleteItemFromShoppingCart, updatePurchase } from '../../../state/mutations';
import Button from '@material-ui/core/Button';

const ShoppingCart = ({ companyId, driverId, showCurrentPoints, ...props }) => {
  const { data, loading, refetch } = useQuery(getShoppingCartPerDriver, { variables: { driverId, companyId }})
  const { data: dataPoints, refetch: refetchPoints } = useQuery(getPoints, { variables: { companyId, driverId }});
  const [deleteItem] = useMutation(deleteItemFromShoppingCart)
  const [editPurchase] = useMutation(updatePurchase);

  const currentPoints = dataPoints && dataPoints.DriverCompanies[0].points;

  const convert = ({ price, pointToDollarRatio }) => {
    const numberPrice = parseFloat(price.replace('$',''))
    return (numberPrice / pointToDollarRatio ).toFixed(2);
  }

  const tryToPurchase = async ({ productId, points }) => {
    if (!dataPoints) return alert('Something is still loading, please refresh the page and try again');
    if (currentPoints < points) return alert('You do not have enough points to buy this item');

    await editPurchase({
      variables: {
        companyId,
        driverId,
        productId,
        points: (parseFloat(currentPoints) - parseFloat(points)).toFixed(2),
        completed: true
      }
    })
    refetch();
    refetchPoints();
  }

  const tryToRevertPurchase = async ({ productId, points, endTime}) => {
    if (endTime < new Date()) return alert('You cannot revert this purchase due to the deadline time');

    await editPurchase({
      variables: {
        companyId,
        driverId,
        productId,
        points: (parseFloat(currentPoints) + parseFloat(points)).toFixed(2),
        completed: false
      }
    });
    refetch();
    refetchPoints();
  }

  return (
    <>
      {
        showCurrentPoints && <h2 style={{ margin: '1rem'}}>You have {currentPoints} points</h2>
      }
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
          {
            title: "Purchase",
            field: "purchase",
            render: ({ id: productId, price: points, completed, endTime }) => <Button
                            variant="contained"
                            color="primary"
                            onClick={() => completed ?
                                tryToRevertPurchase({ productId, points, endTime }) :
                                tryToPurchase({ productId, points })}
                          >
                            {completed ? 'Revert Purchase' : 'Purchase Item'}
                          </Button>
          },
          { title: "Deadline", field: "endTime", type: "datetime" },
          { title: "Added at", field: "created_at", type: "datetime" },
          { title: "Updated at", field: "updated_at", type: "datetime"}
        ]}
        data={data &&
          data.ShoppingCart.map(
            ({ Product, Company: { pointToDollarRatio }, ...everythingElse}) => (
              { 
                ...Product,
                price: convert({ price: Product.price, pointToDollarRatio}),
                ...everythingElse
              }
            )
          )}
        editable={{
          isDeletable: ({ completed }) => !completed,
          onRowDelete: ({ id }) => deleteItem({ variables: { companyId, driverId, productId: id }})
            .then(() => refetch())
        }}
        title="Your Shopping Cart"
        {...props}
      />
    </>
  )
}

ShoppingCart.defaultProps = {
  showCurrentPoints: true
}

export default ShoppingCart;