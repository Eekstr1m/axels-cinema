import { useState } from "react";
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
// Utils
import { generateAvailableDates } from "./utils/utils";
import type { Session } from "./types";

function App() {
  const dates = generateAvailableDates();
  const [schedule, setSchedule] = useState(dates);
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].date || "");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get sessions for selected date
  const getCurrentSessions = (): Session[] => {
    const daySchedule = schedule.find((d) => d.date === selectedDate);
    return daySchedule?.sessions || [];
  };

  // Handle session selection
  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  // Handle booking
  const handleBook = (seats: { row: number; number: number }[]) => {
    if (!selectedSession) return;

    // Update the schedule with booked seats
    setSchedule((prevSchedule) =>
      prevSchedule.map((daySchedule) => {
        if (daySchedule.date !== selectedDate) return daySchedule;

        // Update the selected session's seats
        return {
          ...daySchedule,
          sessions: daySchedule.sessions.map((session) => {
            if (session.id !== selectedSession.id) return session;

            // Mark the selected seats as booked
            return {
              ...session,
              seats: session.seats.map((row) =>
                row.map((seat) => {
                  const isBooked = seats.some(
                    (s) => s.row === seat.row && s.number === seat.number
                  );
                  return isBooked ? { ...seat, isBooked: true } : seat;
                })
              ),
            };
          }),
        };
      })
    );
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

      {schedule.length > 0 ? (
        <>
          <DateSelector
            dates={schedule.map((d) => d.date)}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <SessionList
            sessions={getCurrentSessions()}
            onSessionSelect={handleSessionSelect}
          />
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      <BookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={selectedSession}
        date={selectedDate}
        onBook={handleBook}
      />
    </Paper>
  );
}

export default App;
