import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthPayload } from "../interfaces/auth.interface";
import type { DetailedUser } from "../interfaces/user.interface";

type AuthState = {
  accessToken: string | null;
  userId: string | null;
  role: string | null;
  authInitialized: boolean;
  authLoading: boolean;
  userData: DetailedUser | null;
  errorMessage?: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  userId: null,
  role: null,
  authInitialized: false,
  authLoading: false,
  userData: null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      // This action is handled by authSaga
      state.authLoading = true;
    },
    loadUserData: () => {
      // This action is handled by authSaga
    },
    loginUser: (
      _state,
      _action: PayloadAction<{ email: string; password: string }>,
    ) => {
      // This action is handled by authSaga
    },
    registerUser: (
      _state,
      _action: PayloadAction<{
        email: string;
        password: string;
        fullName: string;
        phone: string;
      }>,
    ) => {
      // This action is handled by authSaga
    },
    logoutUser: () => {
      // This action is handled by authSaga
    },
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.userId) state.userId = action.payload.userId;
      if (action.payload.role) state.role = action.payload.role;
      state.authLoading = false;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.role = null;
      state.authLoading = false;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.authInitialized = action.payload;
      state.authLoading = false;
    },
    setUserData: (state, action: PayloadAction<DetailedUser>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  initializeAuth,
  loadUserData,
  loginUser,
  registerUser,
  logoutUser,
  setCredentials,
  clearCredentials,
  setInitialized,
  setUserData,
  clearUserData,
  setErrorMessage,
} = authSlice.actions;
export default authSlice.reducer;
