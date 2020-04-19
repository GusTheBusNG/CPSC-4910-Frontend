import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllDriverApplications, getAllDrivers, getAllCompanies } from '../../../state/queries';
import { deleteDriverApplication, updateDriverApplication, insertDriverApplication } from '../../../state/mutations';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import ShoppingCart from '../shopping-cart';

import handleError, { ALL_DRIVER_APPLICATIONS } from '../error/handle';

const AllDriverApplications = props => {
  const refetchQueries = { refetchQueries: [
    { query: getAllDriverApplications },
    { query: getAllDrivers },
    { query: getAllCompanies }
  ]};
  const [deleteDriverApplicationAction, { error: deleteError }] = useMutation(deleteDriverApplication, refetchQueries);
  const [insertDriverApplicationAction, { error: insertError }] = useMutation(insertDriverApplication, refetchQueries);
  const [updateDriverApplicationAction, { error: updateError }] = useMutation(updateDriverApplication, refetchQueries);
  const { loading, error, data, refetch } = useQuery(getAllDriverApplications);
  const { data: allDrivers } = useQuery(getAllDrivers);
  const { data: allCompanies } = useQuery(getAllCompanies);

  const [shoppingCartData, setShoppingCartData] = useState({ });

  const errors = { get: error, insert: insertError, update: updateError, delete: deleteError };
  const errorResponse = handleError({ error: errors, refetch, messages: ALL_DRIVER_APPLICATIONS });
  if (errorResponse) return errorResponse;

  return (
    <>
      <Table
        loading={loading}
        columns={[
          { title: "Driver ID", field: "userId", type: "numeric", editable: "never" },
          {
            title: "Driver Email",
            field: "driverEmail",
            editable: "onAdd",
            editComponent: props => (
              <>
                <Select
                  value={props.value || ''}
                  onChange={e => props.onChange(e.target.value)}
                >
                  {
                    allDrivers && allDrivers.Drivers.map(
                      ({ id, User: { email } }) => (
                        <MenuItem key={email} value={id}>{email}</MenuItem>
                      ))
                  }
                </Select>
                <FormHelperText>Required</FormHelperText>
              </>
            )
          },
          { title: "Company ID", field: "companyId", type: "numeric", editable: "never" },
          {
            title: "Company Name",
            field: "companyName",
            editable: "onAdd",
            editComponent: props => (
              <>
                <Select
                  value={props.value || ''}
                  onChange={e => props.onChange(e.target.value)}
                >
                  {
                    allCompanies && allCompanies.Companies.map(
                      ({ id, name }) => (
                        <MenuItem key={name} value={id}>{name}</MenuItem>
                      ))
                  }
                </Select>
                <FormHelperText>Required</FormHelperText>
              </>
            )
          },
          { title: "Application accepted", field: "applicationAccepted", type: "boolean"},
          {
            title: "View Driver Shopping Cart",
            render: ({ applicationAccepted, driverId, companyId, userId }) => applicationAccepted && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShoppingCartData({ driverId, companyId, userId })}
              >
                View Driver Shopping Cart
              </Button>
            )
          },
          { title: "Points", field: "points" }
        ]}
        data={data && data.DriverCompanies.map(({
            activeRelationship: applicationAccepted,
            points,
            Company: {
              name: companyName,
              id: companyId
            },
            Driver: {
              id: driverId,
              User: {
                email: driverEmail,
                id: userId
              }
            }
          }) => ({
            driverId,
            userId,
            driverEmail,
            companyId,
            companyName,
            points,
            applicationAccepted
          }))
        }
        title="Driver Applications"
        editable={{
          onRowAdd: ({
            driverEmail: driverId,
            companyName: companyId,
            points,
            applicationAccepted
          }) => insertDriverApplicationAction(
            { variables: { driverId, companyId, points, applicationAccepted }}
          ),
          onRowUpdate: ({ userId, companyId, points, applicationAccepted }) =>
            updateDriverApplicationAction(
              { variables: { userId, companyId, points, applicationAccepted }}
            ),
          onRowDelete: ({ userId, companyId }) =>
            deleteDriverApplicationAction(
              { variables: { userId, companyId }}
            )
        }}
        {...props}
      />
      {
        shoppingCartData && shoppingCartData.driverId && (
          <ShoppingCart
            style={{ margin: '1rem 5rem'}}
            companyId={shoppingCartData.companyId}
            driverId={shoppingCartData.driverId}
            userId={shoppingCartData.userId}
            showCurrentPoints={false}
          />
        )
      }
    </>
  );
}

export default AllDriverApplications;
