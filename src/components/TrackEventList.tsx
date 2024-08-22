import React, { useState, useEffect } from 'react';

interface Event {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

const TrackEventList: React.FC<{ trackId: number }> = ({ trackId }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`/api/tracks/${trackId}/events`)
      .then(response => response.json())
      .then(data => setEvents(data));
  }, [trackId]);

  return (
    <div>
      <h2>Events for Track {trackId}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name}: {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackEventList;
