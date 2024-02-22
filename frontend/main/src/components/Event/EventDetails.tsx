import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


import EventService, { EventDetailsData, EventInviteData } from '../../services/EventService';
import { useAuth, AuthContextData } from '../../context/AuthContext';
import Loading from '../Utils/Loading';

import '../../styles/main.scss';

const EventDetails: React.FC = () => {
  // Get the event ID from the URL params
  const { eventId } = useParams<{ eventId: string }>();

  // Access the authentication context to check if the user is authenticated
  const { user_id, username } = useAuth() as AuthContextData;

  // State to store the details of the event
  const [eventDetails, setEventDetails] = useState<EventDetailsData | null>(null);

  // State to handle loading status
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch event details when the component mounts
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Call the EventService to get details of the event using the eventId
        const event = await EventService.getEventDetails(eventId);
        // Update the state with the retrieved event details
        setEventDetails(event);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    // Call the fetchEventDetails function
    fetchEventDetails();
  }, [eventId]);

  // Handle user response to the event invitation
  const handleRespond = async (response: 'accept' | 'decline') => {
    try {
      const response = {
        'event': eventId,
        'invitee': user_id
      }

      // Call the EventService to respond to the event invitation
      await EventService.refuseEvent(response);

      // Fetch the updated event details from the server
      const updatedEvent = await EventService.getEventDetails(eventId);

      // Update the local state with the updated event details
      setEventDetails(updatedEvent);

      // Handle the response, e.g., update local state or trigger a refresh
    } catch (error) {
      console.error('Error responding to invite:', error);
      // Handle error gracefully, e.g., show a notification to the user
    }
  };

  const renderInviteStatus = (invite: EventInviteData) => {
    if (invite.rejected) {
      return <span>{invite.rejected_date} alle {invite.rejected_time}</span>;
    } else {
      return <span>Nessuna Risposta</span>;
    }
  };

  // If the user is not authenticated, display a message or redirect
  if (!username) {
    return <p>Please log in to view event details.</p>;
  }

  // If eventDetails is not available yet, show a loading message
  if (loading) {
    return <Loading />;
  }

  // Check if the current user is invited to the event
  const currentUserInvite = eventDetails?.invites.find(invite => invite.invitee.username === username);

  // Render the event details along with buttons for user response
  return (
    <div className="event-details-container">
      <h2>{eventDetails?.title}</h2>

      <p>
        Creato da{' '}
        <Link to={`/users/${eventDetails?.creator.username}`}>
          {eventDetails?.creator.username}
        </Link>{' '}
        il <b>{eventDetails?.creation_date}</b> alle{' '}
        <b>{eventDetails?.creation_time}</b>
      </p>

      <p>
        Scade il <b>{eventDetails?.expiration_date}</b> alle{' '}
        <b>{eventDetails?.expiration_time}</b>
      </p>
      <p className="details-event-description">{eventDetails?.description}</p>

      <div className="invitations-section">
        <h3>Invitati</h3>
        <table className="invitations-table">
          <tbody>
            {eventDetails?.invites.map((invite) => (
              <tr key={invite.invitee.id} className={invite.rejected ? 'refused' : 'pending'}>
                <td>{invite.invitee.username}</td>
                <td>{renderInviteStatus(invite)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="user-response-section">
        {/* Renderizza il pulsante solo se l'utente corrente è invitato */}
        {currentUserInvite && !currentUserInvite.rejected &&  (
          <button className='iono' onClick={() => handleRespond('decline')}><b>🗨️ Io No!</b></button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;