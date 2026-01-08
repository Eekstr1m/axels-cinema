import { shallowEqual, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useCallback, useMemo } from "react";
import type { SessionListItem } from "../types";
import { loadSchedule, selectDate } from "../redux/slices/scheduleSlice";

export const useSchedule = () => {
  const dispatch = useDispatch();
  const { schedule, selectedDate, isLoading, error } = useSelector(
    (state: RootState) => state.schedule,
    shallowEqual
  );

  const loadScheduleData = useCallback(() => {
    dispatch(loadSchedule());
  }, [dispatch]);

  const handleSelectDate = useCallback(
    (date: string) => {
      dispatch(selectDate(date));
    },
    [dispatch]
  );

  const currentSessions = useMemo((): SessionListItem[] => {
    const daySchedule = schedule.find((d) => d.date === selectedDate);
    return daySchedule?.sessions || [];
  }, [schedule, selectedDate]);

  const availableDates = useMemo((): string[] => {
    return schedule.map((d) => d.date);
  }, [schedule]);

  return {
    schedule,
    selectedDate,
    isLoading,
    error,
    currentSessions,
    availableDates,
    loadScheduleData,
    handleSelectDate,
  };
};
