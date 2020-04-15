import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllCompanies, getAllSponsors } from '../../../state/queries';
import { deleteCompany, updateCompany } from '../../../state/mutations';
import AddBox from '@material-ui/icons/AddBox';
import NewSponsorForm from '../../new-sponsor-form';
import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button';

import './all-companies.scss';
import { useHistory } from 'react-router-dom';

import handleError, { ALL_COMPANIES } from '../error/handle';

const AllCompanies = props => {
  const refetchQueries = { refetchQueries: [{ query: getAllCompanies }, { query: getAllSponsors }] };
  const [deleteCompanyAction, { error: deleteError }] = useMutation(deleteCompany, refetchQueries);
  const [updateCompanyAction, { error: updateError }] = useMutation(updateCompany, refetchQueries)
  const { loading, error, data, refetch } = useQuery(getAllCompanies);
  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false)
  const history = useHistory()

  const errors = { get: error, update: updateError, delete: deleteError };
  const errorResponse = handleError({ error: errors, refetch, messages: ALL_COMPANIES });
  if (errorResponse) return errorResponse;

  return (
    <>
      <Table
        loading={loading}
        columns={[
          { title: "ID", field: "id", type: "numeric", editable: "never" },
          { title: "Company Name", field: "name" },
          { title: "Point to Dollar Ratio", field: "pointToDollarRatio" },
          { title: "Description", field: "description" },
          {
            title: "Catalog",
            field: "catalog",
            render: ({id, name}) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/catalog', { companyId: id, name })}
              >
                Catalog
              </Button>
            )
          }
        ]}
        data={data && data.Companies}
        title="Companies"
        actions={[
          {
            icon: () => <AddBox />,
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: () => setShowNewCompanyForm(!showNewCompanyForm)
          }
        ]}
        editable={{
          onRowUpdate: ({ id, name, pointToDollarRatio, description }) => updateCompanyAction({ variables: { id, name, pointToDollarRatio, description }}),
          onRowDelete: ({ id }) => deleteCompanyAction({ variables: { id }})
        }}
        {...props}
      />
      
      { showNewCompanyForm ? (
        <Card className="admin-panel__new-company">
          <Card.Header>
            New Company
          </Card.Header>
          <Card.Body>
            <NewSponsorForm />
          </Card.Body>
        </Card>) : null }
    </>
  );
}

export default AllCompanies;
