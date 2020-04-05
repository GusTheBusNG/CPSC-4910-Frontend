// makePreferences({variables: {
//   userId: data.User[0].id
// }})
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {insertPreferences, updatePreferences} from '../../state/mutations'
import {fetchPreferences} from '../../state/queries'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './index.css'

const Preferences = ({userId}) => {
  const { loading, error, data, refetch} = useQuery(fetchPreferences, {
    variables: { userId }
  });
  const [makePreferences] = useMutation(insertPreferences);
  const [updatePrefs, {loading: updateLoading, error: updateError}] = useMutation(updatePreferences);

  if (loading) return <p> loading... </p>
  if (error) return <p> Something went wrong </p>
  if (data.points === "undefined") {
    makePreferences({variables: {
      userId
    }})
    refetch()
  }

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    updatePrefs({variables: {
      userId,
      points: form.points.checked,
      order: form.order.checked,
      error: form.error.checked,
    }})
  }
  return (
    <div className="preferences">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="points">
          <Form.Check defaultChecked={data.Permissions[0].points} label="Point changes" type={"checkbox"} />
        </Form.Group>
        <Form.Group controlId="order">
          <Form.Check defaultChecked={data.Permissions[0].order} label="Order updates" type={"checkbox"} />
        </Form.Group>
        <Form.Group controlId="error">
          <Form.Check defaultChecked={data.Permissions[0].error} label="Errors" type={"checkbox"} />
        </Form.Group>
        <Button variant="primary" type="submit">
          { updateLoading ? "Loading..." : "Submit" }
        </Button>
        <Form.Text>
          { updateError ? <p>Something went wrong</p> : null }
        </Form.Text>
      </Form>
    </div>
  )
}

export default Preferences;
