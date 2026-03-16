import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const SessionContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const LoadingBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
