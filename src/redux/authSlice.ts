import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthPayload } from "../interfaces/auth.interface";

type AuthState = {
  accessToken: string | null;
  userId: string | null;
  role: string | null;
  authInitialized: boolean;
  authLoading: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  userId: null,
  role: null,
  authInitialized: false,
  authLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      // This action is handled by authSaga
      state.authLoading = true;
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
  },
});

export const {
  initializeAuth,
  setCredentials,
  clearCredentials,
  setInitialized,
} = authSlice.actions;
export default authSlice.reducer;
