import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getPointToDollar } from '../../state/queries';
import { updatePointToDollar } from '../../state/mutations';

const PointToDollar = ({ companyId }) => {
  const { loading, error, data } = useQuery(getPointToDollar, { variables: {companyId}});
  const [updatePointToDollarAction] = useMutation(updatePointToDollar);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const newRatio = form['formRatio'].value
    updatePointToDollarAction({ variables: {
      companyId,
      pointToDollarRatio: newRatio
    }})
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="pointToDollar">
      <h4>The point to dollar ratio is set to { data.Companies[0].pointToDollarRatio }</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRatio">
          <Form.Control type="text" placeholder="To change ratio, enter a new one here" />
        </Form.Group>
        <Button type="submit" onClick={() => window.location.reload(false)}>
          Change
        </Button>
      </Form>
    </div>

  );
}

export default PointToDollar;
