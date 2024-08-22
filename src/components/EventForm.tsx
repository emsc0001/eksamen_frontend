import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EventFormProps {
  event?: Event;
  onSave: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = () => {
  const [event, setEvent] = useState<Event>({
    id: null,
    name: '',
    duration: 0,
    maxParticipants: 0,
    discipline: '',
    track: '',
    timeSlot: ''
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then(res => res.json())
        .then(data => setEvent(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/events/${id}` : '/api/events';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
      .then(() => navigate('/events'))
      .catch(error => console.error('Error saving event:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={event.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Duration:</label>
        <input type="number" name="duration" value={event.duration} onChange={handleChange} required />
      </div>
      <div>
        <label>Max Participants:</label>
        <input type="number" name="maxParticipants" value={event.maxParticipants} onChange={handleChange} required />
      </div>
      <div>
        <label>Discipline:</label>
        <input type="text" name="discipline" value={event.discipline} onChange={handleChange} required />
      </div>
      <div>
        <label>Track:</label>
        <input type="text" name="track" value={event.track} onChange={handleChange} required />
      </div>
      <div>
        <label>Time Slot:</label>
        <input type="text" name="timeSlot" value={event.timeSlot} onChange={handleChange} required />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;
