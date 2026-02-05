import { call, put, takeLatest } from "redux-saga/effects";
import { refetchToken } from "../api/cinemaApi";
import type { RefreshTokenResponse } from "../interfaces/auth.interface";
import { initializeAuth, setCredentials, setInitialized } from "./authSlice";

// auth/initializeAuth saga
export function* initializeAuthSaga() {
  try {
    const response: RefreshTokenResponse = yield call(refetchToken);

    yield put(
      setCredentials({
        accessToken: response.accessToken,
        userId: response.id,
      }),
    );
    yield put(setInitialized(true));
  } catch (error) {
    console.error("Error initializing auth:", error);
    yield put(setInitialized(true));
  }
}

export function* authSaga() {
  yield takeLatest(initializeAuth.type, initializeAuthSaga);
}
