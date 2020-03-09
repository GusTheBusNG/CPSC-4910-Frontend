import React from 'react';
import Table from '../table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getPointToDollar } from '../../../state/queries';
import { updatePointToDollar } from '../../../state/mutations';

const PointToDollar = (props) => {
  const [updatePointToDollarAction] = useMutation(updatePointToDollar, {
    update(cache, { data: { update_PointToDollar } }) {
      const newPointToDollar = update_PointToDollar.returning[0];
      const { PointToDollar } = cache.readQuery({ query: getPointToDollar });
      cache.writeQuery({
        query: getPointToDollar,
        data: {
          PointToDollar: newPointToDollar
        }
      })
    }
  });
  const { loading, error, data } = useQuery(getPointToDollar);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Table
      columns={[
        { title: "PointToDollar", type: "numeric", field: "pointToDollar" },
      ]}
      data={data.Drivers.map(driver => ({
        id: driver.User.id,
      }))}
      editable={{
        onRowUpdate: (newData) => updatePointToDollarAction({ variables: { ...newData }}),
      }}
      title="PointToDollar"
      {...props}
    />
  );
}

export default PointToDollar;
