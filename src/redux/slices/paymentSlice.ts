import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaymentFormData } from "../../types";

interface PaymentState {
  isProcessing: boolean;
  isSuccessful: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  isProcessing: false,
  isSuccessful: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Process payment (handled in saga)
    processPayment: (state, _action: PayloadAction<PaymentFormData>) => {
      state.isProcessing = true;
      state.isSuccessful = false;
      state.error = null;
    },
    // Handle successful payment
    setPaymentSuccess: (state) => {
      state.isProcessing = false;
      state.isSuccessful = true;
      state.error = null;
    },
    // Reset payment state
    resetPayment: (state) => {
      state.isProcessing = false;
      state.isSuccessful = false;
      state.error = null;
    },
    // Set error state
    setPaymentError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isProcessing = false;
      state.isSuccessful = false;
    },
  },
});

export const {
  processPayment,
  setPaymentSuccess,
  resetPayment,
  setPaymentError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
