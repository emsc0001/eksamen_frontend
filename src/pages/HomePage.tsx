// HomePage.tsx
import React from 'react';
import EventList from '../components/EventList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Athletics Event Planner</h1>
      <EventList />
    </div>
  );
};

export default HomePage;
