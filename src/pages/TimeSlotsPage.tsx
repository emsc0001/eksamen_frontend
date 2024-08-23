import React, { useState, useEffect } from 'react';
import { getAllTimeSlots, createTimeSlot, deleteTimeSlot, removeEventFromTimeSlot } from '../services/apiFacade';

const TimeSlotsPage = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState({
        startTime: '',
        endTime: ''
    });
    const [eventId, setEventId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const slotsData = await getAllTimeSlots();
            setTimeSlots(slotsData);
        };

        fetchData();
    }, []);

    const handleCreateTimeSlot = async (e) => {
        e.preventDefault();
        try {
            const response = await createTimeSlot(newTimeSlot);
            setTimeSlots([...timeSlots, response]);
            setNewTimeSlot({ startTime: '', endTime: '' });
        } catch (error) {
            console.error("Error creating time slot:", error);
        }
    };

    const handleAddEvent = async (timeSlotId) => {
        try {
            const updatedTimeSlot = await addEventToTimeSlot(timeSlotId, eventId);
            setTimeSlots(timeSlots.map(slot => slot.id === updatedTimeSlot.id ? updatedTimeSlot : slot));
        } catch (error) {
            console.error("Error adding event to time slot:", error);
        }
    };

    const handleRemoveEvent = async (timeSlotId, eventId) => {
        try {
            const updatedTimeSlot = await removeEventFromTimeSlot(timeSlotId, eventId);
            setTimeSlots(timeSlots.map(slot => slot.id === updatedTimeSlot.id ? updatedTimeSlot : slot));
        } catch (error) {
            console.error("Error removing event from time slot:", error);
        }
    };

    const handleDeleteTimeSlot = async (id) => {
        try {
            await deleteTimeSlot(id);
            setTimeSlots(timeSlots.filter(slot => slot.id !== id));
        } catch (error) {
            console.error("Error deleting time slot:", error);
        }
    };

    return (
        <div>
            <h1>Time Slots</h1>
            <form onSubmit={handleCreateTimeSlot}>
                <input
                    type="datetime-local"
                    value={newTimeSlot.startTime}
                    onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
                    required
                />
                <input
                    type="datetime-local"
                    value={newTimeSlot.endTime}
                    onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
                    required
                />
                <button type="submit">Create Time Slot</button>
            </form>

            <ul>
                {timeSlots.map(slot => (
                    <li key={slot.id}>
                        {slot.startTime} - {slot.endTime}
                        <input
                            type="text"
                            placeholder="Event ID"
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                        />
                        <button onClick={() => handleAddEvent(slot.id)}>Add Event</button>
                        <button onClick={() => handleRemoveEvent(slot.id, eventId)}>Remove Event</button>
                        <button onClick={() => handleDeleteTimeSlot(slot.id)}>Delete Time Slot</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimeSlotsPage;
