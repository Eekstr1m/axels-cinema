import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export const SessionListContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SessionsHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  letterSpacing: "0.3px",
}));

export const SessionCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.28s ease",
  padding: theme.spacing(3),
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  background: theme.palette.background.paper,
  "&:hover": {
    transform: "translateY(-4px) scale(1.01)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
  },
}));

export const TimeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

export const SessionTimeText = styled(Typography)({
  fontWeight: 700,
  letterSpacing: "0.3px",
  fontSize: "1.75rem",
});
