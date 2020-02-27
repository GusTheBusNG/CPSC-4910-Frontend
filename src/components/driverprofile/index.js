import Button from 'react-bootstrap/Button'
import React, { useState } from 'react';

import "./index.css"
import EditProfile from "../editprofile"
import ChangePassForm from "../changepassform"

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

  const id = props.id;
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
