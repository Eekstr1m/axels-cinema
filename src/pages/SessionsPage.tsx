import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";

// MUI Icons
import MovieOffIcon from "@mui/icons-material/SearchOff";

// Components
import {
  BookingModal,
  DateSelector,
  Header,
  MovieBanner,
  NotFoundException,
  SessionTimesList,
} from "../components";

// Redux
import type { RootState } from "../redux/store";
import {
  initializeMovies,
  loadMovieSessionsDates,
  loadSelectedSessions,
  loadSelectedSessionTime,
  setSelectedDate,
  setSelectedSessionTime,
  setSelectedSessionTimeId,
} from "../redux/cinemaSlice";

// Styled Components
import { SessionContainer } from "../styled/pages/SessionsPage.styled";

export default function MovieSessions() {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch();
  const {
    movies,
    sessionsDates,
    selectedSessions,
    selectedDate,
    selectedSessionTimeId,
    selectedSessionTime,
  } = useSelector((state: RootState) => state.cinema);

  const movie = movies.find((m) => m._id === movieId);

  useEffect(() => {
    if (movieId) {
      dispatch(loadMovieSessionsDates(movieId));
    }
    if (movies.length === 0) {
      dispatch(initializeMovies());
    }
  }, [dispatch, movieId, movies.length]);

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

  if (!movie) {
    return (
      <NotFoundException
        icon={<MovieOffIcon />}
        title="Movie not found"
        subtitle="The movie you are looking for does not exist."
      />
    );
  }

  return (
    <SessionContainer>
      <Header renderProfileButton />

      <MovieBanner movie={movie} />

      <DateSelector
        dates={sessionsDates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <SessionTimesList
        sessions={selectedSessions}
        onSessionSelect={handleSessionSelect}
        selectedDate={selectedDate}
      />

      <BookingModal
        open={!!selectedSessionTimeId}
        onClose={handleModalClose}
        sessionDetails={selectedSessionTime}
        date={selectedDate}
      />
    </SessionContainer>
  );
}
