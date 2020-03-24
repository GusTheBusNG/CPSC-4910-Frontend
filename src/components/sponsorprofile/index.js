import React, { useState } from 'react';
import SponsorCard from "./sponsorcard"
import CompanyCard from "./companycard"

import "./index.css"

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

import {fetchSponsorAndCompany} from '../../state/queries';
import { useQuery } from '@apollo/react-hooks';

const SponsorProfile =  ({sponsorId, userId}) => {
  const [sponsorSheet, setSponsorSheet] = useState('sponsor');

  const { loading, error, data } = useQuery(fetchSponsorAndCompany, {
    variables: { userId }
  });

  if (error) return <p> Something went wrong. </p>
  if (loading) return <p> Loading...</p>

  return (
    <div className="register">
      <h1 className="register__heading">Profile</h1>
      <Card>
        <Card.Header>
          <Nav fill variant="tabs" defaultActiveKey="#sponsor">
            <Nav.Item>
              <Nav.Link
                href="#sponsor"
                onClick={() => setSponsorSheet('sponsor')}>
                  Sponsor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#company"
                onClick={() => setSponsorSheet('company')}>
                  Company
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body>
          {sponsorSheet === 'sponsor' ?
            <SponsorCard User={data.Sponsors[0].User}/> : <CompanyCard Company={data.Sponsors[0].Company}/>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SponsorProfile;
