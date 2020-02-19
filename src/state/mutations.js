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
      points: "0.0",
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
        points
        User {
          email
          firstName
          lastName
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
          email
          firstName
          lastName
          role
        }
        Company {
          name
          description
        }
      }
    }
  }
`;

export const deleteDriver = gql`
  mutation deleteDriver(
    $id: numeric!
  ) {
    deleteDriver(where: {id: {_eq: $id}, User: {role: {_eq: "Driver"}}}) {
      returning {
        User {
          firstName
          lastName
        }
      }
    }
  }
`;
