import { useState } from "react";

// MUI Components
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// MUI Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styled Components
import {
  BookingHeading,
  DialogActionsBox,
  InfoBox,
  InfoItem,
  LegendBox,
  LegendItem,
  LegendSquare,
  RowNumber,
  ScreenBox,
  SeatBox,
  SeatRow,
  SeatsContainer,
  SelectedSeatsChips,
  SelectedSeatsHeader,
  SelectedSeatsInfo,
  CancelButton,
  BookButton,
} from "../styled/BookingModal.styled";

// Other
import { formatDate } from "../utils/utils";
import type { Seat, Session } from "../types";

export default function BookingModal({
  open,
  onClose,
  date,
  session,
  onBook,
}: {
  open: boolean;
  onClose: () => void;
  date: string;
  session: Session | null;
  onBook: (seats: { row: number; number: number }[]) => void;
}) {
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
    if (selectedSeats.length > 0) {
      console.log("selectedSeats", selectedSeats);
      onBook(selectedSeats);
      setSelectedSeats([]);
      onClose();
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <BookingHeading>Booking Tickets</BookingHeading>
      </DialogTitle>

      <DialogContent>
        {/* Information about the booking time */}
        <InfoBox>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoItem>
                <CalendarTodayIcon fontSize="small" color="primary" />
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(date)}
                </Typography>
              </InfoItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoItem>
                <AccessTimeIcon fontSize="small" color="primary" />
                <Typography variant="body1">
                  <strong>Time:</strong> {session?.time}
                </Typography>
              </InfoItem>
            </Grid>
          </Grid>
        </InfoBox>

        {/* Screen */}
        <ScreenBox>
          <Typography variant="body2">SCREEN</Typography>
        </ScreenBox>

        {/* Seats */}
        <SeatsContainer>
          {session.seats.map((row, rowIndex) => (
            <SeatRow key={rowIndex}>
              <RowNumber>{rowIndex + 1}</RowNumber>
              {row.map((seat) => {
                const isSelected = isSeatSelected(seat);

                return (
                  <SeatBox
                    key={`${seat.row}-${seat.number}`}
                    onClick={() => handleSeatClick(seat)}
                    isBooked={seat.isBooked}
                    isSelected={isSelected}
                  >
                    {seat.number}
                  </SeatBox>
                );
              })}
            </SeatRow>
          ))}
        </SeatsContainer>

        {/* Booking legend */}
        <LegendBox>
          <LegendItem>
            <LegendSquare variant="available" />
            <Typography variant="body2">Available</Typography>
          </LegendItem>
          <LegendItem>
            <LegendSquare variant="selected" />
            <Typography variant="body2">Selected</Typography>
          </LegendItem>
          <LegendItem>
            <LegendSquare variant="booked" />
            <Typography variant="body2">Booked</Typography>
          </LegendItem>
        </LegendBox>

        {/* Selected seats info */}
        {selectedSeats.length > 0 && (
          <SelectedSeatsInfo>
            <SelectedSeatsHeader>
              <CheckCircleIcon color="success" />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Selected seats: {selectedSeats.length}
              </Typography>
            </SelectedSeatsHeader>
            <SelectedSeatsChips>
              {selectedSeats.map((seat) => (
                <Chip
                  key={`${seat.row}-${seat.number}`}
                  label={`Row ${seat.row}, Seat ${seat.number}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              ))}
            </SelectedSeatsChips>
          </SelectedSeatsInfo>
        )}
      </DialogContent>

      <DialogActionsBox>
        <CancelButton onClick={handleClose} color="inherit">
          Cancel
        </CancelButton>
        <BookButton
          onClick={handleBook}
          variant="contained"
          disabled={selectedSeats.length === 0}
          startIcon={<EventSeatIcon />}
        >
          Book ({selectedSeats.length})
        </BookButton>
      </DialogActionsBox>
    </Dialog>
  );
}
