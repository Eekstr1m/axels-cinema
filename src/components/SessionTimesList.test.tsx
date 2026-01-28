import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SessionTimesList from "./SessionTimesList";
import type { Session } from "../interfaces/sessions.interface";

const mockSessions: Session[] = [
  {
    _id: "session-2025-12-25-0",
    movieId: "movie-1",
    date: "2025-12-25",
    startTime: "10:00",
  },
  {
    _id: "session-2025-12-25-1",
    movieId: "movie-1",
    date: "2025-12-25",
    startTime: "12:00",
  },
  {
    _id: "session-2025-12-25-2",
    movieId: "movie-1",
    date: "2025-12-25",
    startTime: "14:00",
  },
];

describe(SessionTimesList, () => {
  const onSessionSelect = jest.fn();

  beforeEach(() => {
    onSessionSelect.mockClear();
  });

  test("SessionTimesList renders", () => {
    render(
      <SessionTimesList
        sessions={mockSessions}
        onSessionSelect={onSessionSelect}
      />,
    );

    expect(screen.getByText("Select a session time")).toBeInTheDocument();
  });

  test("SessionTimesList not renders with empty sessions", () => {
    render(
      <SessionTimesList sessions={[]} onSessionSelect={onSessionSelect} />,
    );
    expect(screen.queryByText("Select a session time")).not.toBeInTheDocument();
  });

  test("SessionTimesList renders no session times when sessions is empty", () => {
    render(
      <SessionTimesList sessions={[]} onSessionSelect={onSessionSelect} />,
    );
    expect(screen.queryByText(/^\d{2}:\d{2}$/)).not.toBeInTheDocument();
  });

  test("SessionTimesList renders all session times", () => {
    render(
      <SessionTimesList
        sessions={mockSessions}
        onSessionSelect={onSessionSelect}
      />,
    );

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
  });

  test("Render correct number of session cards", () => {
    render(
      <SessionTimesList
        sessions={mockSessions}
        onSessionSelect={onSessionSelect}
      />,
    );

    expect(screen.getAllByText(/^\d{2}:\d{2}$/)).toHaveLength(
      mockSessions.length,
    );
  });

  test("Clicking on a session time calls onSessionSelect with correct id", async () => {
    render(
      <SessionTimesList
        sessions={mockSessions}
        onSessionSelect={onSessionSelect}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("12:00"));
    expect(onSessionSelect).toHaveBeenCalledWith("session-2025-12-25-1");
    expect(onSessionSelect).toHaveBeenCalledTimes(1);
  });

  test("Clicking on multiple session times calls onSessionSelect correct number of times", async () => {
    render(
      <SessionTimesList
        sessions={mockSessions}
        onSessionSelect={onSessionSelect}
      />,
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("10:00"));
    await user.click(screen.getByText("14:00"));
    expect(onSessionSelect).toHaveBeenCalledWith("session-2025-12-25-0");
    expect(onSessionSelect).toHaveBeenCalledWith("session-2025-12-25-2");
    expect(onSessionSelect).toHaveBeenCalledTimes(2);
  });

  test("SessionTimesList matches snapshot", () => {
    const { asFragment } = render(
      <SessionTimesList
        sessions={mockSessions}
        onSessionSelect={onSessionSelect}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
