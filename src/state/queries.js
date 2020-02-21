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
    Drivers {
      id
      User {
        id
        firstName
        email
        lastName
        password
      }
      description
    }
  }
`;

export const getAllSponsors = gql`
  query getAllSponsors {
    Sponsors {
      User {
        email
        firstName
        id
        lastName
        password
      }
    }
  }
`;

export const getAllCompanies = gql`
  query getAllCompanies {
    Companies {
      id
      name
      pointToDollarRatio
      description
    }
  }
`;

export const getAllDriverApplications = gql`
  query getAllDriverApplications {
    DriverCompanies {
      activeRelationship
      points
      Company {
        name
        id
      }
      Driver {
        User {
          email
          id
        }
      }
    }
  }
`;