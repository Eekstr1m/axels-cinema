import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import cinemaReducer from "../redux/cinemaSlice";
import { SessionsPage } from ".";
import type { SessionDetails, BookedTicket } from "../types";

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
      schedule: [
        {
          date: "2026-01-10",
          sessions: [
            { id: "session-1", time: "14:00" },
            { id: "session-2", time: "18:00" },
          ],
        },
        {
          date: "2026-01-11",
          sessions: [{ id: "session-3", time: "20:00" }],
        },
      ],
      sessionDetails: {} as SessionDetails,
      selectedDate: "2026-01-10",
      selectedSessionId: null,
      isLoadingSchedule: false,
      isLoadingSession: false,
      bookedTicket: {} as BookedTicket,
      isProcessingPayment: false,
      isError: false,
    },
  },
});

describe(SessionsPage, () => {
  test("SessionsPage renders", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Axels Cinema Booking")).toBeInTheDocument();
  });

  test("SessionsPage show loading spinner when loading schedule", () => {
    const loadingStore = configureStore({
      reducer: {
        cinema: (state = { schedule: [], isLoadingSchedule: true }) => state,
      },
    });

    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("SessionsPage renders DateSelector and SessionList when schedule loaded", () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    // Check DateSelector is rendered with formatted dates
    expect(screen.getByText("Sat, Jan 10")).toBeInTheDocument();
    expect(screen.getByText("Sun, Jan 11")).toBeInTheDocument();

    // Check SessionList is rendered with sessions
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();
  });

  test("SessionsPage updates sessions when date is changed", async () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();

    const dateButton = screen.getByText("Sun, Jan 11");
    await user.click(dateButton);

    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.queryByText("14:00")).not.toBeInTheDocument();
  });

  test("SessionsPage open BookingModal when session is selected", async () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.queryByText("14:00")).not.toBeInTheDocument();

    const user = userEvent.setup();
    const sessionButton = screen.getByText("20:00");
    await user.click(sessionButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  test("SessionPage matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
