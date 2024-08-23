const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status !== 204) {
        return response.json(); // parse JSON only if the response is not 204 No Content
    }
    return {}; // Return an empty object or null for 204 responses
};

export const get = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return handleResponse(response);
};

export const post = async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const del = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

export const createEvent = async (event) => {
    return post('/events', event);
};

export async function updateEvent(id, eventData) {
    const response = await post(`/events/${id}`, eventData);
    return await handleResponse(response);
}

export const getAllEvents = async () => {
    return get('/events');
};

export const deleteEvent = async (id) => {
    return del(`/events/${id}`);
};

export const getAllTracks = async () => {
    return get('/tracks');
};

export const getAllDisciplines = async () => {
    return get('/disciplines');
};

export const getAllTimeSlots = async () => {
    return get('/timeslots');
};

export const createTimeSlot = async (timeSlot) => {
    return post('/timeslots', timeSlot);
};

export const deleteTimeSlot = async (id) => {
    return del(`/timeslots/${id}`);
};

export const linkEventToTimeSlot = async (timeSlotId: number, eventId: number) => {
    return post(`/timeslots/${timeSlotId}/events`, { eventId });
};


export const removeEventFromTimeSlot = async (timeSlotId, eventId) => {
    return del(`/timeslots/${timeSlotId}/events/${eventId}`);
};
