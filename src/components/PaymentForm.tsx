import { useNavigate } from "react-router";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  resetPaymentState,
  sendBookingData,
  setBookingData,
} from "../redux/cinemaSlice";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styled Components
import {
  FormBox,
  InfoGrid,
  InfoInlineSection,
  SectionHeading,
  SubmitButton,
  SuccessfulBox,
} from "../styled/components/PaymentForm.styled";
import FormTextField from "./common/FormTextField";

// Other
import { paymentValidationSchema } from "../utils/paymentValidationSchema";
import type { PaymentFormData } from "../interfaces/booking.interface";

export default function PaymentForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingSummary, paymentStatus } = useSelector(
    (state: RootState) => state.cinema,
  );
  const user = useSelector((state: RootState) => state.auth.userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentValidationSchema) as Resolver<PaymentFormData>,
    mode: "onBlur",
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  if (!bookingSummary) {
    return null;
  }

  const onSubmit = (data: PaymentFormData) => {
    const finalFullName = user?.fullName ?? data.fullName;
    const finalEmail = user?.email ?? data.email;
    const finalPhone = user?.phone ?? data.phone;

    const bookingData = {
      sessionId: bookingSummary.sessionId,
      movieId: bookingSummary.movieId,
      date: bookingSummary.date,
      time: bookingSummary.time,
      bookedSeats: bookingSummary.bookedSeats,
      pricePerSeat: bookingSummary.pricePerSeat,
      totalPrice: bookingSummary.totalPrice,
      fullName: finalFullName,
      email: finalEmail,
      phone: finalPhone,
    };
    dispatch(setBookingData(bookingData));
    dispatch(sendBookingData(bookingData));
  };

  if (paymentStatus === "successful") {
    return (
      <SuccessfulBox>
        <CheckCircleIcon />
        <SectionHeading variant="h4">Payment Successful!</SectionHeading>
        <SectionHeading variant="body1">
          Your tickets have been confirmed. Check your email for details.
        </SectionHeading>
        <SubmitButton
          type="submit"
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/");
            dispatch(resetPaymentState());
          }}
        >
          Back to Sessions
        </SubmitButton>
      </SuccessfulBox>
    );
  }

  return (
    <FormBox onSubmit={handleSubmit(onSubmit)}>
      {/* Personal Information */}
      <SectionHeading variant="h6">
        <PersonIcon />
        Personal Information
      </SectionHeading>

      <InfoGrid>
        <FormTextField<PaymentFormData>
          fullWidth
          label="Full Name"
          placeholder="John Doe"
          defaultValue={user?.fullName ?? ""}
          name="fullName"
          register={register}
          errors={errors}
          icon={<PersonIcon />}
          inputProps={{ readOnly: !!user }}
        />
        <InfoInlineSection>
          <FormTextField<PaymentFormData>
            fullWidth
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            defaultValue={user?.email ?? ""}
            name="email"
            register={register}
            errors={errors}
            icon={<EmailIcon />}
            inputProps={{ readOnly: !!user }}
          />
          <FormTextField<PaymentFormData>
            fullWidth
            label="Phone Number"
            placeholder="+1 234 567 8901"
            defaultValue={user?.phone ?? ""}
            name="phone"
            register={register}
            errors={errors}
            icon={<PhoneIcon />}
            inputProps={{ readOnly: !!user }}
          />
        </InfoInlineSection>
      </InfoGrid>

      {/* Payment Information */}
      <SectionHeading variant="h6">
        <CreditCardIcon />
        Payment Information
      </SectionHeading>

      <InfoGrid>
        <FormTextField<PaymentFormData>
          fullWidth
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          name="cardNumber"
          register={register}
          errors={errors}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            // Remove all non-numeric characters
            let value = target.value.replace(/[^0-9]/g, "");
            // Limit to 16 digits
            value = value.slice(0, 16);
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
            target.value = value;
          }}
          icon={<CreditCardIcon />}
        />

        <InfoInlineSection>
          <FormTextField<PaymentFormData>
            fullWidth
            label="Expiry Date"
            placeholder="MM/YY"
            name="expiryDate"
            register={register}
            errors={errors}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;

              // Format input as MM/YY
              let value = target.value.replace(/\D/g, "").slice(0, 4);
              if (value.length > 2) {
                value = value.slice(0, 2) + "/" + value.slice(2);
              }
              target.value = value;
            }}
            icon={<CalendarTodayIcon />}
          />
          <FormTextField<PaymentFormData>
            fullWidth
            label="CVV"
            placeholder="123"
            name="cvv"
            register={register}
            errors={errors}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              // Limit to max 4 digits and only numeric
              const value = target.value.replace(/\D/g, "").slice(0, 4);
              target.value = value;
            }}
            icon={<LockIcon />}
          />
        </InfoInlineSection>
      </InfoGrid>

      <SubmitButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={paymentStatus === "processing"}
      >
        {paymentStatus === "processing" ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <>Confirm Payment</>
        )}
      </SubmitButton>
    </FormBox>
  );
}
