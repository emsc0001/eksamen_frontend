import React, { useState, useEffect } from 'react';
import { getDisciplines, getTracks, createEvent } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [timeSlot, setTimeSlot] = useState<Date | null>(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDisciplines();
    fetchTracks();
  }, []);

  const fetchDisciplines = async () => {
    try {
      const data = await getDisciplines();
      setDisciplines(data);
    } catch (error) {
      console.error('Error fetching disciplines:', error);
      setError('Failed to load disciplines');
    }
  };

  const fetchTracks = async () => {
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setError('Failed to load tracks');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDiscipline || !selectedTrack || !timeSlot || duration <= 0) {
      setError('Please fill in all fields correctly');
      return;
    }

    const eventData = {
      disciplineId: selectedDiscipline,
      trackId: selectedTrack,
      duration,
      timeSlot: timeSlot.toISOString(),
    };

    try {
      await createEvent(eventData);
      // Reset form after submission
      setSelectedDiscipline('');
      setSelectedTrack('');
      setDuration(0);
      setTimeSlot(new Date());
      setError(null);
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
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

      <div>
        <label>Time Slot:</label>
        <DatePicker
          selected={timeSlot}
          onChange={(date) => setTimeSlot(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="Time"
        />
      </div>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
