// Components
import { PaymentForm } from "../components";

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
} from "../styled/pages/PaymentPage.styled";

export default function PaymentPage() {
  return (
    <PaymentContainer>
      <PaymentPaper>
        <PaymentHeading variant="h4">Payment Confirmation</PaymentHeading>

        {/* Booking Summary */}
        <SummaryBox>
          <SummaryHeading variant="h6">Booking Summary</SummaryHeading>

          <SummaryItem>
            <SummaryLabel>Movie: </SummaryLabel>
            <SummaryValue>Inception</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Date: </SummaryLabel>
            <SummaryValue>2024-07-15</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Time: </SummaryLabel>
            <SummaryValue>19:30</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Seats: </SummaryLabel>
            <SummaryValue>A1, A2</SummaryValue>
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
