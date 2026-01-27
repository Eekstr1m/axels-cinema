// Format date for display
export const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-EN", options);
};

// Parse date into components
export const parseDate = (
  dateString: Date | string,
): { formattedDate: string; day: number; weekday: string; month: string } => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  const formattedDate = date.toLocaleDateString("en-EN", options);
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-EN", { weekday: "short" });
  const month = date.toLocaleDateString("en-EN", { month: "short" });

  return { formattedDate, day, weekday, month };
};

// Format release date for display
export const formatReleaseDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format movie duration
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}г ${mins}м`;
};
