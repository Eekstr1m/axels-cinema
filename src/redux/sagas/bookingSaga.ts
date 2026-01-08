import { call, put, select } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

// Actions
import {
  setSessionDetails,
  setBookedTicket,
  updateSessionSeats,
  setBookingError,
} from "../slices/bookingSlice";

// Services
import type { RootState } from "../store";
import type { SessionDetails, BookedTicket, Seat } from "../../types";
import { fetchSessionDetails } from "../../api/cinemaApi";

// Helper function to validate booking
function validateBooking(
  requestedSeats: { row: number; number: number }[],
  sessionSeats: Seat[][]
): boolean {
  for (const seat of requestedSeats) {
    const seatRow = sessionSeats[seat.row - 1];
    if (!seatRow) return false;

    const seatObj = seatRow.find((s) => s.number === seat.number);
    if (!seatObj || seatObj.isBooked) return false;
  }
  return true;
}

// Helper function to update seats with booking
function updateSeatsWithBooking(
  sessionSeats: Seat[][],
  bookedSeats: { row: number; number: number }[]
): Seat[][] {
  return sessionSeats.map((row) =>
    row.map((seat) => {
      const isBookedNow = bookedSeats.some(
        (bookedSeat) =>
          bookedSeat.row === seat.row && bookedSeat.number === seat.number
      );
      return isBookedNow ? { ...seat, isBooked: true } : seat;
    })
  );
}

// Helper function to calculate seat statistics
function calculateSeatStats(seats: Seat[][]): {
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
} {
  let totalSeats = 0;
  let bookedSeats = 0;

  for (const row of seats) {
    for (const seat of row) {
      totalSeats++;
      if (seat.isBooked) {
        bookedSeats++;
      }
    }
  }

  return {
    totalSeats,
    bookedSeats,
    availableSeats: totalSeats - bookedSeats,
  };
}

export function* loadSessionDetailsSaga() {
  try {
    const response: SessionDetails = yield call(fetchSessionDetails);
    yield put(setSessionDetails(response));
  } catch (error) {
    console.error("Error loading session details:", error);
    yield put(setBookingError("Failed to load session details"));
  }
}

export function* bookSeatsSaga(
  action: PayloadAction<{ row: number; number: number }[]>
) {
  try {
    const state: RootState = yield select();
    const { sessionDetails } = state.booking;
    const { selectedDate } = state.schedule;

    if (!sessionDetails || !selectedDate) {
      yield put(setBookingError("Missing booking information"));
      return;
    }

    // Validate booking
    const isValid = validateBooking(action.payload, sessionDetails.seats);

    if (!isValid) {
      yield put(setBookingError("Some seats are already booked"));
      return;
    }

    // Update seats with booking
    const updatedSeats = updateSeatsWithBooking(
      sessionDetails.seats,
      action.payload
    );

    const stats = calculateSeatStats(updatedSeats);

    // Update session details with new seat information
    const updatedSessionDetails: SessionDetails = {
      ...sessionDetails,
      seats: updatedSeats,
      totalSeats: stats.totalSeats,
      bookedSeats: stats.bookedSeats,
      availableSeats: stats.availableSeats,
    };

    yield put(updateSessionSeats(updatedSessionDetails));

    // Create booked ticket
    const bookedTicket: BookedTicket = {
      sessionId: sessionDetails.sessionId,
      date: selectedDate,
      time: sessionDetails.time,
      seats: action.payload,
    };

    yield put(setBookedTicket(bookedTicket));
  } catch (error) {
    console.error("Error booking seats:", error);
    yield put(setBookingError("Failed to book seats"));
  }
}
