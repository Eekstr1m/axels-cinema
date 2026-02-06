import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  authRegister,
  fetchUserData,
  login,
  logout,
  refetchToken,
} from "../api/cinemaApi";
import {
  clearCredentials,
  clearUserData,
  initializeAuth,
  loadUserData,
  loginUser,
  logoutUser,
  registerUser,
  setCredentials,
  setErrorMessage,
  setInitialized,
  setUserData,
} from "./authSlice";

import type { RefreshTokenResponse } from "../interfaces/auth.interface";
import type { DetailedUser } from "../interfaces/user.interface";
import { getErrorMessage } from "../utils/utils";

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

    // Load user data after successful auth initialization
    yield put(loadUserData());
  } catch (error) {
    console.error("Error initializing auth:", error);
    yield put(setInitialized(true));
  }
}

// auth/loadUserData saga
export function* loadUserDataSaga() {
  try {
    const response: DetailedUser = yield call(fetchUserData);

    yield put(setUserData(response));
  } catch (error) {
    console.error("Error loading user data:", error);
    yield put(clearUserData());
  }
}

// auth/loginUser saga
export function* loginUserSaga(
  action: PayloadAction<{ email: string; password: string }>,
) {
  try {
    const response: RefreshTokenResponse = yield call(
      login,
      action.payload.email,
      action.payload.password,
    );

    yield put(
      setCredentials({
        accessToken: response.accessToken,
        userId: response.id,
      }),
    );
    yield put(loadUserData());
  } catch (error) {
    console.error("Error logging in user:", error);
    yield put(setErrorMessage(getErrorMessage(error)));
  }
}

// auth/registerUser saga
export function* registerUserSaga(
  action: PayloadAction<{
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }>,
) {
  try {
    const response: RefreshTokenResponse = yield call(
      authRegister,
      action.payload.email,
      action.payload.password,
      action.payload.fullName,
      action.payload.phone,
    );

    yield put(
      setCredentials({
        accessToken: response.accessToken,
        userId: response.id,
      }),
    );
    yield put(loadUserData());
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    yield put(setErrorMessage(getErrorMessage(error)));
  }
}

// auth/logoutUser saga
export function* logoutUserSaga() {
  try {
    yield call(logout);
    yield put(clearCredentials());
    yield put(clearUserData());
  } catch (error) {
    console.error("Error logging out user:", error);
  }
}

export function* authSaga() {
  yield takeLatest(initializeAuth.type, initializeAuthSaga);
  yield takeLatest(loadUserData.type, loadUserDataSaga);
  yield takeLatest(loginUser.type, loginUserSaga);
  yield takeLatest(registerUser.type, registerUserSaga);
  yield takeLatest(logoutUser.type, logoutUserSaga);
}
