import React from 'react';
import Table from '../table';
import { useQuery } from '@apollo/react-hooks';
import { fetchCompanySponsors } from '../../../state/queries';

const CompanySponsors = (props) => {
  const { loading, error, data } = useQuery(fetchCompanySponsors, {
    variables:
    { id: props.companyId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Table
        columns={[
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Status", field: "isActive", lookup: { true: "Active", false: "Inactive" } },
        ]}
        data={data.Companies[0].Sponsors.map(sponsor => ({
          firstName: sponsor.User.firstName,
          lastName: sponsor.User.lastName,
          email: sponsor.User.email,
          isActive: sponsor.User.isActive
        }))}
        title={`${props.companyName} Sponsors`}
        {...props}
      />
    </>
  );
}

export default CompanySponsors;
