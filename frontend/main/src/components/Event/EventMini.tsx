import { EventDetailsData } from '../../services/EventService';

import '../../styles/main.scss';
import './EventMini.scss';

import React from 'react';
import { Link } from 'react-router-dom';


const EventMini: React.FC<{ eventDetails: EventDetailsData }> = ({ eventDetails }) => {
  const eventDetailsLink = `/event/${eventDetails.id}`;

  if (!eventDetails) {
    return null;
  }

  return (
    <div className="event-mini-container">
      <div className="event-mini">
        <h2>{eventDetails.title}</h2>
        <p>{eventDetails.creator.emoji} <Link to={`/user/${eventDetails.creator.username}`}>{eventDetails.creator.username}</Link> · {eventDetails.creation_ago} fa</p>
        <p>Scade il <b>{eventDetails.expiration_date}</b> alle <b>{eventDetails.expiration_time}</b></p>
        <Link to={eventDetailsLink}>
          <button>Vai All'evento</button>
        </Link>
      </div>
    </div>
  );
};

export default EventMini;