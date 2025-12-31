import axios, { type AxiosResponse } from "axios";

// Other
import type { SessionDetails, SessionsListResponse, AllPaymentInfo } from "../types";

const API_BASE_URL = "http://demo9181412.mockable.io";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch sessions list
export const fetchSessionsList = async (): Promise<SessionsListResponse> => {
  const response: AxiosResponse<SessionsListResponse> = await instance.get(
    "/sessions-list"
  );
  return response.data;
};

// Fetch session details
export const fetchSessionDetails = async (): Promise<SessionDetails> => {
  const response: AxiosResponse<SessionDetails> = await instance.get(
    "/session/session-2025-12-24-0"
  );
  return response.data;
};

// Post booking request (mock implementation)
export const postPayment = async (
  paymentData: AllPaymentInfo
): Promise<{ success: boolean }> => {
  const response: AxiosResponse<{ success: boolean }> = await instance.post(
    "/process-payment",
    paymentData
  );
  return response.data;
};
