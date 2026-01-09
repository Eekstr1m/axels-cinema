import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const StatusBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
});

export const DataGridContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "fit-content",
  width: "100%",
}));

export const DataGridHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));
