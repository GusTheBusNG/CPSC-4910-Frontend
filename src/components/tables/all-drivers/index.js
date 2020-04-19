import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllDrivers } from '../../../state/queries';
import { deleteDriver, insertDriver, updateDriver } from '../../../state/mutations';

import handleError, { ALL_DRIVERS } from '../error/handle'

const AllDrivers = props => {
  const refetchQueries = { refetchQueries: [{ query: getAllDrivers }] };
  const [deleteDriverAction, { error: deleteError }] = useMutation(deleteDriver, refetchQueries);
  const [insertDriverAction, { error: insertError }] = useMutation(insertDriver, refetchQueries);
  const [updateDriverAction, { error: updateError }] = useMutation(updateDriver, refetchQueries);
  const { loading, error, data, refetch } = useQuery(getAllDrivers);

  const errors = { get: error, insert: insertError, update: updateError, delete: deleteError };
  const errorResponse = handleError({ error: errors, refetch, messages: ALL_DRIVERS });
  if (errorResponse) return errorResponse;

  return (
    <Table
      loading={loading}
      columns={[
        { title: "ID", field: "id", type: "numeric", editable: "never" },
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Email", field: "email" },
        { title: "Password", field: "password" },
        { title: "Description", field: "description" },
      ]}
      data={data && data.Drivers.map(driver => ({
        id: driver.User.id,
        firstName: driver.User.firstName,
        lastName: driver.User.lastName,
        email: driver.User.email,
        password: driver.User.password,
        description: driver.description
      }))}
      editable={{
        onRowAdd: newData => insertDriverAction({ variables: { ...newData }}),
        onRowUpdate: newData => updateDriverAction({ variables: { ...newData }}),
        onRowDelete: ({ id }) => deleteDriverAction({ variables: { id }})
      }}
      title="Drivers"
      {...props}
    />
  );
}

export default AllDrivers;
