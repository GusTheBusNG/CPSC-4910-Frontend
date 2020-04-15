import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { fetchCompanySponsors } from '../../../state/queries';
import { updateCompanySponsor, deleteSponsor, addSponsorToCompany } from '../../../state/mutations'

const CompanySponsors = (props) => {
  const { loading, error, data, refetch } = useQuery(fetchCompanySponsors, {
    variables:
    { id: props.companyId }
  });
  const [submitUpdatedSponsor] = useMutation(updateCompanySponsor)
  const [deleteCompanySponsor] = useMutation(deleteSponsor)
  const [insertSponsor] = useMutation(addSponsorToCompany)
  const dataArray = [];


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  data.Companies[0].Sponsors.map(sponsor => ((
    dataArray.push({
      id: sponsor.User.id,
      firstName: sponsor.User.firstName,
      lastName: sponsor.User.lastName,
      email: sponsor.User.email,
      isActive: sponsor.User.isActive,
      password: sponsor.User.password
    })
  )))

  const updateSponsor = async (newData) => {
    await submitUpdatedSponsor({variables: {
      id: newData.id,
      email: newData.email,
      password: newData.password,
      firstName: newData.firstName,
      isActive: newData.isActive,
      lastName: newData.lastName
    }})
    await refetch()
  }

  const addSponsor = async (newData) => {
    await insertSponsor({variables: {
      companyId: props.companyId,
      email: newData.email,
      firstName: newData.firstName,
      lastName: newData.lastName,
      password: newData.password
    }})
    await refetch()
  }

  const deleteSponsorFromDatabase = async (id) => {
    await deleteCompanySponsor({ variables: { id }})
    refetch()
  }
  return (
    <>
      <Table
        columns={[
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Password", field: "password" },
          { title: "Status", field: "isActive", lookup: { true: "Active", false: "Inactive" } },
        ]}
        data={dataArray}
        editable={{
          onRowAdd: newData => addSponsor(newData),
          onRowUpdate: (newData) => updateSponsor(newData),
          onRowDelete: ({id}) => deleteSponsorFromDatabase(id)
        }}
        title={`${props.companyName} Sponsors`}
        {...props}
      />
    </>
  );
}

export default CompanySponsors;
