import { call, put } from "redux-saga/effects";
import { fetchSessionsList } from "../../api/cinemaApi";
import type { DaySchedule, SessionsListResponse } from "../../types";
import { setSchedule, setScheduleError } from "../slices/scheduleSlice";

export function* loadScheduleSaga() {
  try {
    // Load sessions list (without seat details)
    const response: SessionsListResponse = yield call(fetchSessionsList);

    const schedule: DaySchedule[] = response.sessionsList;

    // Dispatch action to set schedule
    yield put(setSchedule(schedule));
  } catch (error) {
    console.error("Error loading schedule:", error);
    yield put(setScheduleError("Error loading schedule"));
  }
}
