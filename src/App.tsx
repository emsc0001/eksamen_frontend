import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* HomePage vises når path er "/" */}
        <Route path="/" element={<HomePage />} />
        
        {/* CreateEventPage vises når path er "/create-event" */}
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
