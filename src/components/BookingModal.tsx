import { useState } from "react";
import { formatDate } from "../utils/utils";
// MUI Components
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// Types
import type { Seat, SessionDetails } from "../types";
// Redux
import { useDispatch } from "react-redux";
import { bookSeats } from "../redux/cinemaSlice";
import type { AppDispatch } from "../redux/store";

export default function BookingModal({
  open,
  onClose,
  date,
  sessionDetails,
}: {
  open: boolean;
  onClose: () => void;
  date: string;
  sessionDetails: SessionDetails | null;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; number: number }[]
  >([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    const seatIndex = selectedSeats.findIndex(
      (s) => s.row === seat.row && s.number === seat.number
    );

    if (seatIndex > -1) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((_, i) => i !== seatIndex));
    } else {
      // Select seat
      setSelectedSeats([
        ...selectedSeats,
        { row: seat.row, number: seat.number },
      ]);
    }
  };

  const isSeatSelected = (seat: Seat): boolean => {
    return selectedSeats.some(
      (s) => s.row === seat.row && s.number === seat.number
    );
  };

  const handleClose = () => {
    setSelectedSeats([]);
    onClose();
  };

  const handleBook = () => {
    if (selectedSeats.length && sessionDetails) {
      dispatch(bookSeats(selectedSeats));
      setSelectedSeats([]);
      onClose();
    }
  };

  if (!sessionDetails || !sessionDetails.seats) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography
          variant="h4"
          component="span"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Booking Tickets
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Information about the booking time */}
        <Box sx={{ mb: 3, p: 2, bgcolor: "primary.50", borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon fontSize="small" color="primary" />
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(date)}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeIcon fontSize="small" color="primary" />
                <Typography variant="body1">
                  <strong>Time:</strong> {sessionDetails.time}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EventSeatIcon fontSize="small" color="primary" />
                <Typography variant="body1">
                  <strong>Available:</strong> {sessionDetails.availableSeats} /{" "}
                  {sessionDetails.totalSeats}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Screen */}
        <Box
          sx={{
            mb: 3,
            p: 1,
            bgcolor: "grey.800",
            color: "white",
            textAlign: "center",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Typography variant="body2">SCREEN</Typography>
        </Box>

        {/* Seats */}
        <Box sx={{ mb: 3 }}>
          {sessionDetails.seats.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                {rowIndex + 1}
              </Typography>
              {row.map((seat) => {
                const isSelected = isSeatSelected(seat);

                return (
                  <Box
                    key={`${seat.row}-${seat.number}`}
                    onClick={() => handleSeatClick(seat)}
                    sx={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: 1,
                      borderColor: seat.isBooked
                        ? "error.main"
                        : isSelected
                        ? "success.main"
                        : "grey.400",
                      bgcolor: seat.isBooked
                        ? "error.light"
                        : isSelected
                        ? "success.main"
                        : "background.paper",
                      color: seat.isBooked
                        ? "error.dark"
                        : isSelected
                        ? "white"
                        : "text.primary",
                      cursor: seat.isBooked ? "not-allowed" : "pointer",
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: isSelected ? 600 : 400,
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: seat.isBooked ? "none" : "scale(1.1)",
                        bgcolor: seat.isBooked
                          ? "error.light"
                          : isSelected
                          ? "success.dark"
                          : "action.hover",
                      },
                    }}
                  >
                    {seat.number}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Booking legend */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                border: 1,
                borderColor: "grey.400",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Available</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: "success.main",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Selected</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: "error.light",
                border: 1,
                borderColor: "error.main",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Booked</Typography>
          </Box>
        </Box>

        {/* Selected seats info */}
        {selectedSeats.length > 0 && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "success.50",
              borderRadius: 1,
              border: 1,
              borderColor: "success.main",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <CheckCircleIcon color="success" />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Selected seats: {selectedSeats.length}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              {selectedSeats.map((seat) => (
                <Chip
                  key={`${seat.row}-${seat.number}`}
                  label={`Row ${seat.row}, Seat ${seat.number}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleBook}
          variant="contained"
          disabled={selectedSeats.length === 0}
          startIcon={<EventSeatIcon />}
          sx={{ fontWeight: 600 }}
        >
          Book ({selectedSeats.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
}
