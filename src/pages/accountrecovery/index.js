import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import generator from 'generate-password'
import { useQuery } from '@apollo/react-hooks';
import {getID} from '../../state/queries'
import {changePassword} from '../../state/mutations'

const AccountRecovery = () => {
  const [updatePassword, { loading, error }] = useMutation(changePassword);

  const handleSubmit = event => {
    const newPassword = generator.generate({length: 10, numbers: true});
    console.log('here is your new password: ' + newPassword);
    const userEmail = event.currentTarget['email'].value;
    const { loading, error, data } = useQuery(getID, {variables: userEmail});

    if (error) return <p> error </p>;
    if (loading) return <p>Loading ...</p>;
    if (data){
      console.log('here is the user id: ' + data);
      updatePassword({variables: {data.Users[0].id, newPassword});
      event.preventDefault();
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
