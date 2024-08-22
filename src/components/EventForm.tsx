import React, { useState, useEffect } from 'react';


const CreateEvent: React.FC = () => {
  const [name, setName] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [trackId, setTrackId] = useState<number | null>(null);
  const [disciplines, setDisciplines] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetchDisciplines();
    fetchTracks();
  }, []);

  const fetchDisciplines = async () => {
    const data = await getAllDisciplines();
    setDisciplines(data);
  };

  const fetchTracks = async () => {
    const data = await getAllTracks();
    setTracks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId) {
      const newEvent = { name, discipline, trackId };
      await createEvent(newEvent);
      setName('');
      setDiscipline('');
      setTrackId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={discipline}
        onChange={(e) => setDiscipline(e.target.value)}
        required
      >
        <option value="">Select Discipline</option>
        {disciplines.map((d) => (
          <option key={d.id} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
      <select
        value={trackId || ''}
        onChange={(e) => setTrackId(parseInt(e.target.value))}
        required
      >
        <option value="">Select Track</option>
        {tracks.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
