import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import React, { useState } from 'react';

import "./index.css"
import EditProfile from "../editprofile"
import ChangePassForm from "../changepassform"
import DeactivateAccount from '../../components/deactivate-account'
import Preferences from '../../components/preferences'

import {fetchDriver} from '../../state/queries';
import { useQuery } from '@apollo/react-hooks';

export const Email = ({email}) => (
  <div>
    <h2 className='bold'> Email </h2>
    <p> {email} </p>
  </div>
)

export const FullName = ({firstName, lastName}) => (
  <div>
    <h2 className='bold'> Full Name </h2>
    <p> {firstName} {lastName} </p>
  </div>
)

export const Description = ({description}) => (
  <div>
    <h2 className='bold'> Description </h2>
    <p> {description} </p>
  </div>
)

export const Driver = ({driver: {description, email, firstName, lastName}}) => (
  <div>
    <Email email={email}/>
    <FullName firstName={firstName} lastName={lastName}/>
    <Description description={description}/>
  </div>
)

const DriverProfile = (props) => {
  const [view, changeView] = useState('profile');

  const id = props.userId;
  let driver = {};
  const { loading, error, data } = useQuery(fetchDriver, {
    variables: { id }
  });

  if (error) return <p> error </p>;
  if (loading) return <p>Loading ...</p>;
  if (data) {
    data.Drivers.forEach(({ description, User}) => {
      driver = {description, ...User};
    })
  }

  switch (view) {
    case "changePass":
      return <ChangePassForm userId={props.userId}/>;
    case "editProfile":
      return <EditProfile id={id} driver={driver}/>;
    case "deactivateAccount":
      return <DeactivateAccount pass={driver.password} userId={id}/>;
    default:
      return (
        <Card>
        <Card.Header>
          <Nav fill variant="tabs" defaultActiveKey="#profile">
            <Nav.Item>
              <Nav.Link
                href="#profile"
                onClick={() => changeView('profile')}>
                  Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#preferences"
                onClick={() => changeView('preferences')}>
                  Notification Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {view === "profile" ? (
            <div className='driverProfile'>
              <Driver driver={driver}/>
              <Button variant="primary" type="submit" onClick={() => changeView('editProfile')}> Edit Profile </Button>
              <div className="spacing">
                <Button variant="danger" onClick={() => changeView('deactivateAccount')}>Deactivate Account</Button>
              </div>
              <Button variant="link"
                      style={{display: "block", margin: "auto"}}
                      onClick={() => changeView('changePass')}
              >
                Change Password
              </Button>
            </div>
          ) : <Preferences userId={props.userId}/>}
      </Card.Body>
      </Card>
      )
    }
}

export default DriverProfile;
