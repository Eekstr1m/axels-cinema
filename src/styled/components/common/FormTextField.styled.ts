import InputAdornment from "@mui/material/InputAdornment";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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

export const ColoredInputAdornment = styled(InputAdornment)(({ theme }) => ({
  color: theme.palette.primary.light,
}));
