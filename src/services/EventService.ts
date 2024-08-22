const baseUrl = 'http://localhost:8080/api'; // Erstat med din faktiske backend URL

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${baseUrl}/events`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const createEvent = async (event: Event): Promise<Event> => {
  const response = await fetch(`${baseUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const updateEvent = async (id: string, event: Event): Promise<Event> => {
  const response = await fetch(`${baseUrl}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/events/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
};