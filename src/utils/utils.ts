import axios from "axios";

// Parse date into components
export const parseDate = (
  dateString: Date | string,
): {
  shortDate: string;
  longDateYear: string;
  day: number;
  weekday: string;
  month: string;
} => {
  const date = new Date(dateString);
  const shortDateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  const longDateYearOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const shortDate = date.toLocaleDateString("en-EN", shortDateOptions);
  const longDateYear = date.toLocaleDateString("en-EN", longDateYearOptions);
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-EN", { weekday: "short" });
  const month = date.toLocaleDateString("en-EN", { month: "short" });

  return { shortDate, longDateYear, day, weekday, month };
};

// Format movie duration
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

type ApiErrorResponse = {
  message?: string;
};

// Validate Axios error response
export const getErrorMessage = (error: unknown): string => {
  const defaultMessage = "An unexpected error occurred. Please try again.";

  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message =
      error.response?.data?.message ?? error.message ?? defaultMessage;

    return message;
  }

  return defaultMessage;
};
