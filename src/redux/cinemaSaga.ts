import { call, put, select, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

// Actions
import {
  setSchedule,
  setSessionDetails,
  bookSeatsSuccess,
  initializeSchedule,
  loadSessionDetails,
  bookSeats,
  setErrorState,
  processPayment,
  processPaymentSuccess,
} from "./cinemaSlice";

// API
import {
  fetchSessionDetails,
  fetchSessionsList,
  postPayment,
} from "../api/cinemaApi";

// Types
import type { RootState } from "./store";
import type {
  AllPaymentInfo,
  DaySchedule,
  PaymentFormData,
  SessionDetails,
  SessionsListResponse,
} from "../types";

// cinema/initializeSchedule saga
function* initializeScheduleSaga() {
  try {
    // Load sessions list (without seat details)
    const response: SessionsListResponse = yield call(fetchSessionsList);

    const schedule: DaySchedule[] = response.sessionsList;

    // Dispatch action to set schedule
    yield put(setSchedule(schedule));
  } catch (error) {
    console.error("Error loading sessions list:", error);
    yield put(setErrorState("Error loading sessions list"));
  }
}

// cinema/setSessionDetails saga
function* loadSessionDetailsSaga() {
  try {
    // Load detailed session info with seats from mockable.io URL
    const response: SessionDetails = yield call(fetchSessionDetails);

    // Dispatch action to set session details
    yield put(setSessionDetails(response));
  } catch (error) {
    console.error("Error loading session details:", error);
    yield put(setErrorState("Error loading session details"));
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

  } catch (error) {
    console.error("Error booking seats:", error);
    yield put(setErrorState("Error booking seats"));
  }
}

// cinema/processPayment saga
function* processPaymentSaga(action: PayloadAction<PaymentFormData>) {
  try {
    const state: RootState = yield select();
    const { bookedTicket } = state.cinema;
    const paymentData: PaymentFormData = action.payload;

    // Simulate payment processing delay
    yield call(() => new Promise((res) => setTimeout(res, 1500)));

    const allPaymentInfo: AllPaymentInfo = {
      ...paymentData,
      bookedTicket,
    };

    // Here you can make a call to the real payment API
    const response: { success: boolean } = yield call(postPayment, allPaymentInfo);

    yield put(processPaymentSuccess());
    console.log("✅ Payment processed successfully", response.success);
  } catch (error) {
    console.log("Error processing payment", error);
    yield put(setErrorState("Error processing payment"));
  }
}

// Cinema saga to handle side effects
export function* cinemaSaga() {
  yield takeLatest(initializeSchedule.type, initializeScheduleSaga);
  yield takeLatest(loadSessionDetails.type, loadSessionDetailsSaga);
  yield takeLatest(bookSeats.type, bookSeatsSaga);
  yield takeLatest(processPayment.type, processPaymentSaga);
}
