import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useLazyQuery} from '@apollo/react-hooks';
import {getID} from '../../state/queries';
import generator from 'generate-password';
import { useMutation } from '@apollo/react-hooks';
import {changePassword} from '../../state/mutations';

const AccountRecovery = (props) => {
  const [submit, { data }] = useLazyQuery(getID);
  const [updatePassword] = useMutation(changePassword);
  var newPassword = "";

  const handleSubmit = event => {
    event.preventDefault();
    submit({variables: {userEmail: event.currentTarget['email'].value}})
    if(data) {
      newPassword = generator.generate({length: 10, numbers: true});
      updatePassword({variables: {id: data.Users[0].id, password: newPassword}});
      alert('This is your new password. DONT LOSE IT!: ' + newPassword);
    }
  }
	
  return (
    <Form onSubmit={handleSubmit}>
    	<Form.Group controlId="email">
        <Form.Label>Forgot password? Enter your email below and we will send a temporary password.</Form.Label>
        <Form.Control type="email" placeholder="Enter email"/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AccountRecovery;
