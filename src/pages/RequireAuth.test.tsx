import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cinemaReducer from "../redux/cinemaSlice";
import RequireAuth from "./RequireAuth";

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

describe(RequireAuth, () => {
  test("RequireAuth shows loading spinner when auth is not initialized", () => {
    const store = makeStore({ authInitialized: false });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/profile"]}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Profile Page")).not.toBeInTheDocument();
  });

  test("RequireAuth shows loading spinner when authLoading is true", () => {
    const store = makeStore({ authLoading: true, authInitialized: false });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/profile"]}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("RequireAuth redirects to /login when not authenticated", () => {
    const store = makeStore({ accessToken: null });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/profile"]}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Profile Page")).not.toBeInTheDocument();
  });

  test("RequireAuth renders protected page when authenticated", () => {
    const store = makeStore({ accessToken: "valid-token" });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/profile"]}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Profile Page")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});
