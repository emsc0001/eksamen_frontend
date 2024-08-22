import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventPage from './pages/EventPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/events">Events</Link>
        <Link to="/tracks">Tracks</Link>
        <Link to="/disciplines">Disciplines</Link>
        <Link to="/timeslots">TimeSlots</Link>
      </nav>

      <Routes>
        <Route path="/events" element={<EventPage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
