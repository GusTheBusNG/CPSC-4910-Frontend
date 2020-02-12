import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NewDriverForm from '../../components/new-driver-form';

const Register = () => {
  const [registerSheet, setRegisterSheet] = useState('driver');

  return (
    <div>
      <Card>
        <Card.Header>
          <Nav fill variant="tabs" defaultActiveKey="#driver">
            <Nav.Item>
              <Nav.Link
                href="#driver"
                onClick={() => setRegisterSheet('driver')}>
                  User
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                href="#sponsor"
                onClick={() => setRegisterSheet('sponsor')}>
                  sponsor
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        
        <Card.Body>
          {registerSheet === 'driver' ? <NewDriverForm /> : <NewDriverForm />}
        </Card.Body>
      </Card>
    </div>
  )
  
}

export default Register;