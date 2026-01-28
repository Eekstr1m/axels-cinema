import { configureStore } from "@reduxjs/toolkit";
import type { Movie } from "../interfaces/movies.interface";
import cinemaReducer from "../redux/cinemaSlice";
import MoviesPage from "./MoviesPage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const mockMovies: Movie[] = [
  {
    _id: "movie-1",
    title: "Test Movie 1",
    description: "This is a test movie description for the first movie.",
    posterUrl: "https://example.com/poster1.jpg",
    duration: 120,
    genres: ["Action", "Adventure"],
    releaseDate: new Date("2025-12-25"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "movie-2",
    title: "Test Movie 2",
    description: "This is a test movie description for the second movie",
    posterUrl: "https://example.com/poster2.jpg",
    duration: 95,
    genres: ["Comedy", "Drama"],
    releaseDate: new Date("2026-01-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const emptyStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

const moviesStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
  preloadedState: {
    cinema: {
      movies: mockMovies,
      sessionsDates: [],
      selectedDate: "",
      selectedSessions: null,
      selectedSessionTime: null,
      bookingSummary: null,
      bookingData: null,
      paymentStatus: "idle" as const,
      errorMessage: null,
    },
  },
});

describe(MoviesPage, () => {
  test("MoviesPage renders empty state when no movies", () => {
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("No movies found")).toBeInTheDocument();
    expect(screen.getByText("Please try again later")).toBeInTheDocument();
  });

  test("MoviesPage renders header with title", () => {
    render(
      <Provider store={moviesStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Axels Cinema")).toBeInTheDocument();
  });

  test("MoviesPage renders all movies", () => {
    render(
      <Provider store={moviesStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  test("MoviesPage renders movie details correctly", () => {
    render(
      <Provider store={moviesStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText(/This is a test movie description for the first movie/),
    ).toBeInTheDocument();

    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    expect(screen.getByText("2h 0m")).toBeInTheDocument();
    expect(screen.getByText("1h 35m")).toBeInTheDocument();

    expect(screen.getByText("December 25, 2025")).toBeInTheDocument();
    expect(screen.getByText("January 15, 2026")).toBeInTheDocument();
  });

  test("MoviesPage renders booking buttons for each movie", () => {
    render(
      <Provider store={moviesStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    const buttons = screen.getAllByRole("button", {
      name: /Available Sessions/i,
    });
    expect(buttons).toHaveLength(2);
  });

  test("MoviesPage navigates to sessions page when booking button is clicked", async () => {
    render(
      <Provider store={moviesStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    const buttons = screen.getAllByRole("button", {
      name: /Available Sessions/i,
    });

    await user.click(buttons[0]);

    expect(window.location.pathname).toBe("/sessions/movie-1");
  });

  test("MoviesPage matches snapshot with movies", () => {
    const { asFragment } = render(
      <Provider store={moviesStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("MoviesPage matches snapshot when no movies", () => {
    const { asFragment } = render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <MoviesPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
