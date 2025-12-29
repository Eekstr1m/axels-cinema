import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

export const SessionListContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SessionsHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export const SessionCard = styled(Card)({
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
  },
});

export const TimeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const SessionTimeText = styled(Typography)({
  fontWeight: 600,
});

export const SeatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const SeatsAvailabilityText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const SeatsAvailabilityChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
