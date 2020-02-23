import Button from '@material-ui/core/Button';
import React from 'react';
import Table from '../table';

import {fetchCompanies} from '../../state/queries';
import { useQuery } from '@apollo/react-hooks';

const TableButton = (props) => {
  const text = props.companies.length ? (props.companies[0].activeRelationship ? ("View Catalog") : ("Application pending")) : ("Apply")
  const href = props.companies.length ? (props.companies[0].activeRelationship ? ("/catalog") : ("")) : ("/apply")
  return (
    <Button variant="contained" style={{backgroundColor: "rgb(0, 123, 255)", color: "rgb(255,255,255)"}} href={href}>
      {text}
    </Button>
  );
}

const DriverPanel = (props) => {
  const id = props.id;
  const dataArray = [];
  const { loading, error, data } = useQuery(fetchCompanies, {
    variables: { id }
  });

  if (error) return <p> error </p>;
  if (loading) return <p>Loading ...</p>;
  if (data) {
    data.Companies.map(({ name, description, DriverCompanies}) => (
      dataArray.push(
        {
        status: <TableButton companies={DriverCompanies}/>,
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
            return b.points-a.points
            }
          },
          ]}
          data={dataArray}
          title="Companies"
        />
      </div>
    );
  }
}

export default DriverPanel;
