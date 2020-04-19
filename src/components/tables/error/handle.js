import React from 'react'
import ErrorModal from './modal';

const HandleError = ({
  error: { get, insert, update, delete: deleteError },
  messages,
  refetch
}) => {
  if (get) {
    return <ErrorModal title={messages.get.title} description={messages.get.description} refetch={refetch} />
  } else if (insert) {
    return <ErrorModal title={messages.insert.title} description={messages.insert.description} />
  } else if (update) {
    return <ErrorModal title={messages.update.title} description={messages.update.description} />
  } else if (deleteError) {
    return <ErrorModal title={messages.deleteError.title} description={messages.deleteError.description} />
  }
}

export default HandleError;

// Predefine titles and descriptions here so they
// don't take up so much space in each component

export const ALL_ADMINS = {
  get: {
    title: 'Get Admins Failed',
    description: 'We tried to get all the admin information, but something went wrong, please refresh to try again.',
  },
  insert: {
    title: 'Making a new admin failed',
    description: 'We tried to make a new admin account, but something went wrong, try again please.'
  },
  update: {
    title: 'Updating an admin failed',
    description: 'We tried to update the admin account, but something went wrong, try again please.'
  },
  delete: {
    title: 'Deleting an admin failed',
    description: 'We tried to delete an admin account, but something went wrong, try again please.'
  },
}

export const ALL_DRIVERS = {
  get: {
    title: 'Get Drivers Failed',
    description: 'We tried to get all the driver information, but something went wrong, please refresh to try again.',
  },
  insert: {
    title: 'Making a new driver failed',
    description: 'We tried to make a new driver account, but something went wrong, try again please.'
  },
  update: {
    title: 'Updating a driver failed',
    description: 'We tried to update the driver account, but something went wrong, try again please.'
  },
  delete: {
    title: 'Deleting a driver failed',
    description: 'We tried to delete the driver account, but something went wrong, try again please.'
  },
}

export const ALL_COMPANIES = {
  get: {
    title: 'Get Companies Failed',
    description: 'We tried to get all the companies information, but something went wrong, please refresh to try again.',
  },
  update: {
    title: 'Updating a company failed',
    description: 'We tried to update the company account, but something went wrong, try again please.'
  },
  delete: {
    title: 'Deleting a company failed',
    description: 'We tried to delete the company account, but something went wrong, try again please.'
  },
}

export const ALL_DRIVER_APPLICATIONS = {
  get: {
    title: 'Get Driver Applications Failed',
    description: 'We tried to get all the driver application information, but something went wrong, please refresh to try again.',
  },
  insert: {
    title: 'Making a new driver application failed',
    description: 'We tried to make a new driver application account, but something went wrong, try again please.'
  },
  update: {
    title: 'Updating a driver application failed',
    description: 'We tried to update the driver application account, but something went wrong, try again please.'
  },
  delete: {
    title: 'Deleting a driver application failed',
    description: 'We tried to delete a driver application account, but something went wrong, try again please.'
  },
}

export const ADD_CATALOG = {
  get: {
    title: 'Get Catalog Failed',
    description: 'We tried to get all the catalog information, but something went wrong, please refresh to try again.',
  },
  insert: {
    title: 'Making a new catalog entry failed',
    description: 'We tried to make a new catalog entry account, but something went wrong, try again please.'
  }
}

export const CATALOG = {
  get: {
    title: 'Get Catalog Failed',
    description: 'We tried to get all the catalog information, but something went wrong, please refresh to try again.',
  },
  delete: {
    title: 'Deleting an entry in the catalog failed',
    description: 'We tried to delete an entry in the catalog, but something went wrong, try again please.'
  }
}

export const ALL_SPONSORS = {
  get: {
    title: 'Get Sponsors Failed',
    description: 'We tried to get all the sponsor information, but something went wrong, please refresh to try again.',
  },
  update: {
    title: 'Updating a sponsor failed',
    description: 'We tried to update the sponsor account, but something went wrong, try again please.'
  },
  delete: {
    title: 'Deleting a sponsor failed',
    description: 'We tried to delete a sponsor account, but something went wrong, try again please.'
  },
}

export const SHOPPING_CART = {
  get: {
    title: 'Get Shopping Cart Failed',
    description: 'We tried to get all the shopping cart information, but something went wrong, please refresh to try again.',
  },
  insert: {
    title: 'Making a new shopping cart entry failed',
    description: 'We tried to make a new shopping cart entry, but something went wrong, try again please.'
  },
  update: {
    title: 'Updating a shopping cart entry failed',
    description: 'We tried to update the shopping cart entry, but something went wrong, try again please.'
  },
  delete: {
    title: 'Deleting a shopping cart entry failed',
    description: 'We tried to delete a shopping cart entry, but something went wrong, try again please.'
  },
}