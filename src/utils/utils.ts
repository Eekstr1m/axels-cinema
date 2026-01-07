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
export const formatCardNumber = (e: React.FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  // Remove all non-numeric characters
  let value = target.value.replace(/[^0-9]/g, "");
  // Limit to 16 digits
  value = value.slice(0, 16);
  // Add space after every 4 digits
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  target.value = value;
};

// Format expiry date as "MM/YY"
export const formatExpiryDate = (e: React.FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;

  let value = target.value.replace(/\D/g, "").slice(0, 4);
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }
  target.value = value;
};

// Format CVV
export const formatCVV = (e: React.FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  // Limit to max 4 digits and only numeric
  const value = target.value.replace(/\D/g, "").slice(0, 4);
  target.value = value;
};
