import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCompanyDrivers } from '../../../state/queries';
import { updateDriverAffiliation, deleteDriverAffiliation, insertNotification } from '../../../state/mutations';

const CompanyDrivers = ({companyId}) => {
  const { data, error, loading, refetch } = useQuery(getCompanyDrivers, { variables: { companyId } });
  const [submitUpdatedDriver, {error: submitError}] = useMutation(updateDriverAffiliation);
  const [submitNotification] = useMutation(insertNotification);
  const [deleteDriver, {error: deleteError}] = useMutation(deleteDriverAffiliation);
  const dataArray = [];

  const updateDriver = async (newData) => {
    const index = data.Sponsors[0].Company.DriverCompanies.findIndex(x => x.Driver.id === newData.driverId)
    const oldData = data.Sponsors[0].Company.DriverCompanies[index]
    const companyName = data.Sponsors[0].Company.name
    let message = ""

    if (oldData.activeRelationship !== newData.activeRelationship) {
      message += ((newData.activeRelationship === 'true') ? (companyName + " accepted your application.\n") : (companyName + " revoked your affiliation.\n"))
    }

    if (oldData.points !== newData.points) {
      message += companyName + " added " + String((newData.points - oldData.points).toFixed(2)) + " points to your account."
    }

    await submitUpdatedDriver({ variables: {
      driverId: newData.driverId,
      userId: newData.userId,
      companyId: companyId,
      relationship: newData.activeRelationship,
      points: newData.points
    }});

    if (!submitError && message !== "") {
      await submitNotification({
        variables: {
          userId: newData.userId,
          message: message,
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
