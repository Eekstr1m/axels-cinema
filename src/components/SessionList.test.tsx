import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SessionList from "./SessionList";
import type { SessionListItem } from "../types";

const mockSessions: SessionListItem[] = [
  {
    id: "session-2025-12-25-0",
    time: "10:00",
  },
  {
    id: "session-2025-12-25-1",
    time: "12:00",
  },
  {
    id: "session-2025-12-25-2",
    time: "14:00",
  },
];

describe(SessionList, () => {
  const onSessionSelect = jest.fn();

  beforeEach(() => {
    onSessionSelect.mockClear();
  });

  test("SessionList renders", () => {
    render(
      <SessionList sessions={mockSessions} onSessionSelect={onSessionSelect} />
    );

    expect(screen.getByText("Select a session time")).toBeInTheDocument();
  });

  test("SessionList renders with empty sessions", () => {
    render(<SessionList sessions={[]} onSessionSelect={onSessionSelect} />);
    expect(screen.getByText("Select a session time")).toBeInTheDocument();
  });

  test("SessionList renders no session times when sessions is empty", () => {
    render(<SessionList sessions={[]} onSessionSelect={onSessionSelect} />);
    expect(screen.queryByText(/^\d{2}:\d{2}$/)).not.toBeInTheDocument();
  });

  test("SessionList renders all session times", () => {
    render(
      <SessionList sessions={mockSessions} onSessionSelect={onSessionSelect} />
    );

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
  });

  test("Render correct number of session cards", () => {
    render(
      <SessionList sessions={mockSessions} onSessionSelect={onSessionSelect} />
    );

    expect(screen.getAllByText(/^\d{2}:\d{2}$/)).toHaveLength(
      mockSessions.length
    );
  });

  test("Clicking on a session time calls onSessionSelect with correct id", async () => {
    render(
      <SessionList sessions={mockSessions} onSessionSelect={onSessionSelect} />
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("12:00"));
    expect(onSessionSelect).toHaveBeenCalledWith("session-2025-12-25-1");
    expect(onSessionSelect).toHaveBeenCalledTimes(1);
  });

  test("Clicking on multiple session times calls onSessionSelect correct number of times", async () => {
    render(
      <SessionList sessions={mockSessions} onSessionSelect={onSessionSelect} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("10:00"));
    await user.click(screen.getByText("14:00"));
    expect(onSessionSelect).toHaveBeenCalledWith("session-2025-12-25-0");
    expect(onSessionSelect).toHaveBeenCalledWith("session-2025-12-25-2");
    expect(onSessionSelect).toHaveBeenCalledTimes(2);
  });

  test("SessionList matches snapshot", () => {
    const { asFragment } = render(
      <SessionList sessions={mockSessions} onSessionSelect={onSessionSelect} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
