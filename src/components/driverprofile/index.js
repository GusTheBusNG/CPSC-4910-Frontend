import Button from 'react-bootstrap/Button'
import React, { useState } from 'react';

import "./index.css"
import EditProfile from "../editprofile"
import ChangePassForm from "../changepassform"

import {fetchDriver} from '../../state/queries';
import { useQuery } from '@apollo/react-hooks';

const Email = ({email}) => {
  return (
    <div>
      <h2 className='bold'> Email </h2>
      <p> {email} </p>
    </div>
  )
}

const FullName = ({firstName, lastName}) => {
  return (
    <div>
      <h2 className='bold'> Full Name </h2>
      <p> {firstName} {lastName} </p>
    </div>
  )
}

const Description = ({description}) => {
  return (
    <div>
      <h2 className='bold'> Description </h2>
      <p> {description} </p>
    </div>
  )
}

const Driver = ({driver: {description, User: {email, firstName, lastName}}}) => {
  return (
    <div>
      <Email email={email}/>
      <FullName firstName={firstName} lastName={lastName}/>
      <Description description={description}/>
    </div>
  )
}

const DriverProfile = (props) => {
  const [view, changeView] = useState('profile');

  const id = props.id;
  let driver = {};
  const { loading, error, data } = useQuery(fetchDriver, {
    variables: { id }
  });

  if (error) return <p> error </p>;
  if (loading) return <p>Loading ...</p>;
  if (data) {
    data.Drivers.forEach(({ description, User}) => {
      driver = {description, User};
    })
  }

  switch (view) {
    case "changePass":
      return <ChangePassForm userId={props.userId}/>;
    case "editProfile":
      return <EditProfile id={id} driver={driver}/>;
    default:
      return (
        <div className='driverProfile'>
        <Driver driver={driver}/>
        <Button variant="primary" type="submit" onClick={() => changeView('editProfile')}> Edit Profile </Button>
        <Button variant="link"
                style={{display: "block", margin: "auto"}}
                onClick={() => changeView('changePass')}
        >
          Change Password
        </Button>
      </div>
      )
    }
}

export default DriverProfile;
