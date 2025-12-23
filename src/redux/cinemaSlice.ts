import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Booking, DaySchedule, Session } from "../types";

interface CinemaState {
  schedule: DaySchedule[];
  selectedDate: string;
  selectedSession: Session | null;
  isLoading: boolean;
}

const initialState: CinemaState = {
  schedule: [],
  selectedDate: "",
  selectedSession: null,
  isLoading: false,
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    // Initialize schedule loading
    initializeSchedule: (state) => {
      // Getting schedule data handled in sagas
      state.isLoading = true;
    },
    // Set the schedule data
    setSchedule: (state, action: PayloadAction<DaySchedule[]>) => {
      state.schedule = action.payload;
      state.selectedDate = action.payload[0]?.date || "";
      state.isLoading = false;
    },
    // Date selection
    selectDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    // Session selection
    selectSession: (state, action: PayloadAction<Session>) => {
      state.selectedSession = action.payload;
    },
    // Booking seats
    bookSeats: () => {
      // Booking logic handled in sagas
    },
    // Handle successful booking
    bookSeatsSuccess: (state, action: PayloadAction<Booking>) => {
      const { sessionId, date, seats } = action.payload;

      // Update the schedule with booked seats
      state.schedule = state.schedule.map((daySchedule) => {
        if (daySchedule.date !== date) return daySchedule;

        // Update the selected session's seats
        return {
          ...daySchedule,
          sessions: daySchedule.sessions.map((session) => {
            if (session.id !== sessionId) return session;

            // Mark the selected seats as booked
            return {
              ...session,
              seats: session.seats.map((row) =>
                row.map((seat) => {
                  const isBooked = seats.some(
                    (s: { row: number; number: number }) =>
                      s.row === seat.row && s.number === seat.number
                  );
                  return isBooked ? { ...seat, isBooked: true } : seat;
                })
              ),
            };
          }),
        };
      });

      state.selectedSession = null;
    },
    // Other reducers can be added here
  },
});

export const {
  initializeSchedule,
  setSchedule,
  selectDate,
  selectSession,
  bookSeats,
  bookSeatsSuccess,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
