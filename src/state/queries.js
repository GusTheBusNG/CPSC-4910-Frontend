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

export const getCompany = gql`
  query getCompany($sponsorId: Int!) {
    Sponsors(where: {id: {_eq: $sponsorId}}) {
      Company {
        id
        name
        pointToDollarRatio
        description
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

export const getCatalog = gql`
  query getCatalog($companyId: Int!) {
    Catalog(where: {companyId: {_eq: $companyId}}) {
      Product {
        id
        link
        photo
        price
        title
        endTime
      }
      Company {
          pointToDollarRatio
      }
    }
  }
`;

export const getPassword = gql`
  query getPassword($id: Int) {
    Users(where: {id: {_eq: $id}}) {
      password
    }
  }
`;

export const getCompanyDrivers = gql`
  query getCompanyDrivers($companyId: Int) {
    Sponsors(where: {companyId: {_eq: $companyId}}) {
      Company {
        DriverCompanies {
          activeRelationship
          points
          Driver {
            id
            User {
              email
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`

export const getAllAdmins = gql`
  query getAllAdmins {
    Users(where: {role: {_eq: "Admin"}}) {
      email
      firstName
      id
      lastName
      password
    }
  }
`;