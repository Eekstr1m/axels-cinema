import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

export const FormBox = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export const SectionHeading = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  "& svg": {
    fontSize: 28,
    color: theme.palette.primary.main,
  },
}));

export const InfoGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const InfoInlineSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    "&.Mui-focused": {
      boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.spacing(1),
}));

export const SuccessfulBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),

  "& svg": {
    fontSize: 80,
    color: theme.palette.primary.main,
  },
}));

export const ColoredInputAdornment = styled(InputAdornment)(({ theme }) => ({
  color: theme.palette.primary.light,
}));
