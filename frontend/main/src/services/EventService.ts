/**
 * EventService Module:
 * 
 * This module handles communication with the backend server regarding events.
 * It encapsulates functions for retrieving event details, fetching the list of
 * events, creating new events, and responding to event invitations.
 * 
 * Useful for:
 * - Making HTTP requests to the server's '/events' endpoints for event-related operations.
 * - Handling asynchronous operations related to events in a React application.
 * - Encapsulating backend communication logic to keep it separate from components.
 * 
 * When to use:
 * - Integrate this EventService module in components or services where you need
 *   to interact with the server's '/events' endpoints for CRUD operations on events.
 * - Ideal for applications with a backend that supports event-related operations.
 * 
 * Function Usage Comments:
 * - getEventDetails: Retrieves details of a specific event by sending a GET request
 *   to the '/events/:eventId' endpoint. Requires the eventId as a parameter.
 * - getEvents: Retrieves the list of events by sending a GET request to the '/events' endpoint.
 * - createEvent: Creates a new event by sending a POST request to the '/events' endpoint.
 *   Requires eventData, containing the details of the new event, as a parameter.
 * - respondToInvite: Responds to an event invitation by sending a POST request to the
 *   '/events/:eventId/respond' endpoint. Requires eventId and response as parameters.
 * - Exported as EventService: The entire EventService object is exported for use
 *   in other parts of the application.
 */


import { get, post } from '../utils/api';

// Interface for an event invitation
interface EventInvite {
  id: string;
  invitee_username: string;
  rejected: boolean;
}

interface EventDetails {
  title: string;
  expiration_time: string;
  creator_username: string;
  description: string;
  invites: EventInvite[];
}

interface ResponseData {
  // Define the structure of response data from the server as needed
}

const EventService = {
  // Function to retrieve a single event from the backend.
  getEventDetails: async (eventId: string): Promise<EventDetails> => {
    try {
      // Send a GET request to the '/events' endpoint.
      const response = await get<EventDetails>(`/events/${eventId}`);
      // Return the data received from the server.
      return response.data;
    } catch (error : any) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to retrieve the list of events from the backend.
  getEvents: async (): Promise<EventDetails[]> => {
    try {
      // Send a GET request to the '/events' endpoint.
      const response = await get<EventDetails[]>('/events');
      // Return the data received from the server.
      return response.data;
    } catch (error : any) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to create a new event by sending a POST request to the '/events' endpoint.
  createEvent: async (eventData: any): Promise<EventDetails> => {
    try {
      // Send a POST request to the '/events' endpoint with the provided event data.
      const response = await post<EventDetails>('/events/', eventData);
      // Return the data received from the server, typically containing the newly created event details.
      return response.data;
    } catch (error : any) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to respond to an event invitation by sending a POST request to the '/events/:eventId/respond' endpoint.
  respondToInvite: async (eventId: string, response: any): Promise<ResponseData> => {
    try {
      // Send a POST request to the specific event's 'respond' endpoint with the response data.
      const inviteResponse = await post<ResponseData>(`/events/${eventId}/respond`, { response });
      // Return the data received from the server, usually indicating a successful response.
      return inviteResponse.data;
    } catch (error : any) {
      // If an error occurs, throw the server response data or the error message.
      throw error.response ? error.response.data : error.message;
    }
  },
};

// Export the EventService object to be used in other parts of the application.
export default EventService;