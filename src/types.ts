// Types for the cinema booking application

import type { InferType } from "yup";
import type { paymentValidationSchema } from "./utils/paymentValidationSchema";

// Seat represents a single seat in the cinema
export interface Seat {
  row: number;
  number: number;
  isBooked: boolean;
}

// SessionListItem - minimal info for sessions list
export interface SessionListItem {
  id: string;
  time: string;
}

// Session represents a movie session with its time and seating arrangement
export interface Session {
  id: string;
  time: string;
  seats: Seat[][];
}

// SessionDetails - detailed info about specific session
export interface SessionDetails {
  sessionId: string;
  date: string;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
  seats: Seat[][];
}

// DaySchedule represents the schedule for a specific day with sessions list
export interface DaySchedule {
  date: string;
  sessions: SessionListItem[];
}

// Booking
export interface Booking {
  sessionId: string;
  date: string;
  seats: { row: number; number: number }[];
}

// Booked Ticket - complete information about a booking
export interface BookedTicket extends Booking {
  time: string;
}

// Payment Form Data
export type PaymentFormData = InferType<typeof paymentValidationSchema>;

// All Payment Info
export interface AllPaymentInfo extends PaymentFormData {
  bookedTicket: BookedTicket;
}

// SessionsListResponse - response structure for sessions list API
export interface SessionsListResponse {
  sessionsList: DaySchedule[];
}
