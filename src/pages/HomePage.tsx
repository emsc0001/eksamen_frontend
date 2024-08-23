import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <h1 className="homepage-title">Welcome to the Event Management System</h1>
                <p className="homepage-description">Manage your events, time slots, and tracks efficiently.</p>
                <div className="homepage-buttons">
                    <Link to="/events">
                        <button className="homepage-button">Manage Events</button>
                    </Link>
                    <Link to="/timeslots">
                        <button className="homepage-button">Manage Time Slots</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
