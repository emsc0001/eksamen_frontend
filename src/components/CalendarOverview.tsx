import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllTimeSlots } from '../services/apiFacade';

const localizer = momentLocalizer(moment);

const CalendarOverview = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            const timeSlots = await getAllTimeSlots();
            
            const calendarEvents = timeSlots.map(slot => ({
                title: slot.events.map(event => event.name).join(', '),
                start: new Date(slot.startTime),
                end: new Date(slot.endTime),
                allDay: false, // Change to true if the event lasts all day
            }));

            setEvents(calendarEvents);
        };

        fetchTimeSlots();
    }, []);

    return (
        <div>
            <h2>Event Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                views={['month', 'week', 'day']}
                defaultView="week"
            />
        </div>
    );
};

export default CalendarOverview;
