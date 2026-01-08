import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Reducers
import bookingReducer from "./slices/bookingSlice";
import paymentReducer from "./slices/paymentSlice";
import scheduleReducer from "./slices/scheduleSlice";

// Sagas
import { rootSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

// Configure store with reducers and middleware
export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  },
  // Add saga middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
