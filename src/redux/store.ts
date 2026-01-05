import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Reducers
import cinemaReducer from "./cinemaSlice.ts";

// Sagas
import { cinemaSaga } from "./cinemaSaga.ts";

const sagaMiddleware = createSagaMiddleware();

// Configure store with reducers and middleware
export const store = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
  // Add saga middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the cinema saga
sagaMiddleware.run(cinemaSaga);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
