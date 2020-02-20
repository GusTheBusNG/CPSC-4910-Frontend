import { gql } from 'apollo-boost';

export const insertDriver = gql`
  mutation insertDriver(
    $description: String!,
    $email: String!,
    $firstName: String!,
    $lastName: String!,
    $password: String!
  ) {
    insert_Drivers(objects: {
      description: $description,
      User: {
        data: {
          email: $email,
          firstName: $firstName,
          lastName: $lastName,
          password: $password,
          role: "Driver"
        }
      }
    }) {
      returning {
        description
        User {
          id
          email
          firstName
          lastName
          password
          role
        }
      }
    }
  }
`;

export const insertSponsor = gql`
  mutation insertSponsor(
    $companyDescription: String!,
    $companyName: String!,
    $companyPointToDollarRatio: numeric!,
    $email: String!,
    $firstName: String!,
    $lastName: String!,
    $password: String!
  ) {
    insert_Sponsors(objects: {
      Company: {
        data: {
          description: $companyDescription,
          name: $companyName,
          pointToDollarRatio: $companyPointToDollarRatio
        }
      },
      User: {
        data: {
          email: $email,
          firstName: $firstName,
          lastName: $lastName,
          role: "Sponsor",
          password: $password
        }
      }
    }) {
      returning {
        User {
          id
          email
          firstName
          lastName
          password
          role
        }
        Company {
          id
          name
          description
          pointToDollarRatio
        }
      }
    }
  }
`;

export const addSponsorToCompany = gql`
  mutation insertSponsor(
    $companyId: Int!,
    $email: String!,
    $firstName: String!,
    $lastName: String!,
    $password: String!
  ) {
    insert_Sponsors(objects: {
      User: {
        data: {
          email: $email,
          firstName: $firstName,
          lastName: $lastName,
          role: "Sponsor",
          password: $password
        }
      },
      companyId: $companyId
    }) {
      returning {
        User {
          id
          email
          firstName
          lastName
          password
          role
        }
        Company {
          id
          name
          description
          pointToDollarRatio
        }
      }
    }
  }
`;

export const deleteDriver = gql`
  mutation deleteDriver(
    $id: Int!
  ) {
    delete_Drivers(where: {User: {id: {_eq: $id}}}) {
      returning {
        description
      }
    }
    delete_Users(where: {id: {_eq: $id}}) {
      returning {
        id
        firstName
        lastName
      }
    }
  }
`;

export const updateDriver = gql`
  mutation updateDriver(
    $id: Int!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $description: String!
  ) {
    update_Drivers(where: {userId: {_eq: $id}}, _set: {description: $description}) {
      returning {
        description
      }
    }
    update_Users(where: {id: {_eq: $id}}, _set: {email: $email, firstName: $firstName, lastName: $lastName, password: $password}) {
      returning {
        email
        firstName
        lastName
        password
        id
      }
    }
  }
`;

export const deleteSponsor = gql`
  mutation deleteSponsor(
    $id: Int!
  ) {
    delete_Sponsors(where: {userId: {_eq: $id}}) {
      returning {
        userId
      }
    }
    delete_Users(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`;

export const updateSponsor = gql`
  mutation MyMutation(
    $id: Int!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    update_Users(where: {id: {_eq: $id}}, _set: {email: $email, firstName: $firstName, lastName: $lastName, password: $password}) {
      returning {
        email
        firstName
        lastName
        password
        id
      }
    }
  }
`;

export const deleteCompany = gql`
  mutation MyMutation(
    $id: Int!
  ) {
    delete_Sponsors(where: {companyId: {_eq: $id}}) {
      returning {
        userId
      }
    }
    delete_Companies(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
    delete_DriverCompanies(where: {companyId: {_eq: $id}}) {
      returning {
        companyId
      }
    }
  }
`;

export const updateCompany = gql`
  mutation updateCompany(
    $id: Int!
    $description: String!
    $name: String!
    $pointToDollarRatio: numeric!
  ) {
    update_Companies(where: {id: {_eq: $id}}, _set: {description: $description, name: $name, pointToDollarRatio: $pointToDollarRatio}) {
      returning {
        name
        pointToDollarRatio
        description
        id
      }
    }
  }
`;