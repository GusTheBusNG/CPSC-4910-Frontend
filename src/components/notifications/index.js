import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
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

  const parseDate = date => moment(date).local().format("MM/DD/YYYY hh:mm:ss A")

  const clearNotifications = async () => {
    await Promise.all(data.Notifications.map(({notificationId}) => (
      setShown({ variables: {
        notificationId
      }})
    )))
    await refetch();
  }

  const renderPopover = (props) => {
    data.Notifications.sort((a,b) => {return b.date - a.date})
    return (
      <Popover id="popover-basic" {...props}>
        <Button variant='link' onClick={() => refetch()}> Refresh </Button>
        <Button variant='link' onClick={clearNotifications} className="rightAlign"> Clear all </Button>
        {loading && "Loading..."}
        {error && "Something went wrong"}
        {data.Notifications.map(({message, date, type, Permissions}, index) => (
          <Popover.Title key={index}>
            {parseDate(date)}
            <Popover.Content>{message}</Popover.Content>
          </Popover.Title>
        ))}
      </Popover>
    )
  }
  if (error) return <p> error </p>
  if (loading) return <p> loading...</p>

  data.Notifications.forEach(function(item, index, object) {
    if (item.Permissions[item.type] === false) {
      object.splice(index, 1);
    }
  });

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
