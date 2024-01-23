// EventService.js
// This module handles communication with the backend server regarding events.

// Import the API utility for making HTTP requests.
import { get, post, put, del } from '../utils/api';

const EventService = {
  // Function to retrieve a single event from the backend.
  getEventDetails: async (eventId) => {
    try {
      // Send a GET request to the '/events' endpoint.
      const response = await get(`/events/${eventId}`);
      // Return the data received from the server.
      return response.data;
    } catch (error) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to retrieve the list of events from the backend.
  getEvents: async () => {
    try {
      // Send a GET request to the '/events' endpoint.
      const response = await get('/events');
      // Return the data received from the server.
      return response.data;
    } catch (error) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to create a new event by sending a POST request to the '/events' endpoint.
  createEvent: async (eventData) => {
    try {
      // Send a POST request to the '/events' endpoint with the provided event data.
      const response = await post('/events', eventData);
      // Return the data received from the server, typically containing the newly created event details.
      return response.data;
    } catch (error) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to respond to an event invitation by sending a POST request to the '/events/:eventId/respond' endpoint.
  respondToInvite: async (eventId, response) => {
    try {
      // Send a POST request to the specific event's 'respond' endpoint with the response data.
      const response = await post(`/events/${eventId}/respond`, { response });
      // Return the data received from the server, usually indicating a successful response.
      return response.data;
    } catch (error) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },
};

// Export the EventService object to be used in other parts of the application.
export default EventService;
