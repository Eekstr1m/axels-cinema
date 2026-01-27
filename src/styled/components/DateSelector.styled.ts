import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const DateSelectorContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const DatesHeading = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(0.5),

  svg: {
    fontSize: 28,
    color: theme.palette.primary.main,
  },
}));

export const DatesHeadingText = styled(Typography)(({ theme }) => ({
  fontSize: "1.375rem",
  fontWeight: 700,
  letterSpacing: "0.5px",
  color: theme.palette.text.primary,
}));

export const DatesScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  overflowX: "auto",
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  scrollBehavior: "smooth",

  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: alpha(theme.palette.primary.main, 0.3),
    borderRadius: "4px",

    "&:hover": {
      background: alpha(theme.palette.primary.main, 0.5),
    },
  },
}));

export const DateCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  minWidth: "90px",
  width: "90px",
  height: "110px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(1.5),
  borderRadius: "16px",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  flexShrink: 0,

  boxShadow: isSelected
    ? `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`
    : "0 4px 8px rgba(0, 0, 0, 0.1)",

  background: isSelected
    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
    : theme.palette.background.paper,

  color: isSelected ? "#fff" : theme.palette.text.primary,

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: isSelected
      ? `0 12px 24px ${alpha(theme.palette.primary.main, 0.4)}`
      : "0 8px 16px rgba(0, 0, 0, 0.15)",
  },

  "&:active": {
    transform: "translateY(-2px)",
  },
}));

export const DateCardWeekday = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ isSelected }) => ({
  fontSize: "0.8125rem",
  fontWeight: isSelected ? 600 : 500,
  textTransform: "uppercase",
  opacity: isSelected ? 0.9 : 0.7,
  marginBottom: "4px",
  letterSpacing: "0.5px",
}));

export const DateCardDay = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ isSelected }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  marginVertical: "2px",
  color: isSelected ? "#fff" : "inherit",
}));

export const DateCardMonth = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ isSelected }) => ({
  fontSize: "0.875rem",
  fontWeight: isSelected ? 600 : 500,
  textTransform: "uppercase",
  opacity: isSelected ? 0.9 : 0.7,
  letterSpacing: "0.3px",
}));
