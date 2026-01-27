import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export const PaymentContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 16px",
  backgroundColor: theme.palette.background.default,
}));

export const PaymentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  width: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  textAlign: "center",
  gap: 3,
}));

export const NoBookingIcon = styled(Box)(({ theme }) => ({
  "& svg": {
    fontSize: 120,
    color: alpha(theme.palette.primary.main, 0.3),
  },
}));

export const NoBookingHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}));

export const NoBookingButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.spacing(1),
}));

export const NoBookingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const SummaryContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const PaymentHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),

  "& svg": {
    fontSize: 36,
    color: theme.palette.primary.main,
  },
}));

export const SummaryBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.spacing(2),
  width: "100%",
  background: "white",
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const SummaryHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),

  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  "& svg": {
    color: theme.palette.primary.main,
  },
}));

export const SummaryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}));

export const SummaryLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 400,

  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  "& svg": {
    fontSize: 20,
    color: theme.palette.primary.main,
  },
}));

export const SummaryValue = styled(Typography)({
  fontWeight: 600,
});

export const TotalDivider = styled(Divider)(({ theme }) => ({
  borderColor: alpha(theme.palette.primary.main, 0.2),
}));

export const SeatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const SeatsChip = styled(Chip)(({ theme }) => ({
  background: "transparent",
  border: `1px solid ${theme.palette.primary.main}`,
}));
