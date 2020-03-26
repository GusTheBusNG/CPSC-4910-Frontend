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
        {loading ? "Loading..." : null}
        {error ? "Something went wrong" : null}
        {data.Notifications.map(({message, date}, index) => (
          <Popover.Title key={index}> {message} </Popover.Title>
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
        <Badge variant="danger">{data.Notifications.length}
        </Badge>
      </Nav.Link>
    </OverlayTrigger>
  )
}

export default Notifications;
