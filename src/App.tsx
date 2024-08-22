import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/edit-event/:id" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
