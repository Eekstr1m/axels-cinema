import type { InferType } from "yup";
import type { BookingSeat } from "./seat.interface";
import type { paymentValidationSchema } from "../utils/paymentValidationSchema";

export interface BookingSummary {
  sessionId: string;
  movieId: string;
  movieTitle: string;
  date: string;
  bookedSeats: BookingSeat[];
  time: string;
  pricePerSeat: number;
  totalPrice: number;
}

export interface BookingData extends Omit<BookingSummary, "movieTitle"> {
  fullName: string;
  email: string;
  phone: string;
}

export interface SavedBookingData extends BookingData {
  _id: string;
  updatedAt: string;
  createdAt: string;
}

export type PaymentStatus = "idle" | "processing" | "successful" | "failed";

export type PaymentFormData = InferType<typeof paymentValidationSchema>;
