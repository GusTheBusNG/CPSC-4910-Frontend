import Button from 'react-bootstrap/Button'
import EditCompany from "../../editcompany"
import React, { useState } from 'react';

const CompanyCard = ({Company}) => {
  const [view, changeView] = useState('profile');

  switch (view) {
    case "editProfile":
      return <EditCompany company={Company}/>
    default:
      return (
        <div className="sponsorProfile">
          <h2 className="bold"> Name </h2>
            <p> {Company.name}</p>
          <h2 className="bold"> Description </h2>
            <p> {Company.description} </p>
          <h2 className="bold"> Point to dollar ratio </h2>
            <p> {Company.pointToDollarRatio} </p>
            <Button variant="primary"
                    type="submit"
                    onClick={() => changeView('editProfile')}>
                    Edit Profile
            </Button>
        </div>
      )
    }
}

export default CompanyCard;
