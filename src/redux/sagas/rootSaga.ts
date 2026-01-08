import { takeLatest } from "redux-saga/effects";

// Schedule sagas
import { loadScheduleSaga } from "./scheduleSaga";
import { loadSchedule } from "../slices/scheduleSlice";

// Booking sagas
import { loadSessionDetailsSaga, bookSeatsSaga } from "./bookingSaga";
import { loadSessionDetails, bookSeats } from "../slices/bookingSlice";

// Payment sagas
import { processPaymentSaga } from "./paymentSaga";
import { processPayment } from "../slices/paymentSlice";

export function* rootSaga() {
  yield takeLatest(loadSchedule.type, loadScheduleSaga);
  yield takeLatest(loadSessionDetails.type, loadSessionDetailsSaga);
  yield takeLatest(bookSeats.type, bookSeatsSaga);
  yield takeLatest(processPayment.type, processPaymentSaga);
}