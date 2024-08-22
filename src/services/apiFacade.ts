const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const get = async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return handleResponse(response);
};

export const post = async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const del = async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

// Specific functions for the application
export const createEvent = async (event: any) => {
    return post('/events', event);
};

export const getAllEvents = async () => {
    return get('/events');
};

export const deleteEvent = async (id: number) => {
    return del(`/events/${id}`);
};

export const getAllTracks = async () => {
    return get('/tracks');
};

export const getAllDisciplines = async () => {
    return get('/disciplines');
};
