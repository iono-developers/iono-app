/**
 * EventContext Component:
 * 
 * This component serves as a context provider for managing event-related data
 * within a React application. It utilizes the Context API to share event data
 * and functions with components that need them.
 * 
 * Useful for:
 * - Managing and sharing event-related state across multiple components.
 * - Fetching and updating event data in a centralized location.
 * - Utilizing the Context API to provide a consistent interface for components.
 * 
 * When to use:
 * - Integrate this EventContext component at the top level of your React
 *   application to manage event-related data throughout the app.
 * - Ideal for applications with features that involve events, such as calendars,
 *   schedules, or event-based interactions.
 * 
 * Function Usage Comments:
 * - createContext: Creates a context object to store and share event-related data.
 * - EventProvider: Wraps its children components, providing the event-related
 *   context value, which includes the events state and potentially other
 *   event-related values or functions.
 * - useEffect: Fetches events from the server when the component mounts.
 * - setEvents: Updates the state with the fetched events.
 */


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

