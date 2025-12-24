import { useEffect } from "react";
// Components
import DateSelector from "./components/DateSelector";
import SessionList from "./components/SessionList";
import BookingModal from "./components/BookingModal";
// MUI Components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSchedule,
  selectDate,
  selectSession,
  clearSelectedSession,
  loadSessionDetails,
} from "./redux/cinemaSlice";
import type { RootState } from "./redux/store";
// Types
import type { SessionListItem } from "./types";

function App() {
  const dispatch = useDispatch();
  const {
    schedule,
    selectedDate,
    selectedSessionId,
    sessionDetails,
    isLoadingSchedule,
  } = useSelector((state: RootState) => state.cinema);

  // Initialize schedule on component mount
  useEffect(() => {
    dispatch(initializeSchedule());
  }, [dispatch]);

  // Update selected date when schedule loads
  useEffect(() => {
    if (schedule.length > 0 && !selectedDate) {
      dispatch(selectDate(schedule[0].date));
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
    dispatch(loadSessionDetails());
  };

  // Handle modal close
  const handleModalClose = () => {
    dispatch(clearSelectedSession());
  };

  return (
    <Paper elevation={1} sx={{ p: 4 }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <LocalMoviesIcon sx={{ fontSize: 40 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Axels Cinema Booking
          </Typography>
        </Box>
      </Paper>

      {isLoadingSchedule ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : schedule.length > 0 ? (
        <>
          <DateSelector
            dates={schedule.map((d) => d.date)}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          <SessionList
            sessions={getCurrentSessions()}
            selectedDate={selectedDate}
            onSessionSelect={handleSessionSelect}
          />
        </>
      ) : (
        <Typography variant="body1" textAlign="center">
          No sessions available
        </Typography>
      )}
      <BookingModal
        open={!!selectedSessionId}
        onClose={handleModalClose}
        sessionDetails={sessionDetails}
        date={selectedDate}
      />
    </Paper>
  );
}

export default App;
