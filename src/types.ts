export interface Event {
    id: number;
    name: string;
    duration: number;
    maxParticipants: number;
    discipline: Discipline;
    track: Track;
    timeSlot: TimeSlot;
}

export interface Track {
    id: number;
    name: string;
    lanes: number;
    length: number;
    supportedDisciplines: Discipline[];
}

export interface TimeSlot {
    id: number;
    timeRange: string;
}

export enum Discipline {
    SWIMMING = 'SWIMMING',
    HIGH_JUMP = 'HIGH_JUMP',
    RELAY_RACE = 'RELAY_RACE'
}