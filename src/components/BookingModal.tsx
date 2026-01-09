import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { bookSeats } from "../redux/slices/bookingSlice";
import type { AppDispatch } from "../redux/store";

// MUI Components
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/models";

// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventSeatIcon from "@mui/icons-material/EventSeat";

// Styled Components
import {
  BookButton,
  BookingHeading,
  CancelButton,
  DialogActionsBox,
  InfoBox,
  InfoItem,
  LegendBox,
  LegendItem,
  LegendSquare,
  LoadingBox,
  ScreenBox,
  SelectedSeatsChips,
  SelectedSeatsHeader,
  SelectedSeatsHeading,
  SelectedSeatsInfo,
  DataGridContainer,
  StyledDataGrid,
  RowNumber,
  SeatBox,
} from "../styled/components/BookingModal.styled";

// Other
import type { Seat, SessionDetails } from "../types";
import { formatDate } from "../utils/utils";

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
  // Fullscreen dialog for small devices
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; number: number }[]
  >([]);

  const handleSeatClick = useCallback((seat: Seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prevSeats) => {
      const seatIndex = prevSeats.findIndex(
        (s) => s.row === seat.row && s.number === seat.number
      );

      if (seatIndex > -1) {
        // Deselect seat
        return prevSeats.filter((_, i) => i !== seatIndex);
      } else {
        // Select seat
        return [...prevSeats, { row: seat.row, number: seat.number }];
      }
    });
  }, []);

  // Transform seats data for DataGrid
  const rows = useMemo(() => {
    if (!sessionDetails?.seats) return [];

    return sessionDetails.seats.map((row, rowIndex) => {
      const rowData: Record<string, number | Seat> = {
        id: rowIndex + 1,
        row: rowIndex + 1,
      };
      row.forEach((seat) => {
        rowData[`seat_${seat.number}`] = seat;
      });
      return rowData;
    });
  }, [sessionDetails]);

  // Generate columns dynamically based on seat numbers
  const columns: GridColDef[] = useMemo(() => {
    if (!sessionDetails?.seats || sessionDetails.seats.length === 0) return [];

    const firstRow = sessionDetails.seats[0];
    const seatColumns: GridColDef[] = firstRow.map((seat) => ({
      field: `seat_${seat.number}`,
      headerName: `${seat.number}`,
      width: 46,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        const seatData: Seat = params.value;
        if (!seatData) return null;

        const isSelected = selectedSeats.some(
          (s) => s.row === seatData.row && s.number === seatData.number
        );

        return (
          <SeatBox
            onClick={() => !seatData.isBooked && handleSeatClick(seatData)}
            isBooked={seatData.isBooked}
            isSelected={isSelected}
          >
            {seatData.number}
          </SeatBox>
        );
      },
    }));

    return [
      {
        field: "row",
        headerName: "Row",
        width: 36,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => <RowNumber>{params.value}</RowNumber>,
      },
      ...seatColumns,
    ];
  }, [sessionDetails, selectedSeats, handleSeatClick]);

  const handleClose = () => {
    setSelectedSeats([]);
    onClose();
  };

  const handleBook = () => {
    if (selectedSeats.length && sessionDetails) {
      dispatch(bookSeats(selectedSeats));
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
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen}>
      <DialogTitle>
        <BookingHeading>Booking Tickets</BookingHeading>
      </DialogTitle>

      <DialogContent>
        {/* Information about the booking time */}
        <InfoBox>
          <InfoItem>
            <CalendarTodayIcon fontSize="small" color="primary" />
            <Typography variant="body1">
              <strong>Date:</strong> {formatDate(date)}
            </Typography>
          </InfoItem>

          <InfoItem>
            <AccessTimeIcon fontSize="small" color="primary" />
            <Typography variant="body1">
              <strong>Time:</strong> {sessionDetails.time}
            </Typography>
          </InfoItem>
        </InfoBox>

        {/* Screen */}
        <ScreenBox>
          <Typography variant="body2">screen</Typography>
        </ScreenBox>

        {/* Seats using DataGrid */}
        <DataGridContainer>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            rowHeight={46}
            columnHeaderHeight={0}
            autoHeight
          />
        </DataGridContainer>

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
