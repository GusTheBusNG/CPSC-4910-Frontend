import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllCompanies } from '../../../state/queries';
import { deleteCompany, updateCompany } from '../../../state/mutations';

const AllDrivers = (props) => {
  const [deleteCompanyAction] = useMutation(deleteCompany, {
    update(cache, { data: { delete_Companies: { returning } } }) {
      const { Companies } = cache.readQuery({ query: getAllCompanies });
      cache.writeQuery({
        query: getAllCompanies,
        data: { Companies: Companies.filter(({ id } ) => id !== returning[0].id)}
      })
    }
  });
 
  const [updateCompanyAction] = useMutation(updateCompany)

  const { loading, error, data } = useQuery(getAllCompanies);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Table
      columns={[
        { title: "ID", field: "id", type: "numeric", editable: "never" },
        { title: "Company Name", field: "name" },
        { title: "Point to Dollar Ratio", field: "pointToDollarRatio" },
        { title: "Description", field: "description" },
      ]}
      data={data.Companies}
      title="Companies"
      editable={{
        onRowUpdate: ({ id, name, pointToDollarRatio, description }) => updateCompanyAction({ variables: { id, name, pointToDollarRatio, description }}),
        onRowDelete: ({ id }) => deleteCompanyAction({ variables: { id }})
      }}
      {...props}
    />
  );
}



export default AllDrivers;
