import { useEffect, useMemo } from "react";

// Redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  initializeSchedule,
  selectDate,
  selectSession,
  clearSelectedSession,
  loadSessionDetails,
} from "../redux/cinemaSlice";
import type { RootState } from "../redux/store";

// Components
import { DateSelector, SessionList, BookingModal } from "../components/.";

// MUI Components
import CircularProgress from "@mui/material/CircularProgress";

// MUI Icons
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

// Styled Components
import {
  CinemaTitle,
  HeaderBox,
  HeaderPaper,
  LoadingBox,
  StyledPaper,
} from "../styled/pages/SessionsPage.styled";

// Other
import type { SessionListItem } from "../types";
import { useNavigate } from "react-router";

export default function SessionsPage() {
  const dispatch = useDispatch();
  const {
    schedule,
    selectedDate,
    selectedSessionId,
    sessionDetails,
    isLoadingSchedule,
    isError,
  } = useSelector((state: RootState) => state.cinema, shallowEqual);

  const navigate = useNavigate();

  // Initialize schedule and set default date
  useEffect(() => {
    if (schedule.length === 0 && !isLoadingSchedule) {
      dispatch(initializeSchedule());
    } else if (schedule.length > 0 && !selectedDate) {
      // Set default date to today if available, else first date in schedule
      const today = new Date().toLocaleDateString("en-CA");
      const isTodayAvailable = schedule.some((d) => d.date === today);

      if (isTodayAvailable) {
        dispatch(selectDate(today));
      } else {
        dispatch(selectDate(schedule[0].date));
      }
    }
  }, [dispatch, schedule, selectedDate, isLoadingSchedule]);

  // Get sessions for selected date (memoized for performance)
  const currentSessions = useMemo((): SessionListItem[] => {
    const daySchedule = schedule.find((d) => d.date === selectedDate);
    return daySchedule?.sessions || [];
  }, [schedule, selectedDate]);

  // Handle date selection
  const handleDateSelect = (date: string) => {
    dispatch(selectDate(date));
  };

  // Handle session selection
  const handleSessionSelect = (sessionId: string) => {
    dispatch(selectSession(sessionId));
    // Load session details only if not already loaded
    if (!sessionDetails?.sessionId) {
      dispatch(loadSessionDetails());
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    dispatch(clearSelectedSession());
  };

  if (isError) {
    navigate("/error");
  }

  return (
    <StyledPaper elevation={1}>
      {/* Header */}
      <HeaderPaper elevation={2}>
        <HeaderBox>
          <LocalMoviesIcon />
          <CinemaTitle variant="h4">Axels Cinema Booking</CinemaTitle>
        </HeaderBox>
      </HeaderPaper>

      {isLoadingSchedule ? (
        <LoadingBox>
          <CircularProgress />
        </LoadingBox>
      ) : (
        <>
          <DateSelector
            dates={schedule.map((d) => d.date)}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          <SessionList
            sessions={currentSessions}
            onSessionSelect={handleSessionSelect}
          />
        </>
      )}
      <BookingModal
        open={!!selectedSessionId}
        onClose={handleModalClose}
        sessionDetails={sessionDetails}
        date={selectedDate}
      />
    </StyledPaper>
  );
}
