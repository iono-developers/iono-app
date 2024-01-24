// EventForm.jsx

import React, { useContext, useState } from 'react';

import EventService from '../../services/EventService';
import AuthContext from '../../context/AuthContext';


const EventForm = () => {
    // State to manage form fields

    // Access the authentication context to check if the user is authenticated
    const { user_id } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: null,
        expiration_time: '',
        invites: '',
        creator: user_id,
        created_at: null,
    });

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the EventService to create a new event with the form data
            await EventService.createEvent(formData);

            // Optionally, you can handle success (e.g., redirect to event list)
            console.log('Event created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleInputChange} />
                </label>
                <label>
                    Expire Date:
                    <input type="datetime-local" name="expiration_time" value={formData.expire_date} onChange={handleInputChange} />
                </label>
                <label>
                    Invites:
                    <input type="text" name="invites" value={formData.invites} onChange={handleInputChange} />
                </label>

                {/* Add more form fields as needed */}

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
