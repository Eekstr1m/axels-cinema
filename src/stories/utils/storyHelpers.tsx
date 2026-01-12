import { configureStore } from "@reduxjs/toolkit";
import cinemaReducer from "../../redux/cinemaSlice";
import type { RootState } from "../../redux/store";

type CinemaState = RootState["cinema"];

export function createMockStore(preloadedState?: Partial<CinemaState>) {
  const store = configureStore({
    reducer: {
      cinema: cinemaReducer,
    },
    preloadedState: preloadedState
      ? {
          cinema: {
            schedule: [],
            sessionDetails: {} as any,
            selectedDate: "",
            selectedSessionId: null,
            isLoadingSchedule: false,
            isLoadingSession: false,
            bookedTicket: {} as any,
            isProcessingPayment: false,
            isError: false,
            ...preloadedState,
          },
        }
      : undefined,
  });

  return store;
}
