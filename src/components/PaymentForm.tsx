import { useNavigate } from "react-router";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { processPayment, resetPaymentState } from "../redux/cinemaSlice";
import type { RootState } from "../redux/store";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

// Styled Components
import {
  FormBox,
  InfoGrid,
  InfoInlineSection,
  SectionHeading,
  StyledTextField,
  SubmitButton,
  SuccessfulBox,
} from "../styled/components/PaymentForm.styled";

// Other
import type { PaymentFormData } from "../types";
import { paymentValidationSchema } from "../utils/paymentValidationSchema";

export default function PaymentForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isProcessingPayment, isError, isPaymentSuccessful } = useSelector(
    (state: RootState) => state.cinema
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentValidationSchema) as Resolver<PaymentFormData>,
    mode: "onBlur",
  });

  const onSubmit = (data: PaymentFormData) => {
    dispatch(processPayment(data));
  };

  if (isError) {
    navigate("/error");
  }

  if (isPaymentSuccessful) {
    return (
      <SuccessfulBox>
        <SectionHeading
          variant="h5"
          align="center"
          color="primary"
          textAlign={"center"}
        >
          Payment Successful!
        </SectionHeading>
        <SubmitButton
          type="submit"
          variant="contained"
          size="small"
          onClick={() => {
            navigate("/");
            dispatch(resetPaymentState());
          }}
        >
          Back to main page
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
        <StyledTextField
          fullWidth
          label="Full Name"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
        <InfoInlineSection>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            fullWidth
            label="Phone Number"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </InfoInlineSection>
      </InfoGrid>

      {/* Payment Information */}
      <SectionHeading variant="h6">
        <EmailIcon />
        Payment Information
      </SectionHeading>

      <InfoGrid>
        <StyledTextField
          fullWidth
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          {...register("cardNumber")}
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
          error={!!errors.cardNumber}
          helperText={errors.cardNumber?.message}
        />

        <InfoInlineSection>
          <StyledTextField
            fullWidth
            label="Expiry Date"
            placeholder="MM/YY"
            {...register("expiryDate")}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;

              // Format input as MM/YY
              let value = target.value.replace(/\D/g, "").slice(0, 4);
              if (value.length > 2) {
                value = value.slice(0, 2) + "/" + value.slice(2);
              }
              target.value = value;
            }}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate?.message}
          />
          <StyledTextField
            fullWidth
            label="CVV"
            placeholder="123"
            {...register("cvv")}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              // Limit to max 4 digits and only numeric
              const value = target.value.replace(/\D/g, "").slice(0, 4);
              target.value = value;
            }}
            error={!!errors.cvv}
            helperText={errors.cvv?.message}
          />
        </InfoInlineSection>
      </InfoGrid>

      <SubmitButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isProcessingPayment}
      >
        {isProcessingPayment ? (
          <CircularProgress color="inherit" aria-label="Processing payment" />
        ) : (
          "Confirm Payment"
        )}
      </SubmitButton>
    </FormBox>
  );
}
