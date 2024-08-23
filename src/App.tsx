import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import TimeSlotsPage from './pages/TimeSlotsPage'; 
import CalendarOverview from './components/CalendarOverview';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/timeslots">Time Slots</a></li>
                        <li><a href="/calendar-overview">Calendar Overview</a></li> {/* Add this link to navigate to the calendar */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventPage />} />
                    <Route path="/timeslots" element={<TimeSlotsPage />} /> 
                    <Route path="/calendar-overview" element={<CalendarOverview />} /> {/* Updated this line */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
