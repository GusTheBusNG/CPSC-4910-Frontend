import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { insertSponsor, addSponsorToCompany } from '../../state/mutations';
import isEmail from 'validator/es/lib/isEmail';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewSponsorForm = ({ companies }) => {
  const [makeSponsor, { loading, error }] = useMutation(insertSponsor);
  const [addSponsorToCompanyAction] = useMutation(addSponsorToCompany);
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

    const variables = {
      email: form['email'].value,
      password: form['password'].value,
      firstName: form['firstName'].value,
      lastName: form['lastName'].value
    };

    if (companies) {
      const companyId = parseInt(form['companySelect'].value.substring(0, form['companySelect'].value.indexOf(' ')), 10);
      addSponsorToCompanyAction({ variables: {
        ...variables,
        companyId
      }});
    } else {
      makeSponsor({ variables: {
        ...variables,
        companyDescription: form['companyDescription'].value,
        companyName: form['companyName'].value,
        companyPointToDollarRatio: form['companyPointToDollarRatio'].value
      }});
    }
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


      {companies ?
        (<Form.Group controlId="companySelect">
          <Form.Label>Company</Form.Label>
          <Form.Control as="select">
            { companies.map(({ id, name }) => <option key={name}>{`${id} - ${name}`}</option>) }
          </Form.Control>
        </Form.Group>)
        :
        (<>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Company Name" />
          </Form.Group>

          <Form.Group controlId="companyDescription">
            <Form.Label>Description of your company for drivers!</Form.Label>
            <Form.Control type="textarea" placeholder="My company loves giving out points to drivers!" />
          </Form.Group>

          <Form.Group controlId="companyPointToDollarRatio">
            <Form.Label>Company Point to Dollar Ratio</Form.Label>
            <Form.Control type="text" placeholder="0.01" />
          </Form.Group>
        </>)
      }

      <Button variant="primary" type="submit">
        { loading ? "Loading..." : "Submit" }
      </Button>

      <Form.Text>
        { error ? "Well that didn't work" : null }
      </Form.Text>
    </Form>
  )
}

export default NewSponsorForm;