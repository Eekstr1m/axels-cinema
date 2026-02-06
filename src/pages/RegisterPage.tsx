import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { registerUser } from "../redux/authSlice";

// MUI
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

// Components
import {
  FormSubmitButton,
  FormTextField,
  Header,
  CenteredLoading,
} from "../components";

// Styled Components
import {
  CardHeader,
  CardTitle,
  FormStack,
  HomeButton,
  RegisterCard,
  RegisterGrid,
  RegisterPageWrapper,
} from "../styled/pages/RegisterPage.styled";

// Other
import type { RegisterFormData } from "../interfaces/auth.interface";
import { registerValidationSchema } from "../utils/registerValidationSchema";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, authInitialized, errorMessage } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authInitialized && userId) {
      navigate("/profile");
    }
  }, [authInitialized, navigate, userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(
      registerValidationSchema,
    ) as Resolver<RegisterFormData>,
    mode: "onBlur",
  });

  if (!authInitialized) return <CenteredLoading />;

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    dispatch(registerUser(data));
    setIsSubmitting(false);
  };

  return (
    <RegisterPageWrapper>
      <RegisterGrid>
        {/* Header */}
        <Header />

        <RegisterCard elevation={0}>
          <CardHeader>
            <CardTitle variant="h4">Create your account</CardTitle>
            <Typography variant="body2" color="textSecondary">
              Join to manage your bookings or return to{" "}
              <HomeButton to="/">movies page</HomeButton>.
            </Typography>
          </CardHeader>

          <FormStack onSubmit={handleSubmit(onSubmit)}>
            <FormTextField<RegisterFormData>
              label="Full name"
              type="text"
              placeholder="Your name"
              name="fullName"
              register={register}
              errors={errors}
              icon={<PersonIcon fontSize="small" />}
            />

            <FormTextField<RegisterFormData>
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              register={register}
              errors={errors}
              icon={<EmailIcon fontSize="small" />}
            />

            <FormTextField<RegisterFormData>
              label="Phone Number"
              type="tel"
              placeholder="+1 234 567 8901"
              name="phone"
              register={register}
              errors={errors}
              icon={<PhoneIcon fontSize="small" />}
            />

            <FormTextField<RegisterFormData>
              label="Password"
              type="password"
              placeholder="Create a password"
              name="password"
              register={register}
              errors={errors}
              icon={<LockIcon fontSize="small" />}
            />

            <FormTextField<RegisterFormData>
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              name="confirmPassword"
              register={register}
              errors={errors}
              icon={<LockIcon fontSize="small" />}
            />

            {errorMessage && (
              <Typography variant="body2" color="error" align="center">
                {errorMessage}
              </Typography>
            )}

            <FormSubmitButton text="Create Account" disabled={isSubmitting} />

            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <HomeButton to="/login">Sign in</HomeButton>.
            </Typography>
          </FormStack>
        </RegisterCard>
      </RegisterGrid>
    </RegisterPageWrapper>
  );
}
