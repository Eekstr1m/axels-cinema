import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
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
  } = useSelector((state: RootState) => state.cinema);

  const navigate = useNavigate();

  // Initialize schedule on component mount (only if not already loaded)
  useEffect(() => {
    if (schedule.length === 0 && !isLoadingSchedule) {
      dispatch(initializeSchedule());
    }
  }, [dispatch, schedule.length, isLoadingSchedule]);

  // Update selected date when schedule loads
  useEffect(() => {
    if (schedule.length > 0 && !selectedDate) {
      // Set default date to today if available, else first date in schedule
      const today = new Date().toISOString().split("T")[0];
      const isTodayAvailable = schedule.some((d) => d.date === today);

      if (isTodayAvailable) {
        dispatch(selectDate(today));
      } else {
        dispatch(selectDate(schedule[0].date));
      }
    }
  }, [schedule, selectedDate, dispatch]);

  // Get sessions for selected date
  const getCurrentSessions = (): SessionListItem[] => {
    const daySchedule = schedule.find((d) => d.date === selectedDate);
    return daySchedule?.sessions || [];
  };

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
            sessions={getCurrentSessions()}
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
