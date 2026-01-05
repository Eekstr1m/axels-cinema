import * as yup from "yup";

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
    .test("LuhnCheck", "Invalid Card Number", function (value) {
      if (!value) return false;
      // Luhn Algorithm to validate card number
      const digits = value.replace(/\s/g, "").split("").reverse().map(Number);
      const checksum = digits.reduce((sum, digit, idx) => {
        if (idx % 2 === 1) {
          let doubled = digit * 2;
          if (doubled > 9) doubled -= 9;
          return sum + doubled;
        }
        return sum + digit;
      }, 0);

      return checksum % 10 === 0;
    }),
  expiryDate: yup
    .string()
    .required("Expiry Date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry Date must be in MM/YY format"
    )
    .test("expiryDate", "Card has expired", function (value) {
      // Test that expiry date is in the future
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      const expDate = new Date(2000 + year, month - 1, 1);
      const today = new Date();
      return expDate >= today;
    }),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
});