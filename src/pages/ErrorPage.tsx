import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ErrorPage() {
  const scheduleError = useSelector((state: RootState) => state.schedule.error);
  const bookingError = useSelector((state: RootState) => state.booking.error);
  const paymentError = useSelector((state: RootState) => state.payment.error);

  // Collect all errors
  const errors = [
    scheduleError && { source: "Schedule", message: scheduleError },
    bookingError && { source: "Booking", message: bookingError },
    paymentError && { source: "Payment", message: paymentError },
  ].filter((error): error is { source: string; message: string } =>
    Boolean(error)
  );

  const hasErrors = errors.length > 0;

  return (
    <Box>
      {hasErrors ? (
        <Stack spacing={2}>
          <Typography variant="h4" color="error" align="center">
            Error{errors.length > 1 ? "s" : ""} Occurred
          </Typography>
          {errors.map((error, index) => (
            <Alert key={index} severity="error">
              <Typography variant="subtitle1" fontWeight="bold">
                {error.source}:
              </Typography>
              <Typography variant="body1">{error.message}</Typography>
            </Alert>
          ))}
        </Stack>
      ) : (
        <Typography variant="h4" color="error" align="center">
          An unexpected error occurred. Please try again later.
        </Typography>
      )}
    </Box>
  );
}
