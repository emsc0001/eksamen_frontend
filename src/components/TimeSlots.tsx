import React, { useState } from 'react';
import { createTimeSlot } from '../services/apiFacade';

const CreateTimeSlot = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleCreateTimeSlot = async (e) => {
        e.preventDefault();
        try {
            await createTimeSlot({ startTime, endTime });
            alert("TimeSlot created successfully");
        } catch (error) {
            console.error("Error creating TimeSlot:", error);
        }
    };

    return (
        <form onSubmit={handleCreateTimeSlot}>
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
            />
            <button type="submit">Create TimeSlot</button>
        </form>
    );
};

export default CreateTimeSlot;
