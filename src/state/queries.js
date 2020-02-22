import { gql } from 'apollo-boost';

export const getUsersFirstName = gql`
  {
    Users {
      firstName
    }
  }
`;

export const login = gql`
  query Users($email: String!, $password: String!) {
    Users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
      email
      firstName
      lastName
      role
      id
      Driver {
        id
      }
      Sponsor {
        id
      }
    }
  }
`;

export const fetchCompanies = gql`
  query DriverCompanies($id: Int) {
    Companies {
      id
      name
      description
      DriverCompanies(where: {driverId: {_eq: $id}}) {
        activeRelationship
        points
      }
    }
  }
`;
