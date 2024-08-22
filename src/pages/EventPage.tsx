import React, { useState, useEffect } from 'react';
import { getAllEvents, createEvent, updateEvent, deleteEvent, getAllTracks, getAllDisciplines } from '../services/apiFacade';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        name: '',
        participantGender: 'Male',
        discipline: '',
        trackId: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await getAllEvents();
            setEvents(eventsData);

            const tracksData = await getAllTracks();
            setTracks(tracksData);

            const disciplinesData = await getAllDisciplines();
            setDisciplines(disciplinesData);
        };

        fetchData();
    }, []);

    const handleTrackChange = (e) => {
        const selectedTrackId = e.target.value;
        const selectedTrack = tracks.find(track => track.id === parseInt(selectedTrackId));
        
        if (selectedTrack) {
            setNewEvent({ ...newEvent, trackId: selectedTrackId, discipline: '' });
            const allowedDisciplines = selectedTrack.disciplines; // Assuming this is an array of disciplines
            setDisciplines(allowedDisciplines);
        } else {
            setDisciplines([]); // Clear disciplines if no track selected
        }
    };
    

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const eventData = {
            name: newEvent.name,
            gender: newEvent.participantGender.toUpperCase(), // Convert to uppercase
            discipline: newEvent.discipline.toUpperCase(), // Convert to uppercase
            trackId: newEvent.trackId,
        };
    
        try {
            const response = await createEvent(eventData);
            console.log("Event created successfully:", response);
            const updatedEvents = await getAllEvents();
            setEvents(updatedEvents);
            resetForm();  // Reset the form after successful creation
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };
    
    
    

    const resetForm = () => {
        setNewEvent({
            name: '',
            participantGender: 'Male',
            discipline: '',
            trackId: '',
        });
    };

    return (
        <div style={{ color: 'white' }}>
            <h1>{editingEvent ? "Edit Event" : "Create a New Event"}</h1>
            <form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                />
                <select
                    value={newEvent.participantGender}
                    onChange={(e) => setNewEvent({ ...newEvent, participantGender: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                {/* Dropdown for selecting Track */}
                <select
                    value={newEvent.trackId}
                    onChange={handleTrackChange}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                >
                    <option value="">Select Track</option>
                    {tracks.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>

                {/* Dropdown for selecting Discipline */}
                <select
                    value={newEvent.discipline}
                    onChange={(e) => setNewEvent({ ...newEvent, discipline: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                >
                    <option value="">Select Discipline</option>
                    {disciplines.map((d) => (
                        <option key={d.id} value={d.name}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
                    {editingEvent ? "Update Event" : "Create Event"}
                </button>
            </form>

            <h2>Planned Events</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {events.map((event) => (
                    <li key={event.id} style={{ marginBottom: '10px' }}>
                        {`${event.name} - ${event.discipline} - ${event.participantGender}`}
                        <button onClick={() => handleEditEvent(event)} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '4px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteEvent(event.id)} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '4px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventPage;
