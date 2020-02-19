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
    }
  }
`;

export const getAllDrivers = gql`
  query getAllDrivers {
    Users(where: {role: {_eq: "Driver"}}) {
      id
      firstName
      email
      lastName
      password
      Driver {
        description
        DriverCompanies {
          Company {
            name
          }
          points
        }
      }
    }
  }
`;
