import React, { useState } from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAllSponsors, getAllCompanies } from '../../../state/queries';
import { deleteSponsor, updateSponsor } from '../../../state/mutations';
import AddBox from '@material-ui/icons/AddBox';
import NewSponsorForm from '../../new-sponsor-form';
import Card from 'react-bootstrap/Card';

import './all-sponsors.scss';

const AllSponsors = (props) => {
  const [deleteSponsorAction] = useMutation(deleteSponsor, {
    update(cache, { data: { delete_Users: { returning } } }) {
      const { Sponsors } = cache.readQuery({ query: getAllSponsors });
      cache.writeQuery({
        query: getAllSponsors,
        data: { Sponsors: Sponsors.filter(({ User: { id } }) => id !== returning[0].id)}
      })
    }
  });
  const [updateSponsorAction] = useMutation(updateSponsor);

  const { loading, error, data } = useQuery(getAllSponsors);
  const { data: companiesData } = useQuery(getAllCompanies);

  const [showNewSponsorForm, setShowNewSponsorForm] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Table
        columns={[
          { title: "ID", field: "id", type: "numeric", editable: "never" },
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Password", field: "password" },
        ]}
        data={data.Sponsors.map(sponsor => ({
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
