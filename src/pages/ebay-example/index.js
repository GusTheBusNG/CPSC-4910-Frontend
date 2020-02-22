import React from 'react';
import Ebay from 'ebay-node-api';


const EbayExample = () => {
  let ebay = new Ebay({
      clientID: process.env.REACT_APP_EBAY_APP_ID_SANDBOX,
      clientSecret: process.env.REACT_APP_EBAY_CERT_ID_SANDBOX,
      env: 'SANDBOX',
      headers: {
        'Access-Control-Allow-Headers': true
      },
      body: {
        grant_type: 'client_credentials',
      }
  });
  ebay.getAccessToken().then((data) => {
      console.log(data); // data.access_token
  }, (error) => {
      console.log(error);
  });

  return (<p>eBay Example</p>);
}

export default EbayExample;