import { useForm } from "react-hook-form";

// MUI Components
import Grid from "@mui/material/Grid";

// Styled Components
import {
  FormBox,
  SectionHeading,
  StyledTextField,
  SubmitButton,
} from "../styled/components/PaymentForm.styled";

// Other
interface PaymentFormData {
  fullName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>();

  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment data:", data);
  };

  return (
    <FormBox onSubmit={handleSubmit(onSubmit)}>
      {/* Personal Information */}
      <SectionHeading variant="h6">
        {/* <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} /> */}
        Personal Information
      </SectionHeading>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <StyledTextField
            fullWidth
            label="Full Name"
            {...register("fullName")}
            error={!!errors.fullName}
            // helperText={errors.fullName?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            // helperText={errors.email?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledTextField
            fullWidth
            label="Phone Number"
            {...register("phone")}
            error={!!errors.phone}
            // helperText={errors.phone?.message}
          />
        </Grid>
      </Grid>

      {/* Payment Information */}
      <SectionHeading variant="h6">
        {/* <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} /> */}
        Payment Information
      </SectionHeading>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <StyledTextField
            fullWidth
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber")}
            error={!!errors.cardNumber}
            // helperText={errors.cardNumber?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledTextField
            fullWidth
            label="Expiry Date"
            placeholder="MM/YY"
            {...register("expiryDate")}
            error={!!errors.expiryDate}
            // helperText={errors.expiryDate?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledTextField
            fullWidth
            label="CVV"
            placeholder="123"
            type="password"
            {...register("cvv")}
            error={!!errors.cvv}
            // helperText={errors.cvv?.message}
          />
        </Grid>
      </Grid>

      <SubmitButton type="submit" variant="contained" size="large" fullWidth>
        Confirm Payment
      </SubmitButton>
    </FormBox>
  );
}
