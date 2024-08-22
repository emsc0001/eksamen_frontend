import React, { useState, useEffect } from 'react';
import { getTimeSlots } from '../services/timeSlotService';

const CalendarView: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    getTimeSlots().then(setTimeSlots);
  }, []);

  return (
    <div>
      <h1>Calendar View</h1>
      <ul>
        {timeSlots.map(ts => (
          <li key={ts.id}>
            {ts.startTime} - {ts.endTime}
            <ul>
              {ts.events.map(event => (
                <li key={event.id}>{event.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
