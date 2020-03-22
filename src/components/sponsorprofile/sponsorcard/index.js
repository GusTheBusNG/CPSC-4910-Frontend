import Button from 'react-bootstrap/Button'
import ChangePassForm from "../../changepassform"
import EditProfile from "../../editprofile"
import React, { useState } from 'react';

const SponsorCard = ({User}) => {
  const [view, changeView] = useState('profile');

  switch (view) {
    case "changePass":
      return <ChangePassForm userId={User.id}/>;
    case "editProfile":
      return <EditProfile id={User.id} driver={User}/>
    default:
      return (
        <div className="sponsorProfile">
          <h2 className="bold"> Email </h2>
            <p> {User.email}</p>
          <h2 className="bold"> Full Name </h2>
            <p> {User.firstName} {User.lastName} </p>
            <Button variant="primary"
                    type="submit"
                    onClick={() => changeView('editProfile')}>
                    Edit Profile
            </Button>
            <Button variant="link"
                    style={{display: "block", margin: "auto"}}
                    onClick={() => changeView('changePass')}>
              Change Password
            </Button>
        </div>
      )
    }
}

export default SponsorCard
