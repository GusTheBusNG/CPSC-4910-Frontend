import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {
  withRouter
} from 'react-router-dom'

import React from 'react';
import './index.css'

import {encrypt} from "../../state/crypto";
import {login} from '../../state/queries';
import {useLazyQuery} from '@apollo/react-hooks';

class InvalidLogin extends React.Component {
  render() {
    return (
      <div className='login'>Email or password was incorrect.<br/>
        <a href='/login'> Click here to return to login. </a>
      </div>
    );
  }
}
const Login = (props) => {
  const [submit, {loading, data, error }] = useLazyQuery(login);

    if (error) return <p> error </p>;
    if (loading) return <p>Loading ...</p>;
    if (data) {
      if (data.Users.length !== 1) {
        return <InvalidLogin/>;
      }
      const combined = data.Users[0].id + "." + data.Users[0].role;
      const encrypted = encrypt(combined);
      localStorage.setItem('session', encrypted);

      props.history.push("/dashboard");
  }

    return (
      <div className='login'>
        <div className='bold'> Login </div>
        <center>
          <Form onSubmit={(event) => submit({ variables: { email: event.currentTarget['email'].value, password: event.currentTarget['password'].value } })}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br/>
            <a className='register' href='/register'> Register </a>
            <a className='forgot' href='/accountrecovery'> Forgot login </a>
          </Form>
        </center>
      </div>
    );
}

export default withRouter(Login);
