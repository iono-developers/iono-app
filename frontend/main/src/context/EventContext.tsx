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
import EventService, { EventDetailsData } from '../services/EventService';

// Define the shape of the event context data
interface EventContextData {
    events: EventDetailsData[];
    updateEvents: () => void; // Function to update events
}

// Create the event context
const EventContext = createContext<EventContextData>({ events: [], updateEvents: () => { } });
export default EventContext;

// EventProvider component to manage event-related data
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to manage event-related data
    const [events, setEvents] = useState<any[]>([]); // Modify 'any' to the type of your events if known

    // useEffect to fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to fetch events from the backend
    const fetchEvents = async () => {
        try {
            const fetchedEvents = await EventService.getEvents();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Function to update events
    const updateEvents = async () => {
        try {
            await fetchEvents(); // Fetch fresh events
        } catch (error) {
            console.error('Error updating events:', error);
        }
    };

    // Value object to be provided to components consuming this context
    const contextValue: EventContextData = {
        events,
        updateEvents,
    };

    // Provide the context value to its children components
    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
};


