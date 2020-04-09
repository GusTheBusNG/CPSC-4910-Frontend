import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllSponsors, getAllCompanies } from '../../../state/queries';
import { deleteSponsor, updateSponsor } from '../../../state/mutations';
import AddBox from '@material-ui/icons/AddBox';
import NewSponsorForm from '../../new-sponsor-form';
import Card from 'react-bootstrap/Card';
import handleError, { ALL_SPONSORS } from '../error/handle'

import './all-sponsors.scss';

const AllSponsors = (props) => {
  const refetchQueries = { refetchQueries: [{ query: getAllSponsors }, { query: getAllCompanies }] };
  const [deleteSponsorAction, { error: deleteError }] = useMutation(deleteSponsor, refetchQueries);
  const [updateSponsorAction, { error: updateError }] = useMutation(updateSponsor, refetchQueries);
  const { loading, error, data, refetch } = useQuery(getAllSponsors);
  const { data: companiesData } = useQuery(getAllCompanies);

  const [showNewSponsorForm, setShowNewSponsorForm] = useState(false);

  const errors = { get: error, update: updateError, delete: deleteError };
  const errorResponse = handleError({ error: errors, refetch, messages: ALL_SPONSORS });
  if (errorResponse) return errorResponse;

  return (
    <>
      <Table
        loading={loading}
        columns={[
          { title: "ID", field: "id", type: "numeric", editable: "never" },
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Password", field: "password" },
        ]}
        data={data && data.Sponsors.map(sponsor => ({
          id: sponsor.User.id,
          firstName: sponsor.User.firstName,
          lastName: sponsor.User.lastName,
          email: sponsor.User.email,
          password: sponsor.User.password
        }))}
        editable={{
          onRowUpdate: (newData) => updateSponsorAction({ variables: { ...newData }}),
          onRowDelete: ({ id }) => deleteSponsorAction({ variables: { id }})
        }}
        actions={[
          {
            icon: () => <AddBox />,
            tooltip: 'Add User',
            isFreeAction: true,
            hidden: !companiesData,
            onClick: (event) => setShowNewSponsorForm(!showNewSponsorForm)
          }
        ]}
        title="Sponsors"
        {...props}
      />

      { showNewSponsorForm && companiesData ? (
        <Card className="admin-panel__new-sponsor">
          <Card.Header>
            New Sponsor
          </Card.Header>
          <Card.Body>
            <NewSponsorForm companies={companiesData.Companies}/>
          </Card.Body>
        </Card>)
        : null }
    </>
  );
}

export default AllSponsors;
