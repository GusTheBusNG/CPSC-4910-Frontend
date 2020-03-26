import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import React from 'react';

import './index.css'

import { useQuery, useMutation } from '@apollo/react-hooks';
import { fetchNotifications } from '../../state/queries';
import { clearNotification } from '../../state/mutations';

const Notifications = ({userId}) => {
  const { data, loading, error, refetch } = useQuery(fetchNotifications, { variables: { id: userId } });
  const [setShown] = useMutation(clearNotification);

  async function clearNotifications() {
    await data.Notifications.map(({notificationId}) => (
      setShown({ variables: {
        notificationId
      }})
    ))
    await refetch();
  }

  async function refresh() {
    await refetch();
  }

  function renderPopover(props) {
    return (
      <Popover id="popover-basic" {...props}>
        <Button variant='link' onClick={refresh}> Refresh </Button>
        <Button variant='link' onClick={clearNotifications} className="rightAlign"> Clear all </Button>
        {loading ? "Loading..." : null}
        {error ? "Something went wrong" : null}
        {data.Notifications.map(({message, date}, index) => (
          <Popover.Title key={index}> {message} {index} </Popover.Title>
        ))}
      </Popover>
    )
  }
  if (error) return <p> error </p>
  if (loading) return <p> loading...</p>

  return (
    <OverlayTrigger rootClose={true} trigger="click" placement="bottom" overlay={renderPopover}>
      <Nav.Link>
      Alerts {' '}
        <Badge variant={data.Notifications.length ? "danger" : "light"}>{data.Notifications.length}
        </Badge>
      </Nav.Link>
    </OverlayTrigger>
  )
}

export default Notifications;
