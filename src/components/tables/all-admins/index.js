import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllAdmins } from '../../../state/queries';
import { deleteAdmin, insertAdmin, updateAdmin } from '../../../state/mutations';
import handleError, { ALL_ADMINS } from '../error/handle';

const AllAdmins = (props) => {
  const refetchQueries = { refetchQueries: [{ query: getAllAdmins }] };
  const [deleteAdminAction, { error: deleteError }] = useMutation(deleteAdmin, refetchQueries);
  const [insertAdminAction, { error: insertError }] = useMutation(insertAdmin, refetchQueries);
  const [updateAdminAction, { error: updateError }] = useMutation(updateAdmin, refetchQueries);

  const { loading, error, data, refetch } = useQuery(getAllAdmins);

  const errors = { get: error, insert: insertError, update: updateError, delete: deleteError };
  const errorResponse = handleError({ error: errors, refetch, messages: ALL_ADMINS });
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
      ]}
      data={data && data.Users}
      editable={{
        onRowAdd: newData => insertAdminAction({ variables: { ...newData }}),
        onRowUpdate: ({ __typename, ...newData}) => updateAdminAction({ variables: { ...newData }}),
        onRowDelete: ({ id }) => deleteAdminAction({ variables: { id }})
      }}
      title="Admins"
      {...props}
    />
  );
}

export default AllAdmins;
