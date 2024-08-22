import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TimeSlotForm: React.FC = () => {
  const [timeSlot, setTimeSlot] = useState({ startTime: '', endTime: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`/api/timeslots/${id}`).then(res => res.json()).then(setTimeSlot);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimeSlot({ ...timeSlot, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/timeslots/${id}` : '/api/timeslots';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timeSlot),
    })
      .then(response => response.json())
      .then(() => navigate('/timeslots'))
      .catch(error => console.error('Error creating time slot:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Time</label>
        <input type="datetime-local" name="startTime" value={timeSlot.startTime} onChange={handleChange} />
      </div>
      <div>
        <label>End Time</label>
        <input type="datetime-local" name="endTime" value={timeSlot.endTime} onChange={handleChange} />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Time Slot</button>
    </form>
  );
};

export default TimeSlotForm;