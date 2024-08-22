import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/api';

interface Event {
  id: string;
  discipline: { name: string };
  track: { name: string };
  duration: number;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      fetchEvents(); // Refresh the list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.discipline.name} on {event.track.name} for {event.duration} minutes
            <button onClick={() => handleDelete(event.id)}>Delete</button>
            <button onClick={() => handleEdit(event)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
