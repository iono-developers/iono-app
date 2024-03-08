import EventService, { EventDetailsData, EventInviteData } from '../../services/EventService';
import { useAuth, AuthContextData } from '../../context/AuthContext';
import Loading from '../Utils/Loading';

import './EventDetails.scss'
import '../../styles/main.scss'

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Define the EventDetails functional component
const EventDetails: React.FC = () => {

  // Initialize parameters from URL, login information, event detail,
  // loading screen and the current user invitation details
  const { eventId } = useParams<{ eventId: string }>();
  const { user_id, username } = useAuth() as AuthContextData;
  const [eventDetails, setEventDetails] = useState<EventDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUserInvite = eventDetails?.invites.find(invite => invite.invitee.username === username);

  // This should be done in backend
  const refusedCount = eventDetails?.invites.filter(invite => invite.rejected).length;
  const invitedCount = eventDetails?.invites.length || 0;

  // Effect hook to fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const event = await EventService.getEventDetails(eventId);
        setEventDetails(event);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  // Function to handle user response to event invitation
  const handleResponse = async () => {
    try {
      const response = {
        'event': eventId,
        'invitee': user_id
      }

      // Make API call to refuse event invitation
      await EventService.refuseEvent(response);
      const updatedEvent = await EventService.getEventDetails(eventId);
      setEventDetails(updatedEvent);

    } catch (error) {
      console.error('Error responding to invite:', error);
    }
  };

  // Function to render invite status
  const renderInviteStatus = (invite: EventInviteData) => {
    if (invite.rejected) {
      return <span>{invite.rejected_date} alle {invite.rejected_time}</span>;
    } else {
      return <span>Nessuna Risposta</span>;
    }
  };

  // If the user is not authenticated, display a message or redirect
  if (!user_id) {
    return <p>Please log in to view event details.</p>;
  }

  // If eventDetails is not available yet, show a loading message
  if (loading) {
    return <Loading />;
  }

  // Render the event details along with buttons for user response
  return (
    <div className="event-details-container">

      <h2>{eventDetails?.title}</h2>

      <div className='amount-users'>
        {invitedCount === 1 && refusedCount === 0 ? (
          <p><b>{invitedCount} Utente</b> invitato - <b>Nessun Utente</b> ha rifiutato</p>
        ) : (
          invitedCount === 1 && refusedCount === 1 ? (
            <p><b>{invitedCount} Utente</b> invitato - <b>{refusedCount} Utente</b> ha rifiutato</p>
          ) : (
            invitedCount === 1 ? (
              <p><b>{invitedCount} Utente</b> invitato - <b>{refusedCount} Utenti</b> hanno rifiutato</p>
            ) : (
              refusedCount === 1 ? (
                <p><b>{invitedCount} Utenti</b> invitati - <b>{refusedCount} Utente</b> ha rifiutato</p>
              ) : (
                <p><b>{invitedCount} Utenti</b> invitati - <b>{refusedCount} Utenti</b> hanno rifiutato</p>
              )
            )
          )
        )}
      </div>

      <div className="base-container">
        <div className="emoji">📅</div>
        <div className="text-infos">
          <div className="top-text"><b>{eventDetails?.expiration_date}</b></div>
          <div className="bottom-text">Ore {eventDetails?.expiration_time}</div>
        </div>
      </div>

      <p className="details-event-description">{eventDetails?.description}</p>

      <Link to={`/user/${eventDetails?.creator.username}`}>
        <div className="base-container">
          <div className="emoji">{eventDetails?.creator.emoji}</div>
          <div className="text-infos">
            <div className="top-text">
              <b>{eventDetails?.creator.username}</b>
            </div>
            <div className="bottom-text">Creato {eventDetails?.creation_ago} fa</div>
          </div>
        </div>
      </Link>

      <div className="invitations-section">
        <h3>Invitati</h3>
        <div className="invitations-list">
          {eventDetails?.invites.map((invite) => (
            <div key={invite.invitee.id} className={`invitation-item ${invite.rejected ? 'refused' : 'pending'}`}>
              <div className="invitee-details">
                <Link to={`/user/${invite.invitee.username}`}>
                  {invite.invitee.emoji} <b>{invite.invitee.username}</b>
                </Link>
              </div>
              <div className="invite-status">{renderInviteStatus(invite)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="user-response-section">
        {currentUserInvite && !currentUserInvite.rejected && (
          <button className='iono' onClick={() => handleResponse()}><b>🗨️ Io No!</b></button>
        )}
      </div>
    </div >
  );
};

export default EventDetails;