import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  BookedTicket,
  Booking,
  DaySchedule,
  PaymentFormData,
  SessionDetails,
} from "../types";

interface CinemaState {
  schedule: DaySchedule[];
  sessionDetails: SessionDetails | null;
  selectedDate: string;
  selectedSessionId: string | null;
  isLoadingSchedule: boolean;
  isLoadingSession: boolean;
  bookedTicket: BookedTicket | null;
  isProcessingPayment: boolean;
  isPaymentSuccessful?: boolean;
  isError: boolean;
  errorMessage?: string;
}

const initialState: CinemaState = {
  schedule: [],
  sessionDetails: null,
  selectedDate: "",
  selectedSessionId: null,
  isLoadingSchedule: false,
  isLoadingSession: false,
  bookedTicket: null,
  isProcessingPayment: false,
  isError: false,
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    // Initialize schedule loading
    initializeSchedule: (state) => {
      state.isLoadingSchedule = true;
    },
    // Set the schedule data (list of sessions)
    setSchedule: (state, action: PayloadAction<DaySchedule[]>) => {
      state.schedule = action.payload;
      state.isLoadingSchedule = false;
      state.isError = false;
    },
    // Date selection
    selectDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    // Load session details
    loadSessionDetails: (state) => {
      state.isLoadingSession = true;
    },
    // Set session details
    setSessionDetails: (state, action: PayloadAction<SessionDetails>) => {
      state.sessionDetails = action.payload;
      state.isLoadingSession = false;
      state.isError = false;
    },
    // Session selection
    selectSession: (state, action: PayloadAction<string>) => {
      state.selectedSessionId = action.payload;
    },
    // Clear selected session
    clearSelectedSession: (state) => {
      state.selectedSessionId = null;
    },
    // Booking seats
    bookSeats: (
      _state,
      _action: PayloadAction<{ row: number; number: number }[]>
    ) => {
      // Booking logic handled in sagas
    },
    // Handle successful booking
    bookSeatsSuccess: (state, action: PayloadAction<Booking>) => {
      const { seats } = action.payload;

      // Update session details with booked seats
      if (state.sessionDetails && state.sessionDetails.seats) {
        const sessionDetail = state.sessionDetails;
        sessionDetail.seats = sessionDetail.seats.map((row) =>
          row.map((seat) => {
            const isBooked = seats.some(
              (s: { row: number; number: number }) =>
                s.row === seat.row && s.number === seat.number
            );
            return isBooked ? { ...seat, isBooked: true } : seat;
          })
        );
        sessionDetail.bookedSeats += seats.length;
        sessionDetail.availableSeats -= seats.length;

        // Add booked ticket info
        state.bookedTicket = {
          sessionId: action.payload.sessionId,
          date: action.payload.date,
          time: sessionDetail.time,
          seats: action.payload.seats,
        };
      }

      state.selectedSessionId = null;
    },
    // Process payment
    processPayment: (state, _action: PayloadAction<PaymentFormData>) => {
      state.isProcessingPayment = true;
      state.isPaymentSuccessful = false;
    },
    // Handle successful payment
    processPaymentSuccess: (state) => {
      state.isProcessingPayment = false;
      state.isPaymentSuccessful = true;
      state.isError = false;
    },
    // Reset payment state
    resetPaymentState: (state) => {
      state.isProcessingPayment = false;
      state.isPaymentSuccessful = false;
      state.bookedTicket = {} as BookedTicket;
    },
    // Handle error state here
    setErrorState: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.errorMessage = action.payload;
      state.isLoadingSchedule = false;
      state.isLoadingSession = false;
      state.isProcessingPayment = false;
    },
  },
});

export const {
  initializeSchedule,
  setSchedule,
  selectDate,
  loadSessionDetails,
  setSessionDetails,
  selectSession,
  clearSelectedSession,
  bookSeats,
  bookSeatsSuccess,
  processPayment,
  processPaymentSuccess,
  resetPaymentState,
  setErrorState,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
