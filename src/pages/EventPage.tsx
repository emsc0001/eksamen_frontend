import React, { useState, useEffect } from 'react';
import { getAllEvents, createEvent, deleteEvent, getAllTracks, getAllDisciplines } from '../services/apiFacade';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [newEvent, setNewEvent] = useState({
        name: '',
        participantAgeGroup: '',
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

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const eventData = {
            name: newEvent.name,
            ageGroup: newEvent.participantAgeGroup,
            gender: newEvent.participantGender.toUpperCase(), // Ensure correct enum format
            discipline: newEvent.discipline.toUpperCase(), // Ensure correct enum format
            trackId: parseInt(newEvent.trackId, 10), // Ensure trackId is a number
        };
    
        console.log("Sending event data:", eventData);
    
        try {
            const response = await createEvent(eventData);
            const updatedEvents = await getAllEvents();
            setEvents(updatedEvents);
            // Clear the form
            setNewEvent({
                name: '',
                participantAgeGroup: '',
                participantGender: 'Male',
                discipline: '',
                trackId: '',
            });
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };
    
    
    

    const handleDeleteEvent = async (id) => {
        await deleteEvent(id);
        const updatedEvents = await getAllEvents();
        setEvents(updatedEvents);
    };

    return (
        <div style={{ color: 'white' }}>
            <h1>Create a New Event</h1>
            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                />
                <input
                    type="text"
                    placeholder="Participant Age Group"
                    value={newEvent.participantAgeGroup}
                    onChange={(e) => setNewEvent({ ...newEvent, participantAgeGroup: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                />
                <select
                    value={newEvent.participantGender}
                    onChange={(e) => setNewEvent({ ...newEvent, participantGender: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
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
                <select
                    value={newEvent.trackId}
                    onChange={(e) => setNewEvent({ ...newEvent, trackId: e.target.value })}
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
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>Create Event</button>
            </form>

            <h2>Planned Events</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {events.map((event) => (
                    <li key={event.id} style={{ marginBottom: '10px' }}>
                        {`${event.name} - ${event.discipline} - ${event.participantAgeGroup} - ${event.participantGender}`}
                        <button onClick={() => handleDeleteEvent(event.id)} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '4px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventPage;
