import type { InferType } from "yup";
import type { loginValidationSchema } from "../utils/loginValidationSchema";
import type { registerValidationSchema } from "../utils/registerValidationSchema";

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
export type RegisterFormData = InferType<typeof registerValidationSchema>;
