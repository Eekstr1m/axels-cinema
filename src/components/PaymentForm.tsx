import { useNavigate } from "react-router";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Custom Hooks
import { usePayment } from "../hooks";

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
import { formatCardNumber, formatCVV, formatExpiryDate } from "../utils/utils";

export default function PaymentForm() {
  const navigate = useNavigate();

  const {
    isProcessing,
    isSuccessful,
    error,
    handleProcessPayment,
    handleResetPayment,
  } = usePayment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentValidationSchema) as Resolver<PaymentFormData>,
    mode: "onBlur",
  });

  const onSubmit = (data: PaymentFormData) => {
    handleProcessPayment(data);
  };

  const renderTextField = (
    name: keyof PaymentFormData,
    label: string,
    options?: {
      type?: string;
      placeholder?: string;
      onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    }
  ) => (
    <StyledTextField
      fullWidth
      label={label}
      type={options?.type}
      placeholder={options?.placeholder}
      {...register(name)}
      onInput={options?.onInput}
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );

  if (error) {
    navigate("/error");
  }

  if (isSuccessful) {
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
            handleResetPayment();
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
        {renderTextField("fullName", "Full Name")}
        <InfoInlineSection>
          {renderTextField("email", "Email", { type: "email" })}
          {renderTextField("phone", "Phone Number")}
        </InfoInlineSection>
      </InfoGrid>

      {/* Payment Information */}
      <SectionHeading variant="h6">
        <EmailIcon />
        Payment Information
      </SectionHeading>

      <InfoGrid>
        {renderTextField("cardNumber", "Card Number", {
          placeholder: "1234 5678 9012 3456",
          onInput: (e) => {
            const target = e.target as HTMLInputElement;
            target.value = formatCardNumber(target.value);
          },
        })}

        <InfoInlineSection>
          {renderTextField("expiryDate", "Expiry Date", {
            placeholder: "MM/YY",
            onInput: (e) => {
              const target = e.target as HTMLInputElement;
              target.value = formatExpiryDate(target.value);
            },
          })}
          {renderTextField("cvv", "CVV", {
            placeholder: "123",
            onInput: (e) => {
              const target = e.target as HTMLInputElement;
              target.value = formatCVV(target.value);
            },
          })}
        </InfoInlineSection>
      </InfoGrid>

      <SubmitButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isProcessing}
      >
        {isProcessing ? (
          <CircularProgress color="inherit" />
        ) : (
          "Confirm Payment"
        )}
      </SubmitButton>
    </FormBox>
  );
}
