import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cinemaReducer from "../redux/cinemaSlice";
import Header from "./Header";

const guestStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
    auth: authReducer,
  },
});

const loggedStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      accessToken: "mock-access-token",
      userId: "user-1",
      role: "user",
      authInitialized: true,
      authLoading: false,
      userData: null,
      errorMessage: null,
    },
  },
});

describe(Header, () => {
  test("Header renders the cinema brand title", () => {
    render(
      <Provider store={guestStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Axels Cinema")).toBeInTheDocument();
  });

  test("Header does not render profile button by default", () => {
    render(
      <Provider store={guestStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("Header renders Login button when user is not logged in and renderProfileButton is true", () => {
    render(
      <Provider store={guestStore}>
        <BrowserRouter>
          <Header renderProfileButton />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("Header renders Profile button when user is logged in and renderProfileButton is true", () => {
    render(
      <Provider store={loggedStore}>
        <BrowserRouter>
          <Header renderProfileButton />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByRole("button", { name: /profile/i }),
    ).toBeInTheDocument();
  });

  test("Header navigates to /login when Login button is clicked", async () => {
    render(
      <Provider store={guestStore}>
        <BrowserRouter>
          <Header renderProfileButton />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(window.location.pathname).toBe("/login");
  });

  test("Header navigates to /profile when Profile button is clicked", async () => {
    render(
      <Provider store={loggedStore}>
        <BrowserRouter>
          <Header renderProfileButton />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /profile/i }));

    expect(window.location.pathname).toBe("/profile");
  });

  test("Header matches snapshot when user is logged in", () => {
    const { asFragment } = render(
      <Provider store={loggedStore}>
        <BrowserRouter>
          <Header renderProfileButton />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Header matches snapshot when user is not logged in", () => {
    const { asFragment } = render(
      <Provider store={guestStore}>
        <BrowserRouter>
          <Header renderProfileButton />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
