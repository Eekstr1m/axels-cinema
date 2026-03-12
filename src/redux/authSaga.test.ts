import { runSaga } from "redux-saga";
import * as cinemaApi from "../api/cinemaApi";
import type { RefreshTokenResponse } from "../interfaces/auth.interface";
import type { DetailedUser } from "../interfaces/user.interface";
import {
  initializeAuthSaga,
  loadUserDataSaga,
  loginUserSaga,
  logoutUserSaga,
  registerUserSaga,
} from "./authSaga";
import {
  clearCredentials,
  clearUserData,
  loadUserData,
  setCredentials,
  setInitialized,
  setUserData,
} from "./authSlice";

const mockTokenResponse: RefreshTokenResponse = {
  id: "user-1",
  accessToken: "access-token-123",
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

describe("authSaga", () => {
  const refetchTokenMock = jest.spyOn(cinemaApi, "refetchToken");
  const fetchUserDataMock = jest.spyOn(cinemaApi, "fetchUserData");
  const loginMock = jest.spyOn(cinemaApi, "login");
  const authRegisterMock = jest.spyOn(cinemaApi, "authRegister");
  const logoutMock = jest.spyOn(cinemaApi, "logout");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initializeAuthSaga successfully initializes auth and dispatches setCredentials", async () => {
    refetchTokenMock.mockResolvedValue(mockTokenResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initializeAuthSaga,
    ).toPromise();

    expect(refetchTokenMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(
      setCredentials({
        accessToken: mockTokenResponse.accessToken,
        userId: mockTokenResponse.id,
      }),
    );
    expect(dispatched).toContainEqual(setInitialized(true));
    expect(dispatched).toContainEqual(loadUserData());
  });

  test("initializeAuthSaga handles errors and still sets initialized to true", async () => {
    refetchTokenMock.mockRejectedValue(new Error("Token expired"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initializeAuthSaga,
    ).toPromise();

    expect(refetchTokenMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(setInitialized(true));
    expect(dispatched).not.toContainEqual(
      expect.objectContaining({ type: "auth/setCredentials" }),
    );
  });

  test("loadUserDataSaga successfully loads and sets user data", async () => {
    fetchUserDataMock.mockResolvedValue(mockUser);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadUserDataSaga,
    ).toPromise();

    expect(fetchUserDataMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(setUserData(mockUser));
  });

  test("loadUserDataSaga handles errors and clears user data", async () => {
    fetchUserDataMock.mockRejectedValue(new Error("Unauthorized"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadUserDataSaga,
    ).toPromise();

    expect(dispatched).toContainEqual(clearUserData());
  });

  test("loginUserSaga successfully logs in and sets credentials", async () => {
    loginMock.mockResolvedValue(mockTokenResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loginUserSaga,
      {
        type: "auth/loginUser",
        payload: { email: "john@example.com", password: "password123" },
      },
    ).toPromise();

    expect(loginMock).toHaveBeenCalledWith("john@example.com", "password123");
    expect(dispatched).toContainEqual(
      setCredentials({
        accessToken: mockTokenResponse.accessToken,
        userId: mockTokenResponse.id,
      }),
    );
    expect(dispatched).toContainEqual(loadUserData());
  });

  test("loginUserSaga handles errors and sets errorMessage", async () => {
    loginMock.mockRejectedValue(new Error("Invalid credentials"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loginUserSaga,
      {
        type: "auth/loginUser",
        payload: { email: "bad@example.com", password: "wrong" },
      },
    ).toPromise();

    expect(dispatched).toContainEqual(
      expect.objectContaining({ type: "auth/setErrorMessage" }),
    );
  });

  test("registerUserSaga successfully registers and sets credentials", async () => {
    authRegisterMock.mockResolvedValue(mockTokenResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      registerUserSaga,
      {
        type: "auth/registerUser",
        payload: {
          email: "new@example.com",
          password: "password123",
          fullName: "New User",
          phone: "+1234567890",
        },
      },
    ).toPromise();

    expect(authRegisterMock).toHaveBeenCalledWith(
      "new@example.com",
      "password123",
      "New User",
      "+1234567890",
    );
    expect(dispatched).toContainEqual(
      setCredentials({
        accessToken: mockTokenResponse.accessToken,
        userId: mockTokenResponse.id,
      }),
    );
    expect(dispatched).toContainEqual(loadUserData());
  });

  test("registerUserSaga handles errors and sets errorMessage", async () => {
    authRegisterMock.mockRejectedValue(new Error("Email already in use"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      registerUserSaga,
      {
        type: "auth/registerUser",
        payload: {
          email: "existing@example.com",
          password: "password123",
          fullName: "Existing User",
          phone: "+1234567890",
        },
      },
    ).toPromise();

    expect(dispatched).toContainEqual(
      expect.objectContaining({ type: "auth/setErrorMessage" }),
    );
  });

  test("logoutUserSaga successfully logs out and clears credentials", async () => {
    logoutMock.mockResolvedValue({ message: "Logged out" });

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      logoutUserSaga,
    ).toPromise();

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(clearCredentials());
    expect(dispatched).toContainEqual(clearUserData());
  });

  test("logoutUserSaga handles errors silently", async () => {
    logoutMock.mockRejectedValue(new Error("Network error"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      logoutUserSaga,
    ).toPromise();

    expect(dispatched).toHaveLength(0);
  });
});
