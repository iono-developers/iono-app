import { get, post } from '../utils/api';
import { UserData } from './UsersService';



// Interface for creating a new event
export interface EventCreateData {
  title: string;
  creator: string | null;
  description: string;
  expired_at: string;
  invites: string[];
}

// Interface for an event invitation
export interface EventInviteData {
  invitee: UserData;
  rejected: boolean;
  rejected_time: string;
  rejected_date: string;
}

// Interface for event details
export interface EventDetailsData {
  id: string;
  title: string;
  creator: UserData;
  description: string;
  creation_date: string;
  creation_time: string;
  expiration_date: string;
  expiration_time: string;
  invites: EventInviteData[];
}

// Interface for refusing an event invitation
export interface RefuseEventData {
  event: string;
  invitee: string;
}

const EventService = {
  // Function to retrieve a single event from the backend
  getEventDetails: async (eventId: string): Promise<EventDetailsData> => {
    try {
      const response = await get<EventDetailsData>(`/events/${eventId}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to retrieve the list of all events from the backend
  getAllEvents: async (): Promise<EventDetailsData[]> => {
    try {
      const response = await get<EventDetailsData[]>('/events/all/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to retrieve open events from the backend
  getOpenEvents: async (): Promise<EventDetailsData[]> => {
    try {
      const response = await get<EventDetailsData[]>('/events/open/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to retrieve past events from the backend
  getPastEvents: async (): Promise<EventDetailsData[]> => {
    try {
      const response = await get<EventDetailsData[]>('/events/past/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to retrieve events associated with a particular host from the backend
  getHostEvents: async (host: string): Promise<EventDetailsData[]> => {
    try {
      const response = await get<EventDetailsData[]>(`/events/host/${host}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to create a new event
  createEvent: async (eventData: any): Promise<EventDetailsData> => {
    try {
      const response = await post<EventDetailsData>('/events/create/', eventData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to refuse an existing event
  refuseEvent: async (eventData: any): Promise<RefuseEventData> => {
    try {
      const response = await post<RefuseEventData>('/events/iono/', eventData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to respond to an event invitation
  respondToInvite: async (eventId: string, response: any): Promise<EventDetailsData> => {
    try {
      const inviteResponse = await post<EventDetailsData>(`/events/${eventId}/respond`, { response });
      return inviteResponse.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },
};

export default EventService;
