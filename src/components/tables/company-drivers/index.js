import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCompanyDrivers } from '../../../state/queries';
import { updateDriverAffiliation, deleteDriverAffiliation } from '../../../state/mutations';

const CompanyDrivers = ({companyId}) => {
  const { data, error, loading, refetch } = useQuery(getCompanyDrivers, { variables: { companyId } });
  const [submitUpdatedDriver] = useMutation(updateDriverAffiliation);
  const [deleteDriver] = useMutation(deleteDriverAffiliation);
  const dataArray = [];

  const updateDriver = async (newData) => {
    await submitUpdatedDriver({ variables: {
      driverId: newData.driverId,
      companyId: companyId,
      relationship: newData.activeRelationship,
      points: newData.points
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

  return <Table
    columns={[
      { title: "Relationship", field: "activeRelationship", lookup: { true: "Active", false: "Pending" }},
      { title: "First Name", field: "firstName", editable: "never"},
      { title: "Last Name", field: "lastName", editable: "never" },
      { title: "Email", field: "email", editable: "never" },
      { title: "Points", field: "points" },
    ]}
    editable={{
      onRowUpdate: (newData) => updateDriver(newData),
      onRowDelete: (driver) => deleteDriverHandler(driver)

    }}
    data={dataArray}
    title="Drivers"
  />
}

export default CompanyDrivers;
