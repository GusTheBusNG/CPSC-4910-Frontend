import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllDriverApplications, getAllDrivers, getAllCompanies } from '../../../state/queries';
import { deleteDriverApplication, updateDriverApplication, insertDriverApplication } from '../../../state/mutations';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

const AllDriverApplications = (props) => {
  const [deleteDriverApplicationAction] = useMutation(deleteDriverApplication, {
    update(cache, { data: { delete_DriverCompanies } }) {
      const deletedCompanyId = delete_DriverCompanies.returning[0].companyId;
      const deletedUserId = delete_DriverCompanies.returning[0].Driver.userId;
      const { DriverCompanies } = cache.readQuery({ query: getAllDriverApplications });
      cache.writeQuery({
        query: getAllDriverApplications,
        data: { DriverCompanies: DriverCompanies.filter(({
          Company: {
            companyId
          },
          Driver: {
            User: {
              id: userId
            }
          }
        }) => companyId !== deletedCompanyId && userId !== deletedUserId)}
      });
    }
  });
  const [insertDriverApplicationAction] = useMutation(insertDriverApplication, {
    update(cache, { data: { insert_DriverCompanies: { returning }} }) {
      const { DriverCompanies } = cache.readQuery({ query: getAllDriverApplications });
      cache.writeQuery({
        query: getAllDriverApplications,
        data: { DriverCompanies: DriverCompanies.concat(returning) },
      });
    }
  });
  const [updateDriverApplicationAction] = useMutation(updateDriverApplication, {
    update(cache, { data: { update_DriverCompanies: { returning } } }) {
      const updatedApplication = returning[0];
      const { DriverCompanies } = cache.readQuery({ query: getAllDriverApplications });
      cache.writeQuery({
        query: getAllDriverApplications,
        data: {
          DriverCompanies: DriverCompanies.map(application => {
            if (application.Driver.User.id === updatedApplication.Driver.User.id &&
                application.Company.id === updatedApplication.Company.id) {
              return updatedApplication;
            }
            return application;
          })
        }
      });
    }
  });

  const { loading, error, data } = useQuery(getAllDriverApplications);
  const { data: allDrivers } = useQuery(getAllDrivers);
  const { data: allCompanies } = useQuery(getAllCompanies);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Table
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
          { title: "Points", field: "points" }
        ]}
        data={data.DriverCompanies.map(({
            activeRelationship: applicationAccepted,
            points,
            Company: {
              name: companyName,
              id: companyId
            },
            Driver: {
              User: {
                email: driverEmail,
                id: userId
              }
            }
          }) => ({
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
    </>
  );
}

export default AllDriverApplications;
