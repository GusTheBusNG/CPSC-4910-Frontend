import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';

import {useMutation} from '@apollo/react-hooks';
import {updateDriverDescription, updateDriverNameAndEmail} from '../../state/mutations'

const EditProfile = (props) => {
  const [submitDesc, {loading, error }] = useMutation(updateDriverDescription);
  const [submitNameAndEmail, {lloading, lerror }] = useMutation(updateDriverNameAndEmail);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    submitDesc({ variables: {
      id: props.id,
      description: form['description'].value ? form['description'].value : props.dict['description']
    }})

    submitNameAndEmail({ variables: {
      id: props.id,
      email: form['email'].value ? form['email'].value : props.dict['User']['email'],
      firstName: form['firstName'].value ? form['firstName'].value : props.dict['User']['firstName'],
      lastName: form['lastName'].value ? form['lastName'].value : props.dict['User']['lastName']
    }})
  }

  return (
    <div className="driverProfile">
      <Card>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder={props.dict['User']['email']} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder={props.dict['User']['firstName']} />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder={props.dict['User']['lastName']} />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="description">
              <Form.Label>Description of yourself for sponsors!</Form.Label>
              <Form.Control type="textarea" placeholder={props.dict['description']} />
            </Form.Group>

            <Button variant="primary" type="submit">
            { loading || lloading ? "Loading..." : "Submit" }
            </Button>

            <Form.Text>
              { error || lerror ? "Well that didn't work" : null }
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EditProfile;
