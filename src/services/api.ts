const API_BASE_URL = 'http://localhost:8080/api';

export const getDisciplines = async () => {
  const response = await fetch(`${API_BASE_URL}/disciplines`);
  if (!response.ok) {
    throw new Error('Failed to fetch disciplines');
  }
  return response.json();
};

export const getTracks = async () => {
  const response = await fetch(`${API_BASE_URL}/tracks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tracks');
  }
  return response.json();
};

export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const createEvent = async (eventData: any) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

export const deleteEvent = async (eventId: string) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};
