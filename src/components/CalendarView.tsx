import React, { useState, useEffect } from 'react';
import { getAllTimeSlots } from '../services/apiFacade';

const CalendarComponent = () => {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            const slots = await getAllTimeSlots();
            setTimeSlots(slots);
        };

        fetchTimeSlots();
    }, []);

    return (
        <div>
            <h2>Event Calendar</h2>
            <div className="calendar">
                {timeSlots.map(slot => (
                    <div key={slot.id} className="time-slot">
                        <h3>{`TimeSlot: ${slot.startTime} - ${slot.endTime}`}</h3>
                        <ul>
                            {slot.events.map(event => (
                                <li key={event.id}>
                                    {`${event.name} - ${event.discipline} - ${event.participantGender}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarComponent;
