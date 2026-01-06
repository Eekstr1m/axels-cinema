import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cinemaReducer from "../redux/cinemaSlice";
import { BookingModal } from ".";
import type { SessionDetails } from "../types";

const mockStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

const mockSessionDetails: SessionDetails = {
  sessionId: "session-1",
  date: "2026-01-10",
  time: "18:00",
  totalSeats: 20,
  bookedSeats: 5,
  availableSeats: 15,
  seats: [
    [
      { row: 1, number: 1, isBooked: false },
      { row: 1, number: 2, isBooked: false },
      { row: 1, number: 3, isBooked: true },
      { row: 1, number: 4, isBooked: false },
    ],
    [
      { row: 2, number: 1, isBooked: false },
      { row: 2, number: 2, isBooked: true },
      { row: 2, number: 3, isBooked: false },
      { row: 2, number: 4, isBooked: false },
    ],
  ],
};

describe(BookingModal, () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  test("BookingModal shows loading spinner", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={null}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Booking Tickets")).not.toBeInTheDocument();
  });

  test("BookingModal does not render when open is false", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={false}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={null}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("BookingModal renders with session details", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Booking Tickets")).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText("Sat, Jan 10")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });

  test("BookingModal displays all seats", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    // Get all seat elements by their numbers and border style
    const allElements = screen.getAllByText(/^[1-9]$/);
    const seatsWithBorder = allElements.filter(
      (element) => window.getComputedStyle(element).border !== ""
    );

    expect(seatsWithBorder.length).toBe(8);
  });

  test("BookingModal shows legend", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Booked")).toBeInTheDocument();
    expect(screen.getByText("Selected")).toBeInTheDocument();
  });

  test("BookingModal allows seat selection", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    expect(screen.queryByText(/Selected seats:/i)).not.toBeInTheDocument();

    const seats = screen
      .getAllByText(/^[1-9]$/)
      .filter((element) => window.getComputedStyle(element).border !== "");
    await user.click(seats[0]);

    expect(screen.getByText("Selected seats: 1")).toBeInTheDocument();
    expect(screen.getByText("Row 1, Seat 1")).toBeInTheDocument();

    await user.click(seats[1]);
    expect(screen.getByText("Selected seats: 2")).toBeInTheDocument();
    expect(screen.getByText("Row 1, Seat 2")).toBeInTheDocument();
  });

  test("BookingModal allows seat deselection", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const seats = screen
      .getAllByText(/^[1-9]$/)
      .filter((element) => window.getComputedStyle(element).border !== "");
    await user.click(seats[0]);
    expect(screen.getByText("Selected seats: 1")).toBeInTheDocument();

    await user.click(seats[0]);
    expect(screen.queryByText(/Selected seats:/i)).not.toBeInTheDocument();
  });

  test("BookingModal confirm button is disabled with no seats selected and enabled when seats are selected", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const confirmButton = screen.getByRole("button", { name: /book/i });
    expect(confirmButton).toBeDisabled();

    const seats = screen
      .getAllByText(/^[1-9]$/)
      .filter((element) => window.getComputedStyle(element).border !== "");
    await user.click(seats[0]);
    expect(confirmButton).toBeEnabled();
  });

  test("BookingModal cancel button calls onClose", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <BookingModal
            open={true}
            onClose={onClose}
            date="2026-01-10"
            sessionDetails={mockSessionDetails}
          />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    await user.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('BookingModal matches snapshot', () => {
    const { asFragment } = render(<Provider store={mockStore}>
        <BrowserRouter>
        <BookingModal open={true} onClose={onClose} date='2026-01-10' sessionDetails={mockSessionDetails} />
        </BrowserRouter>
    </Provider>)

    expect(asFragment()).toMatchSnapshot();
  });
});
