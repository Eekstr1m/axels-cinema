import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type Resolver } from "react-hook-form";

// MUI
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

// Components
import { FormSubmitButton, FormTextField, Header } from "../components";

// Styled Components
import {
  CardHeader,
  CardTitle,
  FormStack,
  LoginCard,
  LoginGrid,
  LoginPageWrapper,
} from "../styled/pages/LoginPage.styled";

// Other
import type { LoginFormData } from "../interfaces/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../utils/loginValidationSchema";
import { login } from "../api/cinemaApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema) as Resolver<LoginFormData>,
    mode: "onBlur",
  });

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (isDisabled) return;

  //   setIsSubmitting(true);
  //   setErrorMessage("");

  //   try {
  //     await login(email.trim(), password);
  //     navigate("/profile");
  //   } catch (_error) {
  //     setErrorMessage("Login failed. Please check your credentials.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const response = await login(data.email, data.password);
    console.log("Response:", response);
    setIsSubmitting(false);
    navigate("/profile");
  };

  return (
    <LoginPageWrapper>
      <LoginGrid>
        {/* Header */}
        <Header />

        <LoginCard elevation={0}>
          <CardHeader>
            <CardTitle variant="h4">Welcome back</CardTitle>
          </CardHeader>

          <FormStack onSubmit={handleSubmit(onSubmit)}>
            <FormTextField<LoginFormData>
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              register={register}
              errors={errors}
              icon={<EmailIcon fontSize="small" />}
            />

            <FormTextField<LoginFormData>
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              register={register}
              errors={errors}
              icon={<LockIcon fontSize="small" />}
            />

            <FormSubmitButton text="Sign In" disabled={isSubmitting} />

            <Typography
              variant="body2"
              color="textSecondary"
              onClick={() => navigate("/profile")}
            >
              New here? Your account is created after the first booking.
            </Typography>
          </FormStack>
        </LoginCard>
      </LoginGrid>
    </LoginPageWrapper>
  );
}
