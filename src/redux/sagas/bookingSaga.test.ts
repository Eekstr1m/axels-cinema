import { runSaga } from "redux-saga";
import * as cinemaApi from "../../api/cinemaApi";
import { loadSessionDetailsSaga, bookSeatsSaga } from "./bookingSaga";
import {
  setSessionDetails,
  setBookedTicket,
  updateSessionSeats,
  setBookingError,
} from "../slices/bookingSlice";
import type { SessionDetails } from "../../types";

describe("bookingSaga", () => {
  const fetchSessionDetailsMock = jest.spyOn(cinemaApi, "fetchSessionDetails");

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loadSessionDetailsSaga", () => {
    test("successfully loads and sets session details", async () => {
      const mockSessionDetails: SessionDetails = {
        sessionId: "session-1",
        date: "2026-01-10",
        time: "10:00",
        totalSeats: 8,
        bookedSeats: 2,
        availableSeats: 6,
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

      fetchSessionDetailsMock.mockResolvedValue(mockSessionDetails);

      const dispatched: unknown[] = [];

      await runSaga(
        { dispatch: (action) => dispatched.push(action) },
        loadSessionDetailsSaga
      ).toPromise();

      expect(fetchSessionDetailsMock).toHaveBeenCalledTimes(1);
      expect(dispatched).toContainEqual(setSessionDetails(mockSessionDetails));
    });

    test("handles errors when loading session details", async () => {
      fetchSessionDetailsMock.mockRejectedValue(
        new Error("Failed to fetch session details")
      );

      const dispatched: unknown[] = [];

      await runSaga(
        { dispatch: (action) => dispatched.push(action) },
        loadSessionDetailsSaga
      ).toPromise();

      expect(fetchSessionDetailsMock).toHaveBeenCalledTimes(1);
      expect(dispatched).toContainEqual(
        setBookingError("Failed to load session details")
      );
    });
  });

  describe("bookSeatsSaga", () => {
    const mockSessionDetails: SessionDetails = {
      sessionId: "session-1",
      date: "2026-01-10",
      time: "10:00",
      totalSeats: 8,
      bookedSeats: 2,
      availableSeats: 6,
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

    test("successfully books seats", async () => {
      const selectedSeats = [
        { row: 1, number: 1 },
        { row: 2, number: 3 },
      ];

      const mockState = {
        booking: {
          sessionDetails: mockSessionDetails,
        },
        schedule: {
          selectedDate: "2026-01-10",
        },
      };

      const dispatched: unknown[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => mockState,
        },
        bookSeatsSaga,
        { type: "booking/bookSeats", payload: selectedSeats }
      ).toPromise();

      expect(dispatched).toContainEqual(
        updateSessionSeats(
          expect.objectContaining({
            sessionId: "session-1",
            bookedSeats: 4,
            availableSeats: 4,
          })
        )
      );

      expect(dispatched).toContainEqual(
        setBookedTicket({
          sessionId: "session-1",
          date: "2026-01-10",
          time: "10:00",
          seats: selectedSeats,
        })
      );
    });

    test("does not book when sessionDetails is missing", async () => {
      const selectedSeats = [
        { row: 1, number: 1 },
        { row: 2, number: 3 },
      ];

      const mockState = {
        booking: {
          sessionDetails: null,
        },
        schedule: {
          selectedDate: "2026-01-10",
        },
      };

      const dispatched: unknown[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => mockState,
        },
        bookSeatsSaga,
        { type: "booking/bookSeats", payload: selectedSeats }
      ).toPromise();

      expect(dispatched).toContainEqual(
        setBookingError("Missing booking information")
      );
      expect(dispatched).not.toContainEqual(setBookedTicket(expect.anything()));
    });

    test("does not book when selectedDate is missing", async () => {
      const selectedSeats = [
        { row: 1, number: 1 },
        { row: 2, number: 3 },
      ];

      const mockState = {
        booking: {
          sessionDetails: mockSessionDetails,
        },
        schedule: {
          selectedDate: "",
        },
      };

      const dispatched: unknown[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => mockState,
        },
        bookSeatsSaga,
        { type: "booking/bookSeats", payload: selectedSeats }
      ).toPromise();

      expect(dispatched).toContainEqual(
        setBookingError("Missing booking information")
      );
    });

    test("validates and rejects already booked seats", async () => {
      const selectedSeats = [
        { row: 1, number: 3 }, // Already booked
      ];

      const mockState = {
        booking: {
          sessionDetails: mockSessionDetails,
        },
        schedule: {
          selectedDate: "2026-01-10",
        },
      };

      const dispatched: unknown[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => mockState,
        },
        bookSeatsSaga,
        { type: "booking/bookSeats", payload: selectedSeats }
      ).toPromise();

      expect(dispatched).toContainEqual(
        setBookingError("Some seats are already booked")
      );
      expect(dispatched).not.toContainEqual(setBookedTicket(expect.anything()));
    });

    test("validates and rejects invalid seat row", async () => {
      const selectedSeats = [
        { row: 99, number: 1 }, // Invalid row
      ];

      const mockState = {
        booking: {
          sessionDetails: mockSessionDetails,
        },
        schedule: {
          selectedDate: "2026-01-10",
        },
      };

      const dispatched: unknown[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => mockState,
        },
        bookSeatsSaga,
        { type: "booking/bookSeats", payload: selectedSeats }
      ).toPromise();

      expect(dispatched).toContainEqual(
        setBookingError("Some seats are already booked")
      );
    });

    test("handles errors during booking process", async () => {
      const selectedSeats = [{ row: 1, number: 1 }];

      const dispatched: unknown[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => {
            throw new Error("State error");
          },
        },
        bookSeatsSaga,
        { type: "booking/bookSeats", payload: selectedSeats }
      ).toPromise();

      expect(dispatched).toContainEqual(
        setBookingError("Failed to book seats")
      );
    });
  });
});
