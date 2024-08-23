import React, { useState } from 'react';
import { createTimeSlot } from '../services/apiFacade';

const CreateTimeSlot = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateTimeSlot = async (e) => {
        e.preventDefault();
        try {
            await createTimeSlot({ startTime, endTime });
            setMessage("TimeSlot created successfully");
        } catch (error) {
            console.error("Error creating TimeSlot:", error);
            setMessage("Error creating TimeSlot");
        }
    };

    return (
        <div>
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
            {message && <div style={{ color: 'yellow', marginTop: '10px' }}>{message}</div>} {/* Display message here */}
        </div>
    );
};

export default CreateTimeSlot;
