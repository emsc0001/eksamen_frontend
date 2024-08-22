// CalendarView.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getAllTimeSlots } from '../services/apiFacade';

const CalendarView = () => {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const timeSlotsData = await getAllTimeSlots();
            setTimeSlots(timeSlotsData);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>TimeSlot Calendar</h1>
            <Calendar
                tileContent={({ date, view }) =>
                    timeSlots.map(slot => {
                        const start = new Date(slot.startTime);
                        const end = new Date(slot.endTime);
                        if (view === 'month' && date >= start && date <= end) {
                            return <p>{slot.event.name}</p>;
                        }
                        return null;
                    })
                }
            />
        </div>
    );
};

export default CalendarView;
