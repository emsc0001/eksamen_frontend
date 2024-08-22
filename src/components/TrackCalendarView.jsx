// TrackCalendarView.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getAllEvents } from '../services/apiFacade';

const TrackCalendarView = ({ trackId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await getAllEvents();
            setEvents(eventsData.filter(event => event.track.id === trackId));
        };
        fetchData();
    }, [trackId]);

    return (
        <div>
            <h1>Track Calendar</h1>
            <Calendar
                tileContent={({ date, view }) =>
                    events.map(event => {
                        const start = new Date(event.timeSlot.startTime);
                        const end = new Date(event.timeSlot.endTime);
                        if (view === 'month' && date >= start && date <= end) {
                            return <p>{event.name}</p>;
                        }
                        return null;
                    })
                }
            />
        </div>
    );
};

export default TrackCalendarView;
