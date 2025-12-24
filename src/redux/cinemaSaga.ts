import { call, put, select, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { type AxiosResponse } from "axios";

import type { RootState } from "./store";
import type { DaySchedule, SessionDetails } from "../types";
// Actions
import {
  setSchedule,
  setSessionDetails,
  bookSeatsSuccess,
  initializeSchedule,
  loadSessionDetails,
  bookSeats,
} from "./cinemaSlice";

interface SessionsListResponse {
  data: DaySchedule[];
}

// cinema/initializeSchedule saga
function* initializeScheduleSaga() {
  try {
    // Load sessions list (without seat details)
    const response: AxiosResponse<SessionsListResponse> = yield call(
      axios.get,
      "http://demo9181412.mockable.io/sessions-list"
    );

    const schedule: DaySchedule[] = response.data.data;

    // Dispatch action to set schedule
    yield put(setSchedule(schedule));
  } catch (error) {
    console.error("Error loading sessions list:", error);
  }
}

// cinema/setSessionDetails
function* loadSessionDetailsSaga() {
  try {
    // Load detailed session info with seats from mockable.io URL
    const response: AxiosResponse<SessionDetails> = yield call(
      axios.get,
      "https://demo9181412.mockable.io/session/session-2025-12-24-0"
    );

    const sessionDetails: SessionDetails = response.data;

    // Dispatch action to set session details
    yield put(setSessionDetails(sessionDetails));
  } catch (error) {
    console.error("Error loading session details:", error);
  }
}

// cinema/bookSeats saga
function* bookSeatsSaga(
  action: PayloadAction<{ row: number; number: number }[]>
) {
  try {
    const state: RootState = yield select();
    const { selectedSessionId, selectedDate } = state.cinema;

    if (!selectedSessionId) return;

    // Dispatch action to update booked seats
    yield put(
      bookSeatsSuccess({
        sessionId: selectedSessionId,
        date: selectedDate,
        seats: action.payload,
      })
    );

    console.log("✅ Seats booked successfully", action.payload);
  } catch (error) {
    console.error("Error booking seats:", error);
  }
}

// Cinema saga to handle side effects
export function* cinemaSaga() {
  yield takeLatest(initializeSchedule.type, initializeScheduleSaga);
  yield takeLatest(loadSessionDetails.type, loadSessionDetailsSaga);
  yield takeLatest(bookSeats.type, bookSeatsSaga);
}
