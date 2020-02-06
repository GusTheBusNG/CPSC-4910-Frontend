import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getUsersFirstName, login } from '../../state/queries';


const ExampleGraphQL = () => {
  const email = 'asdf@asdf.com';
  const password = 'asdf';
  const { loading, error, data } = useQuery(getUsersFirstName);
  const { loading: lloading, error: lerror, data: ldata } = useQuery(login, {
    variables: { email, password }
  });

  console.log(lloading, lerror, ldata)

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading: {loading}</p>;

  return data.Users.map(({ firstName }) => (
    <p key={firstName}>First Name: {firstName}</p>
  ));
}

export default ExampleGraphQL;