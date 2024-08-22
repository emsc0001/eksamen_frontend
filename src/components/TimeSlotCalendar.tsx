import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  track: string;
}

const TimeSlotCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/timeslots')
      .then(response => response.json())
      .then(data => {
        const calendarEvents = data.map((timeSlot: any) => ({
          id: timeSlot.id,
          title: timeSlot.event.name,
          start: new Date(timeSlot.startTime),
          end: new Date(timeSlot.endTime),
          track: timeSlot.track.name,
        }));
        setEvents(calendarEvents);
      });
  }, []);

  return (
    <div>
      <h1>Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default TimeSlotCalendar;
