import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ErrorPage } from ".";
import cinemaReducer from "../redux/cinemaSlice";

const mockStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

describe(ErrorPage, () => {
  test("ErrorPage renders with default message when no errorMessage is state", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("An unexpected error occurred. Please try again later.")
    ).toBeInTheDocument();
  });

  test("ErrorPage renders with specific errorMessage from state", () => {
    const customErrorStore = configureStore({
      reducer: {
        cinema: (state = { errorMessage: "Error loading sessions list:" }) =>
          state,
      },
    });

    render(
      <Provider store={customErrorStore}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("Error loading sessions list:")
    ).toBeInTheDocument();
  });

  test("ErrorPage matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
