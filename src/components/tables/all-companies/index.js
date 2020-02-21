import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllCompanies, getAllSponsors } from '../../../state/queries';
import { deleteCompany, updateCompany } from '../../../state/mutations';
import AddBox from '@material-ui/icons/AddBox';
import NewSponsorForm from '../../new-sponsor-form';

const AllDrivers = (props) => {
  const [deleteCompanyAction] = useMutation(deleteCompany, {
    update(cache, { data }) {
      const { Companies } = cache.readQuery({ query: getAllCompanies });
      const { Sponsors } = cache.readQuery({ query: getAllSponsors });
      cache.writeQuery({
        query: getAllCompanies,
        data: { Companies: Companies.filter(({ id } ) => id !== data.delete_Companies.returning[0].id)}
      });
      cache.writeQuery({
        query: getAllSponsors,
        data: { Sponsors: Sponsors.filter(({ User: { id } } ) => id !== data.delete_Sponsors.returning[0].userId)}
      });
    }
  });
 
  const [updateCompanyAction] = useMutation(updateCompany)

  const { loading, error, data } = useQuery(getAllCompanies);

  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Table
        columns={[
          { title: "ID", field: "id", type: "numeric", editable: "never" },
          { title: "Company Name", field: "name" },
          { title: "Point to Dollar Ratio", field: "pointToDollarRatio" },
          { title: "Description", field: "description" },
        ]}
        data={data.Companies}
        title="Companies"
        actions={[
          {
            icon: () => <AddBox />,
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => setShowNewCompanyForm(!showNewCompanyForm)
          }
        ]}
        editable={{
          onRowUpdate: ({ id, name, pointToDollarRatio, description }) => updateCompanyAction({ variables: { id, name, pointToDollarRatio, description }}),
          onRowDelete: ({ id }) => deleteCompanyAction({ variables: { id }})
        }}
        {...props}
      />
      { showNewCompanyForm ? <NewSponsorForm /> : null }
    </>
  );
}



export default AllDrivers;
