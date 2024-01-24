// EventContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import EventService from '../services/EventService';

// Create an event context
const EventContext = createContext();

export default EventContext;

export const EventProvider = ({ children }) => {
  // State to manage event-related data
  const [events, setEvents] = useState([]);

  // Additional event-related state or functions can be added as needed

  // useEffect to fetch events on component mount
  useEffect(() => {
    // Placeholder logic to fetch events, replace with your data fetching
    const fetchEvents = async () => {
      try {
        // Replace this with your actual data fetching logic
        const fetchedEvents = await EventService.getEvents();

        // Update the state with the fetched events
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call the fetchEvents function on component mount
    fetchEvents();
  }, []);

  // Value object to be provided to components consuming this context
  const contextValue = {
    events,
    // Additional event-related values or functions can be added here
  };

  // Provide the context value to its children components
  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

