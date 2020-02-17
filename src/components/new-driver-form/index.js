import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { insertDriver } from '../../state/mutations';
import isEmail from 'validator/es/lib/isEmail';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewDriverForm = () => {
  const [makeDriver, { loading, error }] = useMutation(insertDriver);
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    isEmail(form['email'].value)

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    makeDriver({ variables: {
      email: form['email'].value,
      password: form['password'].value,
      firstName: form['firstName'].value,
      lastName: form['lastName'].value,
      description: form['description'].value
    }})
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Row>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="description">
        <Form.Label>Description of yourself for sponsors!</Form.Label>
        <Form.Control type="textarea" placeholder="Description" />
      </Form.Group>

      <Button variant="primary" type="submit">
        { loading ? "Loading..." : "Submit" }
      </Button>

      <Form.Text>
        { error ? "Well that didn't work" : null }
      </Form.Text>
    </Form>
  )
}

export default NewDriverForm;