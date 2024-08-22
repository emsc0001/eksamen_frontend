import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  duration: number;
  maxParticipants: number;
  discipline: string;
  track: string;
  timeSlot: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => {
        console.error('Error fetching events:', error);
        setError('Error fetching events');
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`/api/events/${id}`, { method: 'DELETE' })
      .then(() => setEvents(events.filter(event => event.id !== id)))
      .catch(error => console.error('Error deleting event:', error));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      <Link to="/create-event">Create Event</Link>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {event.duration} minutes - {event.maxParticipants} participants
            <Link to={`/edit-event/${event.id}`}>Edit</Link>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
