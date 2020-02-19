import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllDrivers } from '../../state/queries';
import { deleteDriver } from '../../state/mutations';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';


const AdminPanel = () => {
  const { loading, error, data } = useQuery(getAllDrivers);
  const [deleteDriverAction] = useMutation(deleteDriver);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>😢 Error</p>;

  return (
    <div style={{ maxWidth: "98%", margin: "0 auto" }}>
      <Table
        columns={[
          { title: "ID", field: "id", type: "numeric" },
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Password", field: "password" },
          { title: "Description", field: "description" },
          { title: "Companies - Points", field: "companies"}
        ]}
        data={data.Users.map(driver => ({
          id: driver.id,
          firstName: driver.firstName,
          lastName: driver.lastName,
          email: driver.email,
          password: driver.password,
          description: driver.Driver.description,
          companies: driver.Driver.DriverCompanies.map(
            company => `${company.Company.name} - ${company.points}\n`
          )
        }))}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
        title="Drivers"
      />
    </div>
  );
}

export default AdminPanel;
