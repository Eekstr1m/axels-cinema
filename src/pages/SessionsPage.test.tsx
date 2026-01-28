import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import cinemaReducer from "../redux/cinemaSlice";
import { SessionsPage } from ".";

const mockStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

const scheduleStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
  preloadedState: {
    cinema: {
      movies: [],
      sessionsDates: ["2026-01-10", "2026-01-11"],
      selectedDate: "2026-01-10",
      selectedSessions: [
        {
          _id: "session-1",
          movieId: "movie-1",
          date: "2026-01-10",
          startTime: "14:00",
        },
        {
          _id: "session-2",
          movieId: "movie-1",
          date: "2026-01-10",
          startTime: "18:00",
        },
      ],
      selectedSessionTimeId: undefined,
      selectedSessionTime: null,
      bookingSummary: null,
      bookingData: null,
      paymentStatus: "idle" as const,
      errorMessage: null,
    },
  },
});

describe(SessionsPage, () => {
  test("SessionsPage renders", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SessionsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Axels Cinema Booking")).toBeInTheDocument();
  });

  test("SessionsPage renders DateSelector and SessionList when schedule loaded", () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SessionsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    // Check DateSelector is rendered with dates
    expect(screen.getByText("Select a date")).toBeInTheDocument();

    // Check SessionList is rendered with sessions
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });

  test("SessionsPage updates sessions when date is changed", async () => {
    const dynamicStore = configureStore({
      reducer: {
        cinema: cinemaReducer,
      },
      preloadedState: {
        cinema: {
          movies: [],
          sessionsDates: ["2026-01-10", "2026-01-11"],
          selectedDate: "2026-01-10",
          selectedSessions: [
            {
              _id: "session-1",
              movieId: "movie-1",
              date: "2026-01-10",
              startTime: "14:00",
            },
            {
              _id: "session-2",
              movieId: "movie-1",
              date: "2026-01-10",
              startTime: "18:00",
            },
          ],
          selectedSessionTimeId: undefined,
          selectedSessionTime: null,
          bookingSummary: null,
          bookingData: null,
          paymentStatus: "idle" as const,
          errorMessage: null,
        },
      },
    });

    render(
      <Provider store={dynamicStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SessionsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();

    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();

    // Click on second date
    const dateElements = screen.getAllByText("11");
    await user.click(dateElements[0]);

    // Wait for dispatch action to be processed
    await waitFor(() => {
      expect(dynamicStore.getState().cinema.selectedDate).toBe("2026-01-11");
    });
  });

  test("SessionsPage open BookingModal when session is selected", async () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SessionsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("14:00")).toBeInTheDocument();

    const user = userEvent.setup();
    const sessionButton = screen.getByText("14:00");
    await user.click(sessionButton);

    // Wait for modal to open (selectedSessionTimeId is set)
    await waitFor(() => {
      expect(scheduleStore.getState().cinema.selectedSessionTimeId).toBe(
        "session-1",
      );
    });
  });

  test("SessionPage matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SessionsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
