import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getUsersFirstName } from '../../state/queries';


const ExampleGraphQL = () => {
  const { loading, error, data } = useQuery(getUsersFirstName);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading: {loading}</p>;

  return data.Users.map(({ firstName }) => (
    <p key={firstName}>First Name: {firstName}</p>
  ));
}

export default ExampleGraphQL;