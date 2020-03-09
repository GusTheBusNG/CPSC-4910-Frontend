import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllAdmins } from '../../../state/queries';
import { deleteAdmin, insertAdmin, updateAdmin } from '../../../state/mutations';

const AllAdmins = (props) => {
  const [deleteAdminAction] = useMutation(deleteAdmin);
  const [insertAdminAction] = useMutation(insertAdmin);
  const [updateAdminAction] = useMutation(updateAdmin);

  const { loading, error, data, refetch } = useQuery(getAllAdmins);

  if (error) return <p>Error</p>;

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
        onRowAdd: newData => insertAdminAction({ variables: { ...newData }})
          .then(() => refetch()),
        onRowUpdate: ({ __typename, ...newData}) => updateAdminAction({ variables: { ...newData }})
          .then(() => refetch()),
        onRowDelete: ({ id }) => deleteAdminAction({ variables: { id }})
          .then(() => refetch())
      }}
      title="Admins"
      {...props}
    />
  );
}

export default AllAdmins;
