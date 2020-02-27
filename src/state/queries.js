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

export const fetchDriver = gql`
  query Drivers($id: Int) {
    Drivers(where: {id: {_eq: $id}}) {
      description
      User {
        email
        firstName
        lastName
      }
    }
  }
`;
