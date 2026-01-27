import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const ErrorContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ErrorContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),

  "& svg": {
    fontSize: 120,
    color: theme.palette.error.main,
  },
}));

export const ErrorHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.error.main,
}));

export const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.spacing(1),
}));
