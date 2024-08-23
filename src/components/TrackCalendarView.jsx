import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TrackCalendarView = ({ trackId }) => {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            const response = await fetch(`/api/timeSlots/track/${trackId}`);
            const data = await response.json();
            setTimeSlots(data);
        };
        fetchTimeSlots();
    }, [trackId]);

    return (
        <Calendar
            localizer={localizer}
            events={timeSlots.map(slot => ({
                start: new Date(slot.startTime),
                end: new Date(slot.endTime),
                title: slot.events.map(event => event.name).join(', '),
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
    );
};

export default TrackCalendarView;
