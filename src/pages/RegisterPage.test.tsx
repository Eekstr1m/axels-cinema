import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import authReducer from "../redux/authSlice";
import cinemaReducer from "../redux/cinemaSlice";
import RegisterPage from "./RegisterPage";

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

describe(RegisterPage, () => {
  test("RegisterPage shows loading spinner when auth is not initialized", () => {
    const store = makeStore({ authInitialized: false });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Create your account")).not.toBeInTheDocument();
  });

  test("RegisterPage renders the register form with all fields", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  test("RegisterPage shows validation errors on empty submit", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findAllByText(/required/i)).toHaveLength(5);
  });

  test("RegisterPage shows error message from auth state", () => {
    const store = makeStore({ errorMessage: "Registration failed" });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Registration failed")).toBeInTheDocument();
  });

  test("RegisterPage dispatches register user action valid form submit", async () => {
    const store = makeStore();
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Full Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john.doe@example.com");
    await user.type(screen.getByLabelText("Phone Number"), "+1 234 567 8901");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/registerUser",
        payload: {
          email: "john.doe@example.com",
          password: "password123",
          fullName: "John Doe",
          phone: "+1 234 567 8901",
        },
      }),
    );

    dispatchSpy.mockRestore();
  });

  test("RegisterPage shows password mismatch error", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "differentPass");
    await user.tab();

    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
  });

  test("ProfilePage renders link to login page", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole("ling", { name: /sign in/i })).toBeInTheDocument();
  });

  test("RegisterPage matches snapshot", () => {
    const store = makeStore();

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
