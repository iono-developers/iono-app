import EventMini from './EventMini';
import EventContext from '../../context/EventContext';
import EventNav from './EventsNav';

import '../../styles/main.scss';
import './EventList.scss';

import React, { useContext } from 'react';


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