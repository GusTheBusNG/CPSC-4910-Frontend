import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import React from 'react';

import {useMutation} from '@apollo/react-hooks';
import {updateCompany} from '../../state/mutations'

const EditCompany = ({company: {id, name, description, pointToDollarRatio}}) => {
  const [submitCompany, {loading, error}] = useMutation(updateCompany);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    submitCompany({ variables: {
      id: id,
      description: form.description.value ? form.description.value : description,
      name: form.name.value ? form.name.value : name,
      pointToDollarRatio: form.pointToDollarRatio.value ? form.pointToDollarRatio.value : pointToDollarRatio
    }})
  }

  return (
    <div className="sponsorProfile">
      <Card>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name of your company</Form.Label>
              <Form.Control type="textarea" placeholder={name} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description of your company for drivers</Form.Label>
              <Form.Control type="textarea" placeholder={description} />
            </Form.Group>
            <Form.Group controlId="pointToDollarRatio">
              <Form.Label>Point to dollar ratio</Form.Label>
              <Form.Control type="text" placeholder={pointToDollarRatio} />
            </Form.Group>
            <Button variant="primary" type="submit">
            {loading ? "Loading..." : "Submit" }
            </Button>
            <Form.Text>
              { error ? "Well that didn't work" : null }
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
      <a href='/profile'> Go back </a>
    </div>
  )
}

export default EditCompany;
