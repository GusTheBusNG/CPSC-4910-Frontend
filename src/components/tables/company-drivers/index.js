import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCompanyDrivers } from '../../../state/queries';
import { updateDriverAffiliation, deleteDriverAffiliation, insertNotification } from '../../../state/mutations';
import Button from '@material-ui/core/Button'
import ShoppingCart from '../shopping-cart'

const CompanyDrivers = ({companyId}) => {
  const { data, error, loading, refetch } = useQuery(getCompanyDrivers, { variables: { companyId } });
  const [submitUpdatedDriver, {error: submitError}] = useMutation(updateDriverAffiliation);
  const [submitNotification] = useMutation(insertNotification);
  const [deleteDriver, {error: deleteError}] = useMutation(deleteDriverAffiliation);
  const [shoppingCartData, setShoppingCartData] = useState({ });
  const dataArray = [];

  const updateDriver = async (newData, oldData) => {
    const companyName = data.Sponsors[0].Company.name
    let affiliationMessage = ""
    let pointMessage = ""

    if (oldData.activeRelationship !== newData.activeRelationship) {
      if (newData.activeRelationship === "true") {
        affiliationMessage += `${companyName} accepted your application.\n`
      } else {
        affiliationMessage += `${companyName} revoked your affiliation.\n`
      }
    }

    if (oldData.points !== newData.points) {
      let pointDifference = (newData.points - oldData.points).toFixed(0)
      pointMessage += `${companyName} added ${pointDifference} points to your account.`
    }

    await submitUpdatedDriver({ variables: {
      driverId: newData.driverId,
      companyId: companyId,
      relationship: newData.activeRelationship,
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
      points: parseFloat(newData.points).toFixed(0)
    }});

    if (!submitError && affiliationMessage !== "") {
      await submitNotification({
        variables: {
          userId: newData.userId,
          message: affiliationMessage,
          type: "affiliation"
        }
      })
    }
    if (!submitError && pointMessage !== "") {
      await submitNotification({
        variables: {
          userId: newData.userId,
          message: pointMessage,
          type: "points"
        }
      })
    }
    await refetch();
  }

  const deleteDriverHandler = async (driver) => {
    await deleteDriver({ variables: {
      companyId: companyId,
      driverId: driver.driverId
    }})

    if (!deleteError) {
      await submitNotification({
        variables: {
          userId: driver.userId,
          message: data.Sponsors[0].Company.name + " revoked your affiliation.",
          type: "affiliation"
        }
      })
    }
    await refetch();
  }

  if (error) return <p> error </p>
  if (loading) return <p> loading </p>

  data.Sponsors[0].Company.DriverCompanies.forEach(({activeRelationship, points, Driver }) => (
    dataArray.push(
      {
      activeRelationship: activeRelationship,
      email: Driver.User.email,
      firstName: Driver.User.firstName,
      lastName: Driver.User.lastName,
      points: points,
      driverId: Driver.id,
      userId: Driver.User.id
      })
  ))

  return (
    <>
      <Table
        style={{ margin: '1rem' }}
        columns={[
          { title: "Relationship", field: "activeRelationship", lookup: { true: "Active", false: "Pending" }},
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Points", field: "points" },
          {
            title: "View Shopping Cart",
            render: ({ activeRelationship, driverId, userId }) => activeRelationship && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShoppingCartData({ driverId, userId })}
              >
                View Driver Shopping Cart
              </Button>
            )
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) => updateDriver(newData, oldData),
          onRowDelete: (driver) => deleteDriverHandler(driver)
        }}
        data={dataArray}
        title="Drivers"
      />
      {
        shoppingCartData && shoppingCartData.driverId && (
          <ShoppingCart
            style={{ margin: '1rem 5rem'}}
            driverId={shoppingCartData.driverId}
            userId={shoppingCartData.userId}
            companyId={companyId}
            showCurrentPoints={false}
          />
        )
      }
    </>
  )
}

export default CompanyDrivers;
