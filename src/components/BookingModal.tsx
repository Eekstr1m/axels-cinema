import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Redux
import { useDispatch } from "react-redux";
import { setBookingSummary } from "../redux/cinemaSlice";
import type { AppDispatch } from "../redux/store";

// MUI Components
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

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
  LoadingBox,
  SelectedSeatsHeading,
} from "../styled/components/BookingModal.styled";

// Other
import { parseDate } from "../utils/utils";
import type { DetailedSession } from "../interfaces/sessions.interface";
import type { BookingSeat, Seat } from "../interfaces/seat.interface";

export default function BookingModal({
  open,
  onClose,
  date,
  sessionDetails,
}: {
  open: boolean;
  onClose: () => void;
  date: string;
  sessionDetails: DetailedSession | null;
}) {
  // Fullscreen dialog for small devices
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const [selectedSeats, setSelectedSeats] = useState<BookingSeat[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    const seatIndex = selectedSeats.findIndex(
      (s) => s.row === seat.row && s.number === seat.number,
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

  const isSeatSelected = (seat: Seat): boolean =>
    selectedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  const handleClose = () => {
    setSelectedSeats([]);
    onClose();
  };

  const handleBook = () => {
    if (selectedSeats.length && sessionDetails) {
      dispatch(
        setBookingSummary({
          sessionId: sessionDetails._id,
          movieId: sessionDetails.movieId._id,
          movieTitle: sessionDetails.movieId.title,
          date: sessionDetails.date,
          bookedSeats: selectedSeats,
          time: sessionDetails.startTime,
          pricePerSeat: sessionDetails.price,
          totalPrice: selectedSeats.length * sessionDetails.price,
        }),
      );
      setSelectedSeats([]);
      onClose();
      navigate("/payment");
    }
  };

  if (!sessionDetails || !sessionDetails.seats) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <LoadingBox>
            <CircularProgress />
          </LoadingBox>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      scroll="body"
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle>
        <BookingHeading>Booking Tickets</BookingHeading>
      </DialogTitle>

      <DialogContent>
        {/* Information about the booking time */}
        <InfoBox>
          <InfoItem>
            <CalendarTodayIcon />
            <Typography variant="body1">
              <strong>Date:</strong> {parseDate(date).shortDate}
            </Typography>
          </InfoItem>

          <InfoItem>
            <AccessTimeIcon />
            <Typography variant="body1">
              <strong>Time:</strong> {sessionDetails.startTime}
            </Typography>
          </InfoItem>
        </InfoBox>

        {/* Screen */}
        <ScreenBox>
          <Typography variant="body2">screen</Typography>
        </ScreenBox>

        {/* Seats */}
        <SeatsContainer>
          {sessionDetails.seats.map((row, rowIndex) => (
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
              <SelectedSeatsHeading variant="body1">
                Selected seats: {selectedSeats.length}
              </SelectedSeatsHeading>
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
