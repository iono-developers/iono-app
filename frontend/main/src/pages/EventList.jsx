// EventList.jsx
import React, { useContext } from 'react';
import EventMini from '../components/Event/EventMini';
import EventContext from '../context/EventContext';

const EventList = () => {
  // Access the events from the EventContext
  const { events } = useContext(EventContext);

  return (
    <div>
      <h2>Event List</h2>
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
  );
};

export default EventList;
