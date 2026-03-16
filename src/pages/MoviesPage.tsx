import { useEffect } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { initializeMovies } from "../redux/cinemaSlice";
import type { RootState } from "../redux/store";

// Components
import { NotFoundException, Header } from "../components";

// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

// Styled Components
import {
  BookingButton,
  GenreChip,
  MovieCard,
  MovieContentBox,
  MovieDescriptionText,
  MovieImageContainer,
  MovieInfoBox,
  MovieInfoItem,
  MovieMetaBox,
  MoviesGrid,
  MovieTitleText,
  PageContainer,
} from "../styled/pages/MoviesPage.styled";

import { formatDuration, parseDate } from "../utils/utils";

export default function MoviesPage() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state: RootState) => state.cinema);

  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(initializeMovies());
    }
  }, [dispatch, movies.length]);

  const handleSelectMovie = (movieId: string) => {
    navigate(`/sessions/${movieId}`);
  };

  if (!movies || movies.length === 0) {
    return (
      <PageContainer maxWidth="lg">
        <Header renderProfileButton />
        <NotFoundException
          icon={<MovieCreationIcon />}
          title="No movies found"
          subtitle="Please try again later"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg">
      {/* Header */}
      <Header renderProfileButton />

      {/* Movies Grid */}
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard key={movie._id}>
            {/* Movie Poster */}
            <MovieImageContainer>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/280x420";
                }}
              />
            </MovieImageContainer>

            {/* Movie Content */}
            <MovieContentBox>
              {/* Title */}
              <MovieTitleText variant="h6">{movie.title}</MovieTitleText>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <MovieMetaBox>
                  {movie.genres.map((genre, index) => (
                    <GenreChip key={index}>{genre}</GenreChip>
                  ))}
                </MovieMetaBox>
              )}

              {/* Description */}
              <MovieDescriptionText variant="body2">
                {movie.description}
              </MovieDescriptionText>

              {/* Movie Info - Duration and Release Date */}
              <MovieInfoBox>
                <MovieInfoItem>
                  <AccessTimeIcon />
                  <span>{formatDuration(movie.duration)}</span>
                </MovieInfoItem>
                <MovieInfoItem>
                  <CalendarTodayIcon />
                  <span>{parseDate(movie.releaseDate).longDateYear}</span>
                </MovieInfoItem>
              </MovieInfoBox>

              {/* Booking Button */}
              <BookingButton
                fullWidth
                variant="contained"
                onClick={() => handleSelectMovie(movie._id)}
              >
                Available Sessions
              </BookingButton>
            </MovieContentBox>
          </MovieCard>
        ))}
      </MoviesGrid>
    </PageContainer>
  );
}
