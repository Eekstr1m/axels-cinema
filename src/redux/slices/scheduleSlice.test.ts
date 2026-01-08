import scheduleReducer, {
  loadSchedule,
  setSchedule,
  selectDate,
  setScheduleError,
} from "./scheduleSlice";

import type { DaySchedule } from "../../types";

describe("scheduleSlice", () => {
  const initialState = {
    schedule: [],
    selectedDate: "",
    isLoading: false,
    error: null,
  };

  test("should return the initial state", () => {
    expect(scheduleReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("loadSchedule sets loading state to true and clears error", () => {
    const previousState = {
      ...initialState,
      error: "Previous error",
    };

    const state = scheduleReducer(previousState, loadSchedule());

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("setSchedule sets schedule data and loading to false", () => {
    const mockSchedule: DaySchedule[] = [
      {
        date: "2026-01-10",
        sessions: [
          { id: "session-1", time: "14:00" },
          { id: "session-2", time: "16:00" },
        ],
      },
      {
        date: "2026-01-11",
        sessions: [
          { id: "session-3", time: "10:00" },
          { id: "session-4", time: "18:00" },
        ],
      },
    ];

    const previousState = {
      ...initialState,
      isLoading: true,
    };

    const state = scheduleReducer(previousState, setSchedule(mockSchedule));

    expect(state.schedule).toEqual(mockSchedule);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test("selectDate sets the selected date", () => {
    const state = scheduleReducer(initialState, selectDate("2026-01-10"));
    expect(state.selectedDate).toBe("2026-01-10");
  });

  test("selectDate updates the selected date", () => {
    const previousState = {
      ...initialState,
      selectedDate: "2026-01-10",
    };

    const state = scheduleReducer(previousState, selectDate("2026-01-15"));
    expect(state.selectedDate).toBe("2026-01-15");
  });

  test("setScheduleError sets error message and stops loading", () => {
    const previousState = {
      ...initialState,
      isLoading: true,
    };

    const errorMessage = "Failed to load schedule";
    const state = scheduleReducer(
      previousState,
      setScheduleError(errorMessage)
    );

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });

  test("setScheduleError works when not loading", () => {
    const errorMessage = "Network error";
    const state = scheduleReducer(initialState, setScheduleError(errorMessage));

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });
});
