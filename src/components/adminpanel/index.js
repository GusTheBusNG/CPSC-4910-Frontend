import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllDrivers } from '../../state/queries';
import { deleteDriver, insertDriver, updateDriver } from '../../state/mutations';

const AdminPanel = () => {
  const [deleteDriverAction] = useMutation(deleteDriver, {
    update(cache, { data: { delete_Users: { returning } } }) {
      const { Drivers } = cache.readQuery({ query: getAllDrivers });
      cache.writeQuery({
        query: getAllDrivers,
        data: { Drivers: Drivers.filter(({ User: { id } }) => id !== returning[0].id)}
      })
    }
  });
  const [insertDriverAction] = useMutation(insertDriver, {
    update(cache, { data: { insert_Drivers: { returning } } }) {
      const { Drivers } = cache.readQuery({ query: getAllDrivers });
      cache.writeQuery({
        query: getAllDrivers,
        data: { Drivers: Drivers.concat(returning) },
      });
    }
  });
  const [updateDriverAction] = useMutation(updateDriver, {
    update(cache, { data: { update_Drivers, update_Users } }) {
      const newDriver = update_Drivers.returning[0];
      const newUser = update_Users.returning[0];
      const { Drivers } = cache.readQuery({ query: getAllDrivers });
      cache.writeQuery({
        query: getAllDrivers,
        data: {
          Drivers: Drivers.map(driver =>
            driver.User.id === newUser.id ?
              {
                description: newDriver.description,
                User: { ...newUser },
              } : driver
          )
        }
      })
    }
  });

  const { loading, error, data } = useQuery(getAllDrivers);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div style={{ maxWidth: "98%", margin: "1rem auto" }}>
      <Table
        columns={[
          { title: "ID", field: "id", type: "numeric", editable: "never" },
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Password", field: "password" },
          { title: "Description", field: "description" },
        ]}
        data={data.Drivers.map(driver => ({
          id: driver.User.id,
          firstName: driver.User.firstName,
          lastName: driver.User.lastName,
          email: driver.User.email,
          password: driver.User.password,
          description: driver.description
        }))}
        editable={{
          onRowAdd: newData => insertDriverAction({ variables: { ...newData }}),
          onRowUpdate: (newData) => updateDriverAction({ variables: { ...newData }}),
          onRowDelete: ({ id }) => deleteDriverAction({ variables: { id }})
        }}
        title="Drivers"
      />
    </div>
  );
}

export default AdminPanel;
