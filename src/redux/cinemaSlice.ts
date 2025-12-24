import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Booking, DaySchedule, SessionDetails } from "../types";

interface CinemaState {
  schedule: DaySchedule[];
  sessionDetails: SessionDetails;
  selectedDate: string;
  selectedSessionId: string | null;
  isLoadingSchedule: boolean;
  isLoadingSession: boolean;
}

const initialState: CinemaState = {
  schedule: [],
  sessionDetails: {} as SessionDetails,
  selectedDate: "",
  selectedSessionId: null,
  isLoadingSchedule: false,
  isLoadingSession: false,
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
      state.selectedDate = action.payload[0]?.date || "";
      state.isLoadingSchedule = false;
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
      if (state.sessionDetails) {
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
      }

      state.selectedSessionId = null;
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
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
