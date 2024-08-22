import React, { useState, useEffect } from 'react';
import { getDisciplines, getTracks, createEvent } from '../services/api';

interface Discipline {
  id: string;
  name: string;
}

interface Track {
  id: string;
  name: string;
  disciplines: Discipline[];
}

const EventForm: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    fetchDisciplines();
    fetchTracks();
  }, []);

  const fetchDisciplines = async () => {
    try {
      const data = await getDisciplines();
      setDisciplines(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTracks = async () => {
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      disciplineId: selectedDiscipline,
      trackId: selectedTrack,
      duration,
      participantGroup,
    };
    try {
      await createEvent(eventData);
      // Reset form after submission
      setSelectedDiscipline('');
      setSelectedTrack('');
      setDuration(0);
      setParticipantGroup('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Discipline:</label>
        <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.target.value)} required>
          <option value="">Select a discipline</option>
          {disciplines.map(discipline => (
            <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Track:</label>
        <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} required>
          <option value="">Select a track</option>
          {tracks.map(track => (
            <option key={track.id} value={track.id}>{track.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Duration (minutes):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
      </div>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
