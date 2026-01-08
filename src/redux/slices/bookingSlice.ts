import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SessionDetails, BookedTicket } from "../../types";

interface BookingState {
  sessionDetails: SessionDetails | null;
  selectedSessionId: string | null;
  bookedTicket: BookedTicket | null;
  isLoadingSession: boolean;
  error: string | null;
}

const initialState: BookingState = {
  sessionDetails: null,
  selectedSessionId: null,
  bookedTicket: null,
  isLoadingSession: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Load session details
    loadSessionDetails: (state, _action: PayloadAction<string>) => {
      state.isLoadingSession = true;
      state.error = null;
    },
    // Set session details
    setSessionDetails: (state, action: PayloadAction<SessionDetails>) => {
      state.sessionDetails = action.payload;
      state.isLoadingSession = false;
      state.error = null;
    },
    // Session selection
    selectSession: (state, action: PayloadAction<string>) => {
      state.selectedSessionId = action.payload;
    },
    // Clear selected session
    clearSelectedSession: (state) => {
      state.selectedSessionId = null;
    },
    // Booking seats (handled in saga)
    bookSeats: (
      _state,
      _action: PayloadAction<{ row: number; number: number }[]>
    ) => {
      // Logic handled in sagas
    },
    // Handle successful booking
    setBookedTicket: (state, action: PayloadAction<BookedTicket>) => {
      state.bookedTicket = action.payload;
      state.selectedSessionId = null;
    },
    // Update session details after booking
    updateSessionSeats: (state, action: PayloadAction<SessionDetails>) => {
      state.sessionDetails = action.payload;
    },
    // Clear booking
    clearBooking: (state) => {
      state.bookedTicket = null;
    },
    // Set error state
    setBookingError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoadingSession = false;
    },
  },
});

export const {
  loadSessionDetails,
  setSessionDetails,
  selectSession,
  clearSelectedSession,
  bookSeats,
  setBookedTicket,
  updateSessionSeats,
  clearBooking,
  setBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer;
