/**
 * EventList Component:
 * 
 * This component displays a list of events by utilizing the EventContext to
 * access the events. It renders EventMini components for each event in the list.
 * 
 * Useful for:
 * - Displaying a list of events in a React application.
 * - Utilizing the EventContext to access the events stored in the context.
 * - Dynamically rendering EventMini components based on the available events.
 * 
 * When to use:
 * - Integrate this EventList component where you want to showcase a list of
 *   events, leveraging the EventContext to manage and provide event data.
 * - Ideal for applications with a feature to view and navigate through available events.
 * 
 * Function Usage Comments:
 * - useContext: Accesses the events from the EventContext to dynamically render
 *   EventMini components based on the available events.
 * 
 */

import React, { useContext } from 'react';
import '../../styles/main.scss'; // Importa il file SCSS modificato

import EventMini from './EventMini';
import EventContext from '../../context/EventContext';
import EventNav from './EventsNav';

interface EventListProps { }

const EventList: React.FC<EventListProps> = () => {
  // Access the events from the EventContext
  const { events } = useContext(EventContext);

  return (
    <div>
      <EventNav />
      <div className="event-list-container">
        <div className="event-list-wrapper">
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <EventMini eventDetails={event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;