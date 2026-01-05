import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export const LoadingBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  height: "50vh",
  alignItems: "center",
});

export const BookingHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  fontSize: "2rem",
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  display: "flex",
  justifyContent: "space-evenly",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const ScreenBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[800],
  color: "white",
  textAlign: "center",
  borderRadius: "20px 20px 0 0",
  userSelect: "none",
  textTransform: "uppercase",
}));

export const SeatsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const SeatRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

export const RowNumber = styled(Box)(({ theme }) => ({
  width: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

export const SeatBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isBooked" && prop !== "isSelected",
})<{ isBooked?: boolean; isSelected?: boolean }>(
  ({ theme, isBooked, isSelected }) => ({
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${
      isBooked
        ? theme.palette.error.main
        : isSelected
        ? theme.palette.success.main
        : theme.palette.grey[400]
    }`,
    backgroundColor: isBooked
      ? theme.palette.error.light
      : isSelected
      ? theme.palette.success.main
      : theme.palette.background.paper,
    color: isBooked
      ? theme.palette.error.dark
      : isSelected
      ? "white"
      : theme.palette.text.primary,
    cursor: isBooked ? "not-allowed" : "pointer",
    borderRadius: theme.spacing(1),
    fontSize: "0.75rem",
    fontWeight: isSelected ? 600 : 400,
    transition: "all 0.2s",
    "&:hover": {
      transform: isBooked ? "none" : "scale(1.1)",
      backgroundColor: isBooked
        ? theme.palette.error.light
        : isSelected
        ? theme.palette.success.dark
        : theme.palette.action.hover,
    },
  })
);

export const LegendBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  justifyContent: "center",
  flexWrap: "wrap",
}));

export const LegendItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const LegendSquare = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "available" | "selected" | "booked" }>(({ theme, variant }) => {
  const baseStyles = {
    width: 24,
    height: 24,
    borderRadius: theme.spacing(0.5),
  };

  const variantStyles = {
    available: {
      border: `1px solid ${theme.palette.grey[400]}`,
    },
    selected: {
      backgroundColor: theme.palette.success.main,
    },
    booked: {
      backgroundColor: theme.palette.error.light,
    },
  };

  return { ...baseStyles, ...variantStyles[variant] };
});

export const SelectedSeatsInfo = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.success.main}`,
}));

export const SelectedSeatsHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const SelectedSeatsHeading = styled(Typography)({
  fontWeight: 600,
});

export const SelectedSeatsChips = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.5),
  flexWrap: "wrap",
}));

export const DialogActionsBox = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const CancelButton = styled(Button)({
  fontWeight: 400,
});

export const BookButton = styled(Button)({
  fontWeight: 600,
});
