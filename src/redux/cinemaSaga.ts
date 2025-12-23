import { put, select, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";
// Utils
import { generateAvailableDates } from "../utils/utils";
// Actions
import {
  setSchedule,
  bookSeatsSuccess,
  initializeSchedule,
  bookSeats,
} from "./cinemaSlice";

// cinema/initializeSchedule saga
function* initializeScheduleSaga() {
  try {
    // Generate schedule data
    const schedule = generateAvailableDates();

    // Dispatch action to set schedule
    yield put(setSchedule(schedule));
  } catch (error) {
    console.error("Error initializing schedule:", error);
  }
}

// cinema/bookSeats saga
function* bookSeatsSaga(
  action: PayloadAction<{ row: number; number: number }[]>
) {
  try {
    const state: RootState = yield select();
    const { selectedSession, selectedDate } = state.cinema;

    if (!selectedSession) return;

    // Dispatch action to update booked seats
    yield put(
      bookSeatsSuccess({
        sessionId: selectedSession.id,
        date: selectedDate,
        seats: action.payload,
      })
    );

    console.log("Seats booked successfully", action.payload);
  } catch (error) {
    console.error("Error booking seats:", error);
  }
}

// Cinema saga to handle side effects
export function* cinemaSaga() {
  yield takeLatest(initializeSchedule.type, initializeScheduleSaga);
  yield takeLatest(bookSeats.type, bookSeatsSaga);
}
