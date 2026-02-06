import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const CenteredLoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: theme.spacing(2),
}));
