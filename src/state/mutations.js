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

export const deleteDriverApplication = gql`
  mutation deleteDriverApplication(
    $companyId: Int!
    $userId: Int!
  ) {
    delete_DriverCompanies(where: {companyId: {_eq: $companyId}, Driver: {userId: {_eq: $userId}}}) {
      returning {
        companyId
        Driver {
          userId
        }
      }
    }
  }
`;

export const updateDriverApplication = gql`
  mutation updateDriverApplication(
    $companyId: Int!
    $userId: Int!
    $points: numeric!
    $applicationAccepted: Boolean!
  ) {
    update_DriverCompanies(
      where: {
        companyId: { _eq: $companyId },
        Driver: { userId: { _eq: $userId } }
      },
      _set: {
        points: $points,
        activeRelationship:
        $applicationAccepted
      }) {
      returning {
        Company {
          id
          name
        }
        Driver {
          User {
            id
            email
          }
        }
        activeRelationship
        points
      }
    }
  }
`;

export const insertDriverApplication = gql`
  mutation MyMutation(
    $companyId: Int!
    $driverId: Int!
    $points: numeric = 0.0
    $applicationAccepted: Boolean = false
  ) {
    insert_DriverCompanies(objects: {
      activeRelationship: $applicationAccepted,
      points: $points,
      companyId: $companyId,
      driverId: $driverId
    }) {
      returning {
        points
        activeRelationship
        Driver {
          User {
            email
            id
          }
        }
        Company {
          name
          id
        }
      }
    }
  }
`;

export const insertProductToCatalog = gql`
  mutation insertProductToCatalog(
    $companyId: Int!
    $endTime: timestamptz!
    $ebayLink: String!
    $photo: String!
    $price: money!
    $title: String!
  ) {
    insert_Products(objects: {
      Catalogs: { data: { companyId: $companyId} },
      endTime: $endTime,
      link: $ebayLink,
      photo: $photo,
      price: $price,
      title: $title
    }) {
      returning {
        title
        price
        photo
        link
        endTime
      }
    }
  }
`;

export const updateDriverDescription = gql`
  mutation updateDriverDescription($id: Int, $description: String) {
    __typename
    update_Drivers(where: {id: {_eq: $id}}, _set: {description: $description}) {
      returning {
        description
      }
    }
}
`;

export const updateDriverNameAndEmail = gql`
  mutation updateDriverNameAndEmail($id: Int, $email: String, $firstName: String, $lastName: String) {
    __typename
    update_Users(where: {Driver: {id: {_eq: $id}}}, _set: {email: $email, firstName: $firstName, lastName: $lastName}) {
      returning {
        email
        firstName
        lastName
      }
    }
  }
`;

export const deleteItemFromCatalog = gql`
  mutation deleteItemFromCatalog(
    $productId: Int!
    $companyId: Int!
  ) {
    delete_Catalog(where: {productId: {_eq: $productId}, companyId: {_eq: $companyId}}) {
      returning {
        productId
      }
    }
  }
`;

export const changePassword = gql`
  mutation changePassword($id: Int, $password: String) {
    __typename
    update_Users(where: {id: {_eq: $id}}, _set: {password: $password}) {
      returning {
        id
      }
    }
  }
`;
