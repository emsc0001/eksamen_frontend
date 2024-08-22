// CreateEventPage.tsx
import React from 'react';
import EventForm from '../components/EventForm';

const CreateEventPage: React.FC = () => {
  return (
    <div>
      <h1>Create a New Event</h1>
      <EventForm />
    </div>
  );
};

export default CreateEventPage;
