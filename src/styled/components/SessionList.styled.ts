import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export const SessionListContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SessionsHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export const SessionCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.3s",
  padding: theme.spacing(2),
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
  },
}));

export const TimeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const SessionTimeText = styled(Typography)({
  fontWeight: 600,
});

export const NoSessionsText = styled(Typography)({
  width: "100%",
  textAlign: "center",
});
