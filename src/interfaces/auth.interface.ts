import type { InferType } from "yup";
import type { loginValidationSchema } from "../utils/loginValidationSchema";

export interface AuthPayload {
  accessToken: string;
  userId?: string;
  role?: string;
}

export interface RefreshTokenResponse {
  id: string;
  accessToken: string;
}

export type LoginFormData = InferType<typeof loginValidationSchema>;
