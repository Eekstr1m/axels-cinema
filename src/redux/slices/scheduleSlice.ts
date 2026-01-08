import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DaySchedule } from "../../types";

interface ScheduleState {
  schedule: DaySchedule[];
  selectedDate: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedule: [],
  selectedDate: "",
  isLoading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // Initialize schedule loading
    loadSchedule: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Set the schedule data
    setSchedule: (state, action: PayloadAction<DaySchedule[]>) => {
      state.schedule = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // Date selection
    selectDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    // Set error state
    setScheduleError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loadSchedule, setSchedule, selectDate, setScheduleError } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
