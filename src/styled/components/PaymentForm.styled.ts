import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const FormBox = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export const SectionHeading = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

export const StyledTextField = styled(TextField)({
  // Можна додати додаткові стилі якщо потрібно
});

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
}));
