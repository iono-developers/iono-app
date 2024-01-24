import React from 'react';
import { Link } from 'react-router-dom';

const EventMini = ({ eventDetails }) => {
  if (!eventDetails) {
    return null;
  }

  const eventDetailsLink = `/events/${eventDetails.id}`;

  return (
    <div className="small-event">
      <h3>{eventDetails.title}</h3>
      <p>Creator: {eventDetails.creator_username}</p>
      <p>Description: {eventDetails.description}</p>
      <Link to={eventDetailsLink}>
        <button>Vai All'evento</button>
      </Link>
    </div>
  );
};

export default EventMini;
