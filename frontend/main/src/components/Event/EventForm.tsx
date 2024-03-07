import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import EventService, { EventCreateData } from '../../services/EventService';
import UserService, { MiniUserData } from '../../services/UsersService';
import { useAuth } from '../../context/AuthContext';
import EventContext from '../../context/EventContext';

import '../../styles/main.scss'; // Import the main SCSS file for global styles

const EventForm: React.FC = () => {
    const history = useHistory();
    const { user_id } = useAuth();
    const { events, allEvents } = useContext(EventContext);

    const [formData, setFormData] = useState<EventCreateData>({
        title: '',
        creator: user_id, // Assuming user_id is the creator ID
        description: '',
        expired_at: '',
        invites: [],
    });

    const [users, setUsers] = useState<MiniUserData[]>([]);
    const [showInviteFriends, setShowInviteFriends] = useState<boolean>(false); // State to toggle between event creation and inviting friends phases

    useEffect(() => {
        // Fetch users from the backend when the component mounts
        const fetchUsers = async () => {
            try {
                const usersData = await UserService.getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInvite = (id: string) => {
        if (!formData.invites.some(invite => invite === id)) {
            setFormData(prevState => ({
                ...prevState,
                invites: [
                    ...prevState.invites,
                    id
                ]
            }));
        }
    };

    const handleRemoveInvite = (id: string) => {
        setFormData(prevState => ({
            ...prevState,
            invites: prevState.invites.filter(invite => invite !== id)
        }));
    };

    const handleSubmitFirstPhase = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowInviteFriends(true); // Move to the second phase of event creation
    };

    const handleSubmitSecondPhase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await EventService.createEvent(formData);
            allEvents()
            history.push('/events/'); // Redirect to the events page
            

        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="container"> {/* Apply container class for centering */}
            <div className="form-container"> {/* Apply login-form class for styling */}
                {!showInviteFriends ? (
                    <>
                        <h2 className="form-title">Crea Sfida!</h2> {/* Add margin below the title */}
                        <form onSubmit={handleSubmitFirstPhase}>
                            <div className="form-group"> {/* Apply form-group class for styling */}
                                <p className='form-name-label'>Titolo:</p>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                            </div>
                            <div className="form-group"> {/* Apply form-group class for styling */}
                                <p  className='form-name-label'>Descrizione:</p >
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} />
                            </div>
                            <div className="form-group"> {/* Apply form-group class for styling */}
                                <p  className='form-name-label'>Data di scadenza:</p >
                                <input type="datetime-local" name="expired_at" value={formData.expired_at} onChange={handleInputChange} />
                            </div>
                            <button type="submit"><b>Invita i tuoi Amici</b></button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="form-container"> {/* Add a container for form styling */}
                            <h2 className="form-title">Invita i tuoi amici</h2>
                            <form onSubmit={handleSubmitSecondPhase}>
                                <div className="form-group">
                                    <ul className="invite-list"> {/* Add a class for the list */}
                                        {users.map(user => (
                                            <li key={user.id} className="invite-list-item">
                                                {user.username}
                                                {formData.invites.includes(user.id) ? (
                                                    <button type="button" className="remove-invite-button" onClick={() => handleRemoveInvite(user.id)}>Remove</button>
                                                ) : (
                                                    <button type="button" className="invite-button" onClick={() => handleInvite(user.id)}>Invite</button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button type="submit">Create Event</button> {/* Use the existing button style */}
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventForm;
