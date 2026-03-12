import authReducer, {
  clearCredentials,
  clearUserData,
  initializeAuth,
  setCredentials,
  setErrorMessage,
  setInitialized,
  setUserData,
} from "./authSlice";
import type { DetailedUser } from "../interfaces/user.interface";

const initialState = {
  accessToken: null,
  userId: null,
  role: null,
  authInitialized: false,
  authLoading: false,
  userData: null,
  errorMessage: null,
};

const mockUser: DetailedUser = {
  userId: "user-1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  role: "user",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
  totalMoviesBooked: 5,
  totalSeatsBooked: 10,
  totalMoneySpent: 125,
};

describe("authSlice", () => {
  test("should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("initializeAuth sets authLoading to true", () => {
    const state = authReducer(initialState, initializeAuth());
    expect(state.authLoading).toBe(true);
  });

  test("setCredentials sets accessToken and userId", () => {
    const state = authReducer(
      initialState,
      setCredentials({ accessToken: "token", userId: "user-1" }),
    );

    expect(state.accessToken).toEqual("token");
    expect(state.userId).toEqual("user-1");
    expect(state.authLoading).toBe(false);
  });

  test("setCredentials sets role when provided", () => {
    const state = authReducer(
      initialState,
      setCredentials({ accessToken: "token", userId: "user-1", role: "admin" }),
    );

    expect(state.accessToken).toEqual("token");
    expect(state.userId).toEqual("user-1");
    expect(state.role).toEqual("admin");
    expect(state.authLoading).toBe(false);
  });

  test("clearCredentials clears accessToken, userId, role", () => {
    const loggedInState = {
      ...initialState,
      accessToken: "token",
      userId: "user-1",
      role: "user",
      authLoading: true,
    };

    const state = authReducer(loggedInState, clearCredentials());

    expect(state.accessToken).toBeNull();
    expect(state.userId).toBeNull();
    expect(state.role).toBeNull();
    expect(state.authLoading).toBe(false);
  });

  test("setInitialized sets authInitialized to true", () => {
    const state = authReducer(initialState, setInitialized(true));
    expect(state.authInitialized).toBe(true);
    expect(state.authLoading).toBe(false);
  });

  test("setInitialized sets authInitialized to false", () => {
    const state = authReducer(
      { ...initialState, authInitialized: true },
      setInitialized(false),
    );
    expect(state.authInitialized).toBe(false);
    expect(state.authLoading).toBe(false);
  });

  test("setUserData sets userData in state", () => {
    const state = authReducer(initialState, setUserData(mockUser));
    expect(state.userData).toEqual(mockUser);
  });

  test("clearUserData sets userData to null", () => {
    const state = authReducer(
      { ...initialState, userData: mockUser },
      clearUserData(),
    );
    expect(state.userData).toBeNull();
  });

  test("setErrorMessage sets error message", () => {
    const state = authReducer(initialState, setErrorMessage("Login failed"));
    expect(state.errorMessage).toEqual("Login failed");
  });

  test("setErrorMessage can clear error message", () => {
    const state = authReducer(
      { ...initialState, errorMessage: "Login failed" },
      setErrorMessage(null),
    );
    expect(state.errorMessage).toBeNull();
  });
});
