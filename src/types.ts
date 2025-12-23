// Types for the cinema booking application

// Seat represents a single seat in the cinema
export interface Seat {
  row: number;
  number: number;
  isBooked: boolean;
}

// Session represents a movie session with its time and seating arrangement
export interface Session {
  id: string;
  time: string;
  seats: Seat[][];
}

// DaySchedule represents the schedule for a specific day with its sessions
export interface DaySchedule {
  date: string;
  sessions: Session[];
}

// 
export interface Booking {
  sessionId: string;
  date: string;
  seats: { row: number; number: number }[];
}