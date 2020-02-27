import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

import {getPassword} from '../../state/queries';
import {changePassword} from '../../state/mutations'
import {useQuery, useMutation} from '@apollo/react-hooks';

const ChangePassForm = (props) => {
  const [validated, setValidated] = useState(false);
  const { loading, error, data } = useQuery(getPassword, {
    variables: { id: props.userId }
  });
  const [changePass, {lloading, lerror }] = useMutation(changePassword);

  let pass;
  let passMatch = false;

  if (loading) return <p> Loading... </p>
  if (error) return <p> Error </p>
  if (data) {
    data.Users.forEach(({password}) => (
      pass = password
    ));

    const handleSubmit = event => {
      event.preventDefault();

      const form = event.currentTarget;
      const oldPass = form['oldPassword'].value
      const newPass = form['newPassword'].value
      const confirmPass = form['newPasswordConfirm'].value

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (oldPass !== pass) {
        alert("Old passwords don't match")
      }
      if (newPass !== confirmPass) {
        alert("New passwords don't match")
      }
      if ((oldPass === pass) && (newPass === confirmPass)) {
        changePass({ variables: {
          id: props.userId,
          password: newPass
        }})
        setValidated(true)
      }
    }

    return (
      <div className="driverProfile">
      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Enter your old password</Form.Label>
              <Form.Control type="password" required placeholder="Old Password" />
              <Form.Control.Feedback type="invalid">
                Passwords did not match.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Text>
              {!passMatch ? null : "Passwords did not match."}
            </Form.Text>

            <Form.Group controlId="newPassword">
              <Form.Label>Enter your new password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>

            <Form.Group controlId="newPasswordConfirm">
              <Form.Label>Confirm your new password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
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
        <a href='/profile'> go back </a>
      </div>
    )
  }
  else {
    return <p> Something went wrong. </p>
  }
}

export default ChangePassForm;
