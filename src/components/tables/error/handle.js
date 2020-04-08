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