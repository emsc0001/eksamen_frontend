import React, { useState } from 'react';
import { createEvent } from '../services/EventService';

const EventForm: React.FC = () => {
  const [discipline, setDiscipline] = useState('');
  const [track, setTrack] = useState('');
  const [minimumDuration, setMinimumDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      discipline: { name: discipline },
      track: { type: track },
      minimumDuration: parseInt(minimumDuration),
    };
    createEvent(eventData)
      .then(() => alert('Event created successfully!'))
      .catch(error => console.error('Error creating event:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Discipline:</label>
        <input type="text" value={discipline} onChange={(e) => setDiscipline(e.target.value)} />
      </div>
      <div>
        <label>Track:</label>
        <input type="text" value={track} onChange={(e) => setTrack(e.target.value)} />
      </div>
      <div>
        <label>Minimum Duration:</label>
        <input type="text" value={minimumDuration} onChange={(e) => setMinimumDuration(e.target.value)} />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
