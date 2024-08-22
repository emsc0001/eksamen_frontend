import React from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Athletics Planner</h1>
      <EventForm />
      <EventList />
    </div>
  );
};

export default App;
