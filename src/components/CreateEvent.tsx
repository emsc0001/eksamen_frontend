import React, { useState, useEffect } from 'react';
import { getAllDisciplines, getAllTracks, createEvent } from '../services/apiFacade';

const CreateEvent: React.FC = () => {
  const [name, setName] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [trackId, setTrackId] = useState<number | null>(null);
  const [disciplines, setDisciplines] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchDisciplines();
    fetchTracks();
  }, []);

  const fetchDisciplines = async () => {
    try {
      const data = await getAllDisciplines();
      setDisciplines(data);
    } catch (err) {
      setError('Failed to load disciplines.');
    }
  };

  const fetchTracks = async () => {
    try {
      const data = await getAllTracks();
      setTracks(data);
    } catch (err) {
      setError('Failed to load tracks.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !discipline || !trackId) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const newEvent = { name, discipline, trackId };
      await createEvent(newEvent);
      setSuccess('Event created successfully!');
      setName('');
      setDiscipline('');
      setTrackId(null);
    } catch (err) {
      setError('Failed to create event. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Event</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="discipline">Discipline:</label>
          <select
            id="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            required
            style={{ marginLeft: '10px' }}
          >
            <option value="">Select Discipline</option>
            {disciplines.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="track">Track:</label>
          <select
            id="track"
            value={trackId || ''}
            onChange={(e) => setTrackId(parseInt(e.target.value))}
            required
            style={{ marginLeft: '10px' }}
          >
            <option value="">Select Track</option>
            {tracks.map((t) => (
              <option key={t.id} value={t.id}>
                {`${t.name} - ${t.type} - ${t.shape} (${t.surface})`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
