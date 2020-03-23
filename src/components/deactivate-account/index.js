import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import {
  withRouter
} from 'react-router-dom'

import {useMutation} from '@apollo/react-hooks';
import {changeAccountState} from '../../state/mutations';

const DeactivateAccount = (props) => {
  const [validated, setValidated] = useState(false);

  const [deactivate, {loading, error }] = useMutation(changeAccountState);

  let pass = props.pass
  let userId = props.userId

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (form.password.value !== pass) {
      alert("Passwords don't match")
      setValidated(false)
    }
    else {
      deactivate({ variables: {
          id: userId,
          active: false
        }})
      setValidated(true)
      localStorage.removeItem("session");
      props.history.push("/")
    }
  }

  return (
    <div className="driverProfile">
    <Card>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Confirm your password</Form.Label>
            <Form.Control type="password" required placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Passwords did not match.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="danger" type="submit">
          { loading ? "loading..." : "Deactivate" }
          </Button>

          <Form.Text>
            {error ? "Something went wrong" : null}
          </Form.Text>

        </Form>
      </Card.Body>
    </Card>
      <a href='/profile'> Go back </a>
    </div>
  )
}

export default withRouter(DeactivateAccount);
