import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";

// Components
import { BookingModal, DateSelector, SessionTimesList } from "../components";

// Redux
import type { RootState } from "../redux/store";
import {
  loadMovieSessionsDates,
  loadSelectedSessions,
  loadSelectedSessionTime,
  setSelectedDate,
  setSelectedSessionTime,
  setSelectedSessionTimeId,
} from "../redux/cinemaSlice";

// MUI Icons
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

// Styled Components
import {
  CinemaTitle,
  HeaderBox,
  HeaderPaper,
  StyledPaper,
} from "../styled/pages/SessionsPage.styled";

export default function MovieSessions() {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch();
  const {
    sessionsDates,
    selectedSessions,
    selectedDate,
    selectedSessionTimeId,
    selectedSessionTime,
  } = useSelector((state: RootState) => state.cinema);

  useEffect(() => {
    if (movieId) {
      dispatch(loadMovieSessionsDates(movieId));
    }
  }, [dispatch, movieId]);

  const handleDateSelect = (date: string) => {
    dispatch(setSelectedDate(date));
    dispatch(loadSelectedSessions({ movieId: movieId!, date }));
  };

  const handleSessionSelect = (sessionId: string) => {
    dispatch(loadSelectedSessionTime(sessionId));
    dispatch(setSelectedSessionTimeId(sessionId));
  };

  const handleModalClose = () => {
    dispatch(setSelectedSessionTimeId(""));
    dispatch(setSelectedSessionTime(null));
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

      <DateSelector
        dates={sessionsDates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <SessionTimesList
        sessions={selectedSessions}
        onSessionSelect={handleSessionSelect}
      />

      <BookingModal
        open={!!selectedSessionTimeId}
        onClose={handleModalClose}
        sessionDetails={selectedSessionTime}
        date={selectedDate}
      />
    </StyledPaper>
  );
}
