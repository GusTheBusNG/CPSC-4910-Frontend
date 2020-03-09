import Button from '@material-ui/core/Button';
import React from 'react';
import Table from '../tables/table';

import {fetchCompanies} from '../../state/queries';
import { insertDriverApplication } from '../../state/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const tableButtonStyle = {
  backgroundColor: "rgb(0, 123, 255)",
  color: "rgb(255,255,255)"
}

export const relationshipState = {
  VIEW_CATALOG: "View Catalog",
  PENDING: "Pending",
  APPLY: "Apply"
}

const TableButton = ({companyId, driverId, companies, submitApplication}) => {
  let text;
  
  if (companies.length) {
    if (companies[0].activeRelationship) {
      text = relationshipState.VIEW_CATALOG;
    }
    else {
      text = relationshipState.PENDING
    }
  }
  else {
    text = relationshipState.APPLY;
  }

  switch (text) {
    case relationshipState.APPLY:
      return (
        <Button variant="contained"
                style={tableButtonStyle}
                onClick={() => submitApplication({companyId, driverId})}>
          {text}
        </Button>
      );
    default:
      return (
        <Button variant="contained" style={tableButtonStyle}>
          {text}
        </Button>
      );
  }
}

const DriverPanel = (props) => {
  const driverId = props.id;
  const driverCompanies = [];
  const { loading, error, data, refetch } = useQuery(fetchCompanies, {
    variables: { id: driverId }
  });

  const [applyToCompany] = useMutation(insertDriverApplication);

  const submitApplication = async ({companyId, driverId}) => {
    await applyToCompany({ variables: {
      companyId: companyId,
      driverId: driverId,
      points: 0,
      applicationAccepted: false
    }});
    await refetch();
  }

  if (error) return <p> error </p>;
  if (loading) return <p>Loading ...</p>;
  if (data) {
    data.Companies.map(({ id, name, description, DriverCompanies}) => (
      driverCompanies.push(
        {
        status: <TableButton companyId={id} driverId={driverId} companies={DriverCompanies} submitApplication={submitApplication}/>,
        company: name,
        description: description,
        points: DriverCompanies.length ? (DriverCompanies[0].points) : ("None")
        })
    ));

    return (
      <div style={{ maxWidth: "100%" }}>
        <Table
          columns={[
          { title: "Status", field: "status" },
          { title: "Company", field: "company" },
          { title: "Description", field: "description" },
          { title: "Points", field: "points", defaultSort: "desc", customSort: (a,b) => {
            if (typeof a.points === 'string') {
              return -1;
            }
            if (typeof b.points === 'string') {
              return 1;
            }
            return a.points-b.points
            }
          },
          ]}
          data={driverCompanies}
          title="Companies"
        />
      </div>
    );
  }
}

export default DriverPanel;
