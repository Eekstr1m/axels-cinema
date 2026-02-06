import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Reducers
import cinemaReducer from "./cinemaSlice.ts";
import authReducer from "./authSlice.ts";

// Sagas
import { cinemaSaga } from "./cinemaSaga.ts";
import { authSaga } from "./authSaga.ts";

const sagaMiddleware = createSagaMiddleware();

// Configure store with reducers and middleware
export const store = configureStore({
  reducer: {
    cinema: cinemaReducer,
    auth: authReducer,
  },
  // Add saga middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the sagas
sagaMiddleware.run(cinemaSaga);
sagaMiddleware.run(authSaga);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
