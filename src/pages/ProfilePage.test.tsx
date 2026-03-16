import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import authReducer from "../redux/authSlice";
import cinemaReducer from "../redux/cinemaSlice";
import ProfilePage from "./ProfilePage";
import type { DetailedUser } from "../interfaces/user.interface";

const mockUser: DetailedUser = {
  userId: "user-123",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  role: "user",
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
  updatedAt: new Date("2025-01-01T00:00:00.000Z"),
  totalMoviesBooked: 7,
  totalSeatsBooked: 14,
  totalMoneySpent: 175,
};

const makeStore = (userData: DetailedUser | null = null) =>
  configureStore({
    reducer: {
      cinema: cinemaReducer,
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        accessToken: userData ? "mock-token" : null,
        userId: userData?.userId ?? null,
        role: userData?.role ?? null,
        authInitialized: true,
        authLoading: false,
        userData,
        errorMessage: null,
      },
    },
  });

describe(ProfilePage, () => {
  test("ProfilePage shows loading spinner when user data is not loaded", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("ProfilePage renders user information", () => {
    const store = makeStore(mockUser);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
  });

  test("ProfilePage renders booking statistics", () => {
    const store = makeStore(mockUser);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("$175")).toBeInTheDocument();
  });

  test("ProfilePage renders logout button", () => {
    const store = makeStore(mockUser);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByRole("button", { name: /log out/i }),
    ).toBeInTheDocument();
  });

  test("ProfilePage dispatches logout user action on logout button click", async () => {
    const store = makeStore(mockUser);
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /log out/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/logoutUser",
      }),
    );

    dispatchSpy.mockRestore();
  });

  test("ProfilePage matches snapshot", () => {
    const store = makeStore(mockUser);

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
