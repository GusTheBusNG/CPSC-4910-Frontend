import React from 'react';

const CompanyCard = ({Company}) => {
  return (
    <div className="sponsorProfile">
      <h2 className="bold"> Company Name </h2>
        <p> {Company.name} </p>
      <h2 className="bold"> Description </h2>
        <p> {Company.description} </p>
    </div>
  )
}

export default CompanyCard;
