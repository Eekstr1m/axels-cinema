import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { RootState } from "../redux/store";
import {
  loadSessionDetails,
  selectSession,
  clearSelectedSession,
  bookSeats,
} from "../redux/slices/bookingSlice";

export const useBooking = () => {
  const dispatch = useDispatch();

  const {
    sessionDetails,
    selectedSessionId,
    bookedTicket,
    isLoadingSession,
    error,
  } = useSelector((state: RootState) => state.booking, shallowEqual);

  // Load session details
  const loadSession = useCallback(
    (sessionId: string) => {
      dispatch(loadSessionDetails(sessionId));
    },
    [dispatch]
  );

  // Select session
  const handleSelectSession = useCallback(
    (sessionId: string) => {
      dispatch(selectSession(sessionId));
    },
    [dispatch]
  );

  // Clear selected session
  const handleClearSession = useCallback(() => {
    dispatch(clearSelectedSession());
  }, [dispatch]);

  // Book seats
  const handleBookSeats = useCallback(
    (seats: { row: number; number: number }[]) => {
      dispatch(bookSeats(seats));
    },
    [dispatch]
  );

  // Check if session is selected
  const isSessionSelected = Boolean(selectedSessionId);

  // Check if booking exists
  const hasBooking = Boolean(bookedTicket && bookedTicket.seats?.length > 0);

  return {
    sessionDetails,
    selectedSessionId,
    bookedTicket,
    isLoadingSession,
    error,
    isSessionSelected,
    hasBooking,
    loadSession,
    handleSelectSession,
    handleClearSession,
    handleBookSeats,
  };
};
