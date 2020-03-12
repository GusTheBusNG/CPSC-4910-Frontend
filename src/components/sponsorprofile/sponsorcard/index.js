import React from 'react';

const SponsorCard = ({User}) => {
  return (
    <div className="sponsorProfile">
      <h2 className="bold"> Email </h2>
        <p> {User.email} </p>
      <h2 className="bold"> Full Name </h2>
        <p> {User.firstName} {User.lastName} </p>
    </div>
  )
}

export default SponsorCard
