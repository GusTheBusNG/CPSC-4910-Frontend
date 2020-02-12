import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react';
import './index.css'


class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <div class='bold'> Login </div>
        <center>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary" type="submit" class='submit'>
            Submit
          </Button>
          <br/>
          <a class='register' href='/register'> Register </a>
        </Form>
        </center>
      </div>
    );
  }
}

export default Login;
