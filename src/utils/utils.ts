import type { Session, Seat, DaySchedule } from "../types";

// Generate session times for a day
export const generateSessionsTimes = (): string[] => {
  const times = [];
  const startedTime = 10;
  const endedTime = 20;
  const hourInterval = 2;

  for (let hour = startedTime; hour <= endedTime; hour += hourInterval) {
    times.push(`${hour}:00`);
  }
  return times;
};

// Generate available dates for the next 7 days
export const generateAvailableDates = (): DaySchedule[] => {
  const dates: DaySchedule[] = [];
  const today = new Date();
  const daysToShow = 7;

  for (let i = 0; i < daysToShow; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split("T")[0];

    dates.push({
      date: dateString,
      sessions: generateSessions(dateString),
    });
  }

  return dates;
};

// Initialize seats for a session
export const initializeSeats = (): Seat[][] => {
  const rows = 8;
  const seatsPerRow = 10;
  const seats = [];

  for (let row = 1; row <= rows; row++) {
    const rowSeats: Seat[] = [];
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      rowSeats.push({
        row,
        number: seat,
        isBooked: false,
      });
    }
    seats.push(rowSeats);
  }

  return seats;
};

// Generate sessions for a specific date
export const generateSessions = (date: string): Session[] => {
  const times = generateSessionsTimes();
  return times.map((time) => ({
    id: `${date}-${time}`,
    time,
    seats: initializeSeats(),
  }));
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-EN", options);
};
