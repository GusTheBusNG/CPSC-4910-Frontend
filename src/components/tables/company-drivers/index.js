import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCompanyDrivers } from '../../../state/queries';
import { updateDriverAffiliation, deleteDriverAffiliation } from '../../../state/mutations';
import Button from '@material-ui/core/Button'
import ShoppingCart from '../shopping-cart'

const CompanyDrivers = ({companyId}) => {
  const { data, error, loading, refetch } = useQuery(getCompanyDrivers, { variables: { companyId } });
  const [submitUpdatedDriver] = useMutation(updateDriverAffiliation);
  const [deleteDriver] = useMutation(deleteDriverAffiliation);
  const [shoppingCartDriverId, setShoppingCartDriverId] = useState(undefined);
  const dataArray = [];

  const updateDriver = async (newData) => {
    await submitUpdatedDriver({ variables: {
      driverId: newData.driverId,
      companyId: companyId,
      relationship: newData.activeRelationship,
      points: newData.points,
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email
    }});
    await refetch();
  }

  const deleteDriverHandler = async (driver) => {
    await deleteDriver({ variables: {
      companyId: companyId,
      driverId: driver.driverId
    }})
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
      driverId: Driver.id
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
            render: ({ activeRelationship, driverId }) => activeRelationship && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShoppingCartDriverId(driverId)}
              >
                View Driver Shopping Cart
              </Button>
            )
          }
        ]}
        editable={{
          onRowUpdate: (newData) => updateDriver(newData),
          onRowDelete: (driver) => deleteDriverHandler(driver)
        }}
        data={dataArray}
        title="Drivers"
      />
      {
        shoppingCartDriverId && (
          <ShoppingCart
            style={{ margin: '1rem 5rem'}}
            driverId={shoppingCartDriverId}
            companyId={companyId}
            showCurrentPoints={false}
          />
        )
      }
    </>
  )
}

export default CompanyDrivers;
