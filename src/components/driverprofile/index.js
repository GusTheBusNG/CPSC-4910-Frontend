import Button from 'react-bootstrap/Button'
import React, { useState } from 'react';

import "./index.css"
import EditProfile from "../editprofile"
import ChangePassForm from "../changepassform"

import {fetchDriver} from '../../state/queries';
import { useQuery } from '@apollo/react-hooks';

const Email = props => {
  return (
    <div>
      <h2 className='bold'> Email </h2>
      <p> {props.email} </p>
    </div>
  )
}

const FullName = props => {
  return (
    <div>
      <h2 className='bold'> Full Name </h2>
      <p> {props.firstName} {props.lastName} </p>
    </div>
  )
}

const Description = (props) => {
  return (
    <div>
      <h2 className='bold'> Description </h2>
      <p> {props.description} </p>
    </div>
  )
}

const Driver = (props) => {
  return (
    <div>
      <Email email={props.dict['User'].email}/>
      <FullName firstName={props.dict['User'].firstName} lastName={props.dict['User'].lastName}/>
      <Description description={props.dict['description']}/>
    </div>
  )
}

const DriverProfile = (props) => {
  const [view, changeView] = useState('profile');

  const id = props.id;
  const dict = {};
  const { loading, error, data } = useQuery(fetchDriver, {
    variables: { id }
  });

  if (error) return <p> error </p>;
  if (loading) return <p>Loading ...</p>;
  if (data) {
    data.Drivers.forEach(({ description, User}) => {
      dict['description'] = description;
      dict['User'] = User;
    })
  }
  else {
    return <p className='driverProfile'> Sorry, something went wrong. </p>
  }

  switch (view) {
    case "changePass":
      return <ChangePassForm/>;
    case "editProfile":
      return <EditProfile id={id} dict={dict}/>;
    default:
      return (
        <div className='driverProfile'>
        <Driver dict={dict}/>
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
