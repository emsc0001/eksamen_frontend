// TimeSlotPage.jsx
import React, { useState, useEffect } from 'react';
import { createTimeSlot, getAllTimeSlots } from '../services/apiFacade';

const TimeSlotPage = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState({
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const timeSlotsData = await getAllTimeSlots();
            setTimeSlots(timeSlotsData);
        };
        fetchData();
    }, []);

    const handleCreateTimeSlot = async (e) => {
        e.preventDefault();
        try {
            const response = await createTimeSlot(newTimeSlot);
            console.log("TimeSlot created successfully:", response);
            setTimeSlots([...timeSlots, response]);
            setNewTimeSlot({ startTime: '', endTime: '' });
        } catch (error) {
            console.error("Error creating TimeSlot:", error);
        }
    };

    return (
        <div>
            <h1>Create a New TimeSlot</h1>
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
                <button type="submit">Create TimeSlot</button>
            </form>

            <h2>All TimeSlots</h2>
            <ul>
                {timeSlots.map((slot) => (
                    <li key={slot.id}>{`${new Date(slot.startTime).toLocaleString()} - ${new Date(slot.endTime).toLocaleString()}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default TimeSlotPage;
