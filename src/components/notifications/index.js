import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { fetchNotifications } from '../../state/queries';

const Notifications = ({userId}) => {
  const { data, loading, error, refetch } = useQuery(fetchNotifications, { variables: { id: userId } });

  function renderPopover(props) {
    return (
      <Popover id="popover-basic" {...props}>
        <Popover.Content>
          {loading ? "Loading..." : null}
          {error ? "Something went wrong" : null}
          {data.Notifications.map(({message, date}) => (
            <Popover.Title> {message} </Popover.Title>
          ))}
        </Popover.Content>
      </Popover>
    )
  }
  if (error) return <p> error </p>
  if (loading) return <p> loading...</p>

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={renderPopover}>
      <Nav.Link>
      Alerts {' '}
        <Badge variant="light">{data.Notifications.length}
        </Badge>
      </Nav.Link>
    </OverlayTrigger>
  )
}

export default Notifications;
