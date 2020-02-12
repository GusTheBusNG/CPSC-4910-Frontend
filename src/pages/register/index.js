import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NewDriverForm from '../../components/new-driver-form';
import NewSponsorForm from '../../components/new-sponsor-form';

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
                  Sponsor
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        
        <Card.Body>
          {registerSheet === 'driver' ? <NewDriverForm /> : <NewSponsorForm />}
        </Card.Body>
      </Card>
    </div>
  )
  
}

export default Register;