import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import {
  MovieHeroBanner,
  MovieHeroContent,
  MovieHeroInfo,
  MovieHeroTitle,
  MovieHeroMetaRow,
  MovieHeroMetaItem,
  MovieHeroGenres,
  MovieHeroGenreChip,
  MovieHeroDescription,
} from "../styled/components/MovieBanner.styled";

import type { Movie } from "../interfaces/movies.interface";
import { formatDuration } from "../utils/utils";

export default function MovieBanner({ movie }: { movie: Movie }) {
  return (
    <MovieHeroBanner posterUrl={movie.posterUrl}>
      <MovieHeroContent>
        <MovieHeroInfo>
          <MovieHeroTitle variant="h4">{movie.title}</MovieHeroTitle>

          <MovieHeroMetaRow>
            <MovieHeroMetaItem>
              <AccessTimeIcon />
              {formatDuration(movie.duration)}
            </MovieHeroMetaItem>
            <MovieHeroMetaItem>
              <CalendarTodayIcon />
              {new Date(movie.releaseDate).getFullYear()}
            </MovieHeroMetaItem>
          </MovieHeroMetaRow>

          <MovieHeroGenres>
            {movie.genres.map((genre) => (
              <MovieHeroGenreChip key={genre}>{genre}</MovieHeroGenreChip>
            ))}
          </MovieHeroGenres>

          <MovieHeroDescription>{movie.description}</MovieHeroDescription>
        </MovieHeroInfo>
      </MovieHeroContent>
    </MovieHeroBanner>
  );
}
