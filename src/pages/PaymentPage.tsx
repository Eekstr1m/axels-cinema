// Components
import { PaymentForm } from "../components";

// Styled Components
import { useBooking } from "../hooks";
import {
  PaymentContainer,
  PaymentHeading,
  PaymentPaper,
  SummaryBox,
  SummaryHeading,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
} from "../styled/pages/PaymentPage.styled";

export default function PaymentPage() {
  const { bookedTicket, hasBooking } = useBooking();

  if (!hasBooking || !bookedTicket) {
    return (
      <PaymentContainer>
        <PaymentPaper>
          <PaymentHeading variant="h4">
            No booking found. Please book tickets first.
          </PaymentHeading>
        </PaymentPaper>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <PaymentPaper>
        <PaymentHeading variant="h4">Payment Confirmation</PaymentHeading>

        {/* Booking Summary */}
        <SummaryBox>
          <SummaryHeading variant="h6">Booking Summary</SummaryHeading>

          <SummaryItem>
            <SummaryLabel>Movie: </SummaryLabel>
            <SummaryValue>{bookedTicket.sessionId}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Date: </SummaryLabel>
            <SummaryValue>{bookedTicket.date}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Time: </SummaryLabel>
            <SummaryValue>{bookedTicket.time}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Seats: </SummaryLabel>
            <SummaryValue>
              {bookedTicket.seats
                .map((seat) => `Row ${seat.row} Seat ${seat.number}`)
                .join(", ")}
            </SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Total Price: </SummaryLabel>
            <SummaryValue>$25.00</SummaryValue>
          </SummaryItem>
        </SummaryBox>

        {/* Payment Form */}
        <PaymentForm />
      </PaymentPaper>
    </PaymentContainer>
  );
}
