// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-EN", options);
};

// Format card number
export const formatCardNumber = (value: string): string => {
  // Remove all non-numeric characters
  let formatted = value.replace(/[^0-9]/g, "");
  // Limit to 16 digits
  formatted = formatted.slice(0, 16);
  // Add space after every 4 digits
  formatted = formatted.replace(/(\d{4})(?=\d)/g, "$1 ");
  return formatted;
};

// Format expiry date as "MM/YY"
export const formatExpiryDate = (value: string): string => {
  let formatted = value.replace(/\D/g, "").slice(0, 4);
  if (formatted.length > 2) {
    formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
  }
  return formatted;
};

// Format CVV
export const formatCVV = (value: string): string => {
  // Limit to max 4 digits and only numeric
  return value.replace(/\D/g, "").slice(0, 4);
};

// Luhn Algorithm to validate card number
export const LuhnCardCheck = (value: string): boolean => {
  if (!value) return false;
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
};

// Check that expiry date is in the future
export const expiryDateCheck = (value: string): boolean => {
  if (!value) return false;
  const [month, year] = value.split("/").map(Number);
  const expDate = new Date(2000 + year, month - 1, 1);
  const today = new Date();
  return expDate >= today;
};
