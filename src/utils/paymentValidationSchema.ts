import * as yup from "yup";
import { expiryDateCheck, LuhnCardCheck } from "./utils";

export const paymentValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full Name can only contain letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\+?[0-9]{7,15}$/, "Invalid Phone Number"),
  cardNumber: yup
    .string()
    .required("Card Number is required")
    .matches(/^[0-9\s]{13,19}$/, "Card Number must be 13 to 19 digits")
    .test("LuhnCardCheck", "Invalid Card Number", LuhnCardCheck),
  expiryDate: yup
    .string()
    .required("Expiry Date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry Date must be in MM/YY format"
    )
    .test("expiryDate", "Card has expired", expiryDateCheck),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
});
