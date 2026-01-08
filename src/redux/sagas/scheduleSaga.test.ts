import { runSaga } from "redux-saga";
import * as cinemaApi from "../../api/cinemaApi";
import { loadScheduleSaga } from "./scheduleSaga";
import { setSchedule, setScheduleError } from "../slices/scheduleSlice";
import type { SessionsListResponse } from "../../types";

describe("scheduleSaga", () => {
  const fetchSessionsListMock = jest.spyOn(cinemaApi, "fetchSessionsList");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loadScheduleSaga - successfully loads and sets schedule", async () => {
    const mockResponse: SessionsListResponse = {
      sessionsList: [
        {
          date: "2026-01-10",
          sessions: [
            { id: "session-1", time: "10:00" },
            { id: "session-2", time: "12:00" },
          ],
        },
        {
          date: "2026-01-11",
          sessions: [
            { id: "session-3", time: "14:00" },
            { id: "session-4", time: "16:00" },
          ],
        },
      ],
    };

    fetchSessionsListMock.mockResolvedValue(mockResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadScheduleSaga
    ).toPromise();

    expect(fetchSessionsListMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(setSchedule(mockResponse.sessionsList));
  });

  test("loadScheduleSaga - handles network errors", async () => {
    fetchSessionsListMock.mockRejectedValue(
      new Error("Failed to fetch sessions list")
    );

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadScheduleSaga
    ).toPromise();

    expect(fetchSessionsListMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(
      setScheduleError("Error loading schedule")
    );
  });

  test("loadScheduleSaga - handles empty schedule response", async () => {
    const mockResponse: SessionsListResponse = {
      sessionsList: [],
    };

    fetchSessionsListMock.mockResolvedValue(mockResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadScheduleSaga
    ).toPromise();

    expect(dispatched).toContainEqual(setSchedule([]));
  });

  test("loadScheduleSaga - handles API timeout", async () => {
    fetchSessionsListMock.mockRejectedValue(new Error("Request timeout"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadScheduleSaga
    ).toPromise();

    expect(dispatched).toContainEqual(
      setScheduleError("Error loading schedule")
    );
  });
});
