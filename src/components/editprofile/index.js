import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';

import {useMutation} from '@apollo/react-hooks';
import {updateDriverDescription, updateUserNameAndEmail} from '../../state/mutations'

const EditProfile = ({id, driver: {description, email, firstName, lastName}}) => {
  const [submitDesc, {loading, error }] = useMutation(updateDriverDescription);
  const [submitNameAndEmail, {lloading, lerror }] = useMutation(updateUserNameAndEmail);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (description) {
      submitDesc({ variables: {
        id: id,
        description: form['description'].value ? form['description'].value : description
      }})
    }

    submitNameAndEmail({ variables: {
      id: id,
      email: form['email'].value ? form['email'].value : email,
      firstName: form['firstName'].value ? form['firstName'].value : firstName,
      lastName: form['lastName'].value ? form['lastName'].value : lastName
    }})
  }

  return (
    <div className="driverProfile">
      <Card>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder={firstName} />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder={lastName} />
              </Form.Group>
            </Form.Row>
            {description ?
              (<Form.Group controlId="description">
                <Form.Label>Description of yourself for sponsors!</Form.Label>
                <Form.Control type="textarea" placeholder={description} />
              </Form.Group>) : null}

            <Button variant="primary" type="submit">
            { loading || lloading ? "Loading..." : "Submit" }
            </Button>

            <Form.Text>
              { error || lerror ? "Well that didn't work" : null }
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
      <a href='/profile'> Go back </a>
    </div>
  )
}

export default EditProfile;
