/**
 * EventMini Component:
 * 
 * This component represents a compact view of an event, displaying its title,
 * creator, description, and a link to view more details. It utilizes React Router
 * for navigation to the detailed event page.
 * 
 * Useful for:
 * - Displaying a summarized view of an event in a compact format.
 * - Providing essential details such as title, creator, and description.
 * - Including a link to navigate to the detailed event page for more information.
 * 
 * When to use:
 * - Integrate this EventMini component within your application where you need a
 *   concise representation of an event with a link for further details.
 * - Ideal for use in lists or grids of events.
 * 
 * Function Usage Comments:
 * - Link: Utilizes React Router's Link component to create a navigation link
 *   to the detailed event page based on the event ID.
 * 
 */

import React from 'react';
import { Link } from 'react-router-dom';

interface EventDetails {
  id: string;
  title: string;
  creator_username: string;
  description: string;
}

const EventMini: React.FC<{ eventDetails: EventDetails | null }> = ({ eventDetails }) => {
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
