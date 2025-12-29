import { useState } from "react";

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
import { generateAvailableDates } from "../utils/utils";
import type { Session } from "../types";

export default function SessionsPage() {
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
    <StyledPaper elevation={1}>
      {/* Header */}
      <HeaderPaper elevation={2}>
        <HeaderBox>
          <LocalMoviesIcon />
          <CinemaTitle variant="h4">Axels Cinema Booking</CinemaTitle>
        </HeaderBox>
      </HeaderPaper>

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
        <LoadingBox>
          <CircularProgress />
        </LoadingBox>
      )}
      <BookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={selectedSession}
        date={selectedDate}
        onBook={handleBook}
      />
    </StyledPaper>
  );
}
