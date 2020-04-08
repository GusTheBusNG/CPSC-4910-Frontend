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

  if (loading) return <></>
  if (error) return <></>

  const handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (data.Permissions.length === 0) {
      await makePreferences({ variables: {
        userId,
        points: form.points.checked,
        order: form.order.checked,
        error: form.error.checked,
      }})
    } else {
      await updatePrefs({variables: {
        userId,
        points: form.points.checked,
        order: form.order.checked,
        error: form.error.checked,
      }})
    }
    refetch()
  }

  let points = true;
  let order = true;
  let permissionsError = true;

  if (data.Permissions.length !== 0) {
    points = data.Permissions[0].points
    order = data.Permissions[0].order
    permissionsError = data.Permissions[0].error
  }

  return (
    <div className="preferences">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="points">
          <Form.Check defaultChecked={points} label="Point changes" type={"checkbox"} />
        </Form.Group>
        <Form.Group controlId="order">
          <Form.Check defaultChecked={order} label="Order updates" type={"checkbox"} />
        </Form.Group>
        <Form.Group controlId="error">
          <Form.Check defaultChecked={permissionsError} label="Errors" type={"checkbox"} />
        </Form.Group>
        <Button variant="primary" type="submit">
          { updateLoading ? "Loading..." : "Submit" }
        </Button>
        <Form.Text>
          { updateError ? "Something went wrong" : null }
        </Form.Text>
      </Form>
    </div>
  )
}

export default Preferences;
