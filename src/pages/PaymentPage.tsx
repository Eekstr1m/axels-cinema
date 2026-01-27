import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Components
import { PaymentForm } from "../components";

// MUI Icons
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import MovieIcon from "@mui/icons-material/Movie";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";

// Styled Components
import {
  PaymentContainer,
  PaymentPaper,
  PaymentHeading,
  SummaryBox,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  SummaryHeading,
  TotalDivider,
  NoBookingIcon,
  NoBookingHeading,
  NoBookingText,
  NoBookingButton,
  SummaryContent,
  SeatsChip,
  SeatsBox,
} from "../styled/pages/PaymentPage.styled";

import type { RootState } from "../redux/store";

export default function PaymentPage() {
  const { bookingSummary } = useSelector((state: RootState) => state.cinema);
  const navigate = useNavigate();

  if (!bookingSummary || Object.keys(bookingSummary).length === 0) {
    return (
      <PaymentContainer>
        <PaymentPaper>
          <NoBookingIcon>
            <ConfirmationNumberOutlinedIcon />
          </NoBookingIcon>
          <NoBookingHeading variant="h3">No Tickets Selected</NoBookingHeading>
          <NoBookingText variant="h6">
            You haven't selected any tickets yet. Browse our available sessions
            and book your seats to continue.
          </NoBookingText>
          <NoBookingButton
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
          >
            Browse Sessions
          </NoBookingButton>
        </PaymentPaper>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <PaymentPaper>
        <PaymentHeading variant="h4">
          <ReceiptIcon />
          Payment Confirmation
        </PaymentHeading>

        {/* Booking Summary */}
        <SummaryBox>
          <SummaryHeading variant="h6">
            <ConfirmationNumberOutlinedIcon />
            Booking Summary
          </SummaryHeading>

          <SummaryContent>
            <SummaryItem>
              <SummaryLabel>
                <MovieIcon />
                Movie:
              </SummaryLabel>
              <SummaryValue>{bookingSummary.movieTitle}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>
                <CalendarTodayIcon />
                Date:
              </SummaryLabel>
              <SummaryValue>{bookingSummary.date}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>
                <AccessTimeIcon />
                Time:
              </SummaryLabel>
              <SummaryValue>{bookingSummary.time}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>
                <EventSeatIcon />
                Seats:
              </SummaryLabel>
              <SeatsBox>
                {bookingSummary.bookedSeats.map((seat) => (
                  <SeatsChip
                    label={`Row ${seat.row}, Seat ${seat.number}`}
                    key={`${seat.row}-${seat.number}`}
                  />
                ))}
              </SeatsBox>
            </SummaryItem>

            <TotalDivider />

            <SummaryItem>
              <SummaryLabel>
                <AttachMoneyIcon />
                Total Price:
              </SummaryLabel>
              <SummaryValue>
                ${bookingSummary.totalPrice.toFixed(2)}
              </SummaryValue>
            </SummaryItem>
          </SummaryContent>
        </SummaryBox>

        {/* Payment Form */}
        <PaymentForm />
      </PaymentPaper>
    </PaymentContainer>
  );
}
