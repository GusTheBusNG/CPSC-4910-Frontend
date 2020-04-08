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
      isActive
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
        id
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
    Drivers(where: {User: {id: {_eq: $id}}}) {
      description
      User {
        email
        firstName
        lastName
        password
      }
    }
  }
`;

export const fetchSponsorAndCompany = gql `
  query fetchSponsor($userId: Int) {
    Sponsors(where: {userId: {_eq: $userId}}) {
      User {
        email
        firstName
        lastName
        id
      }
      Company {
        id
        name
        description
        pointToDollarRatio
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
        name
        DriverCompanies {
          activeRelationship
          points
          Driver {
            id
            User {
              email
              firstName
              lastName
              id
            }
          }
        }
      }
    }
  }
`

export const getPointToDollar = gql`
  query getPointToDollar($companyId: Int) {
    Companies(where: {id: {_eq: $companyId}}) {
      pointToDollarRatio
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

export const getAllCompletedTransactions = gql`
  query getAllCompletedTransacriptions {
    Companies(where: {DriverCompanies: {activeRelationship: {_eq: true}, Driver: {Transactions: {completed: {_eq: true}}}}}) {
      name
      pointToDollarRatio
      description
      DriverCompanies {
        points
        Driver {
          User {
            email
          }
          Transactions {
            Product {
              title
              price
            }
          }
        }
      }
    }
  }
`;

export const getShoppingCartPerDriver = gql`
  query getShoppingCartPerDriver(
    $driverId: Int!
    $companyId: Int!
  ) {
    ShoppingCart(where: {
      driverId: {_eq: $driverId},
      companyId: {_eq: $companyId}
    }) {
      Product {
        endTime
        link
        photo
        price
        title
        id
      }
      Company {
        pointToDollarRatio
      }
      created_at
      updated_at
      completed
    }
  }
`;

export const getPoints = gql`
  query getDriverCompany(
    $driverId: Int!
    $companyId: Int!
  ) {
    DriverCompanies(where: {
      driverId: {_eq: $driverId},
      companyId: {_eq: $companyId}
    }) {
      points
    }
  }
`;

export const fetchNotifications = gql`
  query fetchNotifications($id: Int) {
    Notifications(where: {id: {_eq: $id}, hasBeenShown: {_eq: false}}) {
      message
      date
      notificationId
      type
      Permissions {
        points
        order
        error
      }
    }
  }
`;

export const getID = gql`
  query getID($userEmail: String!) {
    Users(where: {email: {_eq: $userEmail}}) {
      id
    }
  }
`

export const getTransactionsPerCompany = gql`
  query getTransactionsPerCompany($sponsorId: Int!) {
    Companies(where: {DriverCompanies: {activeRelationship: {_eq: true}, Driver: {Transactions: {completed: {_eq: true}}}}, Sponsors: {id: {_eq: $sponsorId}}}) {
      name
      pointToDollarRatio
      description
      DriverCompanies {
        points
        Driver {
          User {
            email
          }
          Transactions {
            Product {
              title
              price
            }
          }
        }
      }
    }
  }
`;

export const fetchPreferences = gql`
  query fetchPreferences($userId: Int) {
    Permissions(where: {userId: {_eq: $userId}}) {
      error
      order
      points
    }
  }
`;
