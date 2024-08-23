import React, { useState, useEffect } from 'react';
import { getAllEvents, createEvent, updateEvent, deleteEvent, getAllTracks, getAllDisciplines, getAllTimeSlots, linkEventToTimeSlot, removeEventFromTimeSlot } from '../services/apiFacade';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        name: '',
        participantGender: 'Male',
        discipline: '',
        trackId: '',
        timeSlotId: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await getAllEvents();
                setEvents(eventsData);
    
                const tracksData = await getAllTracks();
                setTracks(tracksData); // Ensure tracksData is being set correctly
    
                const disciplinesData = await getAllDisciplines();
                setDisciplines(disciplinesData);

                const slotsData = await getAllTimeSlots();
                setTimeSlots(slotsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data');
            }
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

    const handleCreateEvent = async () => {
        try {
            const eventResponse = await createEvent(eventData);
            console.log("Event created successfully:", eventResponse);
    
            // Link the created event to a timeslot
            const linkResponse = await linkEventToTimeSlot(timeSlotId, eventResponse.id);
            console.log("Event linked to timeslot successfully:", linkResponse);
        } catch (error) {
            console.error("Error creating or linking event:", error);
        }
    };
    

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setNewEvent({
            name: event.name,
            participantGender: event.participantGender,
            discipline: event.discipline,
            trackId: event.trackId,
            timeSlotId: event.timeSlotId || '',
        });
    };

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id); // If deleteEvent returns a 204, it will be handled correctly now.
            // Update the state to remove the deleted event
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
            setMessage("Event deleted successfully");
        } catch (error) {
            console.error("Error deleting event:", error);
            setMessage("Error deleting event");
        }
    };
    
    const resetForm = () => {
        setNewEvent({
            name: '',
            participantGender: 'Male',
            discipline: '',
            trackId: '',
            timeSlotId: '',
        });
        setEditingEvent(null);
    };

    return (
        <div style={{ color: 'white' }}>
            <h1>{editingEvent ? "Edit Event" : "Create a New Event"}</h1>

            {message && <div style={{ color: 'yellow', marginBottom: '10px' }}>{message}</div>} {/* Display message here */}

            <form onSubmit={editingEvent ? handleCreateEvent : handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
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
                    {tracks.map((track) => (
                        <option key={track.id} value={track.id}>
                            {track.name}
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

                {/* Dropdown for selecting TimeSlot */}
                <select
                    value={newEvent.timeSlotId || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, timeSlotId: e.target.value })}
                    required
                    style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
                >
                    <option value="">Select TimeSlot</option>
                    {timeSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                            {`${new Date(slot.startTime).toLocaleString()} - ${new Date(slot.endTime).toLocaleString()}`}
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
                        <button
                            onClick={() => removeEventFromTimeSlot(event.timeSlotId, event.id)}
                            style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '4px', backgroundColor: 'orange', color: 'white', cursor: 'pointer' }}>
                            Remove from TimeSlot
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventPage;
