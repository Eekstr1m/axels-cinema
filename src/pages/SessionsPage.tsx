import { useEffect } from "react";
import { useNavigate } from "react-router";

// Custom Hooks
import { useBooking, useSchedule } from "../hooks/.";

// Components
import { BookingModal, DateSelector, SessionList } from "../components/.";

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

export default function SessionsPage() {
  const navigate = useNavigate();

  // Use custom hooks for state management
  const {
    schedule,
    selectedDate,
    isLoading: isLoadingSchedule,
    currentSessions,
    availableDates,
    loadScheduleData,
    handleSelectDate,
  } = useSchedule();

  const {
    sessionDetails,
    isSessionSelected,
    error: bookingError,
    loadSession,
    handleSelectSession,
    handleClearSession,
  } = useBooking();

  // Initialize schedule on mount
  useEffect(() => {
    if (schedule.length === 0 && !isLoadingSchedule) {
      loadScheduleData();
    } else if (schedule.length > 0 && !selectedDate) {
      // Set default date
      const today = new Date().toLocaleDateString("en-CA");
      const isTodayAvailable = schedule.some((d) => d.date === today);
      handleSelectDate(isTodayAvailable ? today : schedule[0].date);
    }
  }, [
    schedule,
    selectedDate,
    isLoadingSchedule,
    loadScheduleData,
    handleSelectDate,
  ]);

  // Handle session selection
  const onSessionSelect = (sessionId: string) => {
    handleSelectSession(sessionId);
    loadSession(sessionId);
  };

  // Navigate to error page if there's an error
  if (bookingError) {
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
            dates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleSelectDate}
          />
          <SessionList
            sessions={currentSessions}
            onSessionSelect={onSessionSelect}
          />
        </>
      )}
      <BookingModal
        open={isSessionSelected}
        onClose={handleClearSession}
        sessionDetails={sessionDetails}
        date={selectedDate}
      />
    </StyledPaper>
  );
}
