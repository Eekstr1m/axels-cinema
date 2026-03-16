import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cinemaReducer from "../redux/cinemaSlice";
import LoginPage from "./LoginPage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const makeStore = (overrides = {}) =>
  configureStore({
    reducer: {
      cinema: cinemaReducer,
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        accessToken: null,
        userId: null,
        role: null,
        authInitialized: true,
        authLoading: false,
        userData: null,
        errorMessage: null,
        ...overrides,
      },
    },
  });

describe(LoginPage, () => {
  test("LoginPage shows loading spinner when auth is not initialized", () => {
    const store = makeStore({ authInitialized: false });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Welcome back")).not.toBeInTheDocument();
  });

  test("LoginPage renders the login form", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test("LoginPage shows validations errors on empty submit", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
  });

  test("LoginPage shows error message from auth state", () => {
    const store = makeStore({ errorMessage: "Invalid credentials" });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  test("LoginPage dispatches login user on valid form submit", async () => {
    const store = makeStore();
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Email"), "john.doe@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/loginUser",
        payload: {
          email: "john.doe@example.com",
          password: "password123",
        },
      }),
    );

    dispatchSpy.mockRestore();
  });

  test("LoginPage renders link to register page", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByRole("link", { name: /create your account/i }),
    ).toBeInTheDocument();
  });

  test("LoginPage matches snapshot", () => {
    const store = makeStore();

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
