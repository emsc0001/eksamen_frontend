export const createEvent = async (eventData: any) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  };
  