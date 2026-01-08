import paymentReducer, {
  processPayment,
  setPaymentSuccess,
  resetPayment,
  setPaymentError,
} from "./paymentSlice";

import type { PaymentFormData } from "../../types";

describe("paymentSlice", () => {
  const initialState = {
    isProcessing: false,
    isSuccessful: false,
    error: null,
  };

  const mockPaymentData: PaymentFormData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    cardNumber: "4532 0151 1283 0366",
    expiryDate: "12/30",
    cvv: "123",
  };

  test("should return the initial state", () => {
    expect(paymentReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("processPayment sets processing to true and clears success and error", () => {
    const previousState = {
      ...initialState,
      isSuccessful: true,
      error: "Previous error",
    };

    const state = paymentReducer(
      previousState,
      processPayment(mockPaymentData)
    );

    expect(state.isProcessing).toBe(true);
    expect(state.isSuccessful).toBe(false);
    expect(state.error).toBeNull();
  });

  test("setPaymentSuccess sets success state and clears processing", () => {
    const previousState = {
      ...initialState,
      isProcessing: true,
    };

    const state = paymentReducer(previousState, setPaymentSuccess());

    expect(state.isProcessing).toBe(false);
    expect(state.isSuccessful).toBe(true);
    expect(state.error).toBeNull();
  });

  test("resetPayment resets all payment state", () => {
    const previousState = {
      isProcessing: true,
      isSuccessful: true,
      error: "Some error",
    };

    const state = paymentReducer(previousState, resetPayment());

    expect(state.isProcessing).toBe(false);
    expect(state.isSuccessful).toBe(false);
    expect(state.error).toBeNull();
  });

  test("setPaymentError sets error and clears processing and success", () => {
    const previousState = {
      ...initialState,
      isProcessing: true,
      isSuccessful: false,
    };

    const errorMessage = "Payment processing failed";
    const state = paymentReducer(previousState, setPaymentError(errorMessage));

    expect(state.error).toBe(errorMessage);
    expect(state.isProcessing).toBe(false);
    expect(state.isSuccessful).toBe(false);
  });

  test("setPaymentError works with successful state", () => {
    const previousState = {
      ...initialState,
      isSuccessful: true,
    };

    const errorMessage = "Network error";
    const state = paymentReducer(previousState, setPaymentError(errorMessage));

    expect(state.error).toBe(errorMessage);
    expect(state.isProcessing).toBe(false);
    expect(state.isSuccessful).toBe(false);
  });

  test("multiple processPayment calls maintain processing state", () => {
    let state = paymentReducer(initialState, processPayment(mockPaymentData));
    expect(state.isProcessing).toBe(true);

    state = paymentReducer(state, processPayment(mockPaymentData));
    expect(state.isProcessing).toBe(true);
    expect(state.isSuccessful).toBe(false);
  });

  test("payment flow: process -> success -> reset", () => {
    let state = paymentReducer(initialState, processPayment(mockPaymentData));
    expect(state.isProcessing).toBe(true);
    expect(state.isSuccessful).toBe(false);

    state = paymentReducer(state, setPaymentSuccess());
    expect(state.isProcessing).toBe(false);
    expect(state.isSuccessful).toBe(true);

    state = paymentReducer(state, resetPayment());
    expect(state).toEqual(initialState);
  });

  test("payment flow: process -> error -> reset", () => {
    let state = paymentReducer(initialState, processPayment(mockPaymentData));
    expect(state.isProcessing).toBe(true);

    state = paymentReducer(state, setPaymentError("Payment failed"));
    expect(state.isProcessing).toBe(false);
    expect(state.isSuccessful).toBe(false);
    expect(state.error).toBe("Payment failed");

    state = paymentReducer(state, resetPayment());
    expect(state).toEqual(initialState);
  });
});
