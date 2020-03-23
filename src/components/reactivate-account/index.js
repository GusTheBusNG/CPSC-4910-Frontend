import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import React from 'react';

import "./index.css"
import {
  withRouter
} from 'react-router-dom'

import {encrypt} from "../../state/crypto";

import {useMutation} from '@apollo/react-hooks';
import {changeAccountState} from '../../state/mutations';

const ReactivateAccount = (props) => {
  const [reactivate, {loading, error }] = useMutation(changeAccountState);

  const handleSubmit = () => {
    reactivate({ variables: {
        id: props.user.Users[0].id,
        active: true
      }})

      if (!error) {
        let combined = props.user.Users[0].id + "." + props.user.Users[0].role

        switch (props.user.Users[0].role) {
          case "Driver":
            combined += "." + props.user.Users[0].Driver.id;
            break;
          case "Sponsor":
            combined += "." + props.user.Users[0].Sponsor.id;
            break;
          default:
            break;
        }

        const encrypted = encrypt(combined);
        localStorage.setItem('session', encrypted);

        props.history.push("/dashboard");
      }
  }
  return (
    <div className="reactivateAccount">
    <Card>
      <Card.Body>
        <div className="bottomSpacing">
          Your account is currently deactivated click the button below to reactivate
        </div>
        <Button onClick={handleSubmit}> {loading ? "Loading..." : "Reactivate Account"}</Button>

        <Form.Text>
          {error ? "Something went wrong" : null}
        </Form.Text>

      </Card.Body>
    </Card>
      <a href='/profile'> Go back </a>
    </div>
  )
}

export default withRouter(ReactivateAccount);
