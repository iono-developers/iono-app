// EventDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../services/EventService';
import AuthContext from '../../context/AuthContext';
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
        console.log(eventId)
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
    return <p>Loading event details...</p>;
  }

  // Render the event details along with buttons for user response
  return (
    <div>
      <h2>{eventDetails.title}</h2>
      <p>Date: {eventDetails.expiration_time}</p>
      <p>Creator: {eventDetails.creator_username}</p>
      <p>Description: {eventDetails.description}</p>

      {/* Add other event details as needed */}

      {/* Buttons for accepting and declining the event invitation */}
      <button onClick={() => handleRespond('accept')}>Accept</button>
      <button onClick={() => handleRespond('decline')}>Decline</button>
    </div>
  );
};

export default EventDetails;
