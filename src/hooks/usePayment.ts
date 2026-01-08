import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { processPayment, resetPayment } from "../redux/slices/paymentSlice";
import type { PaymentFormData } from "../types";

export const usePayment = () => {
  const dispatch = useDispatch();

  const { isProcessing, isSuccessful, error } = useSelector(
    (state: RootState) => ({
      isProcessing: state.payment.isProcessing,
      isSuccessful: state.payment.isSuccessful,
      error: state.payment.error,
    }),
    (left, right) =>
      left.isProcessing === right.isProcessing &&
      left.isSuccessful === right.isSuccessful &&
      left.error === right.error
  );

  // Process payment
  const handleProcessPayment = useCallback(
    (paymentData: PaymentFormData) => {
      dispatch(processPayment(paymentData));
    },
    [dispatch]
  );

  // Reset payment state
  const handleResetPayment = useCallback(() => {
    dispatch(resetPayment());
  }, [dispatch]);

  return {
    isProcessing,
    isSuccessful,
    error,
    handleProcessPayment,
    handleResetPayment,
  };
};
