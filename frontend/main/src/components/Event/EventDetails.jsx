/**
 * EventDetails Component:
 * 
 * This component displays detailed information about a specific event, including
 * its title, date, creator, description, and invitations. Users can respond to
 * event invitations using the proper button. It utilizes the React Router for
 * handling URL parameters and the AuthContext to check user authentication.
 * 
 * Useful for:
 * - Displaying detailed information about an event, including its title, date,
 *   creator, and description.
 * - Allowing authenticated users to respond to event invitations.
 * - Utilizing React Router for dynamic routing based on event ID in the URL.
 * 
 * When to use:
 * - Integrate this EventDetails component within your React application to
 *   showcase detailed event information and handle user responses.
 * - Ideal for applications with event-based features, where users need to view
 *   and respond to event invitations.
 * 
 * Function Usage Comments:
 * - handleRespond: Handles user responses to event invitations. Calls the
 *   EventService to respond to the invitation and updates local state.
 * 
 */


import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventService from '../../services/EventService';
import AuthContext from '../../context/AuthContext';
import Loading from '../Utils/Loading';

import '../../styles/main.scss';


const EventDetails = () => {
  
  // Get the eventId from the URL parameters
  const { eventId } = useParams();

  // Access the authentication context to check if the user is authenticated
  const { username } = useContext(AuthContext);

  // State to store the details of the event
  const [eventDetails, setEventDetails] = useState(null);

  // Use useEffect to fetch event details when the component mounts
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Call the EventService to get details of the event using the eventId
        const event = await EventService.getEventDetails(eventId);

        // Update the state with the retrieved event details
        setEventDetails(event);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    // Call the fetchEventDetails function
    fetchEventDetails();
  }, [eventId]);

  // Handle user response to the event invitation
  const handleRespond = async (response) => {
    try {
      // Call the EventService to respond to the event invitation
      await EventService.respondToInvite(eventId, response);

      // Handle the response, e.g., update local state or trigger a refresh
    } catch (error) {
      console.error('Error responding to invite:', error);
    }
  };

  // If the user is not authenticated, display a message or redirect
  if (!username) {
    return <p>Please log in to view event details.</p>;
  }

  // If eventDetails is not available yet, show a loading message
  if (!eventDetails) {
    return <Loading/>;
  }

  // Check if the user has already responded to the invitation
  const userResponse = eventDetails.invites.find(invite => invite.invitee_username === username);

  // Render the event details along with buttons for user response
  return (
    <div className="event-details-container">
      <div className="event-header">
        <h2>{eventDetails.title}</h2>
        <p>Date: {eventDetails.expiration_time}</p>
        <p>Creator: {eventDetails.creator_username}</p>
      </div>

      <div className="event-description">
        <p>Description: {eventDetails.description}</p>
      </div>

      <div className="invitations-section">
        <h3>Invitations:</h3>
        <ul>
          {eventDetails.invites.map(invite => (
            <li key={invite.id}>
              {invite.invitee_username} - {invite.rejected ? 'Declined' : 'Pending'}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-response-section">
        {userResponse ? (
          <p>Your response: {userResponse.rejected ? 'Declined' : 'Accepted'}</p>
        ) : (
          <div className="response-buttons">
            <button onClick={() => handleRespond('accept')}>Accept</button>
            <button onClick={() => handleRespond('decline')}>Decline</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;