import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";

// Actions
import { setPaymentError, setPaymentSuccess } from "../slices/paymentSlice";

// Services
import { postPayment } from "../../api/cinemaApi";
import type { AllPaymentInfo, PaymentFormData } from "../../types";
import type { RootState } from "../store";

export function* processPaymentSaga(action: PayloadAction<PaymentFormData>) {
  try {
    const state: RootState = yield select();
    const { bookedTicket } = state.booking;
    const paymentData: PaymentFormData = action.payload;

    if (!bookedTicket) {
      yield put(setPaymentError("No booking found"));
      return;
    }

    // Simulate payment processing delay
    yield call(() => new Promise((res) => setTimeout(res, 1500)));

    const allPaymentInfo: AllPaymentInfo = {
      ...paymentData,
      bookedTicket,
    };

    const response: { success: boolean } = yield call(
      postPayment,
      allPaymentInfo
    );

    if (response.success) {
      yield put(setPaymentSuccess());
      console.log("✅ Payment processed successfully");
    } else {
      yield put(setPaymentError("Payment failed"));
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    yield put(setPaymentError("Failed to process payment"));
  }
}
