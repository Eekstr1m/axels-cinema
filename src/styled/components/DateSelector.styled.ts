import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const DateSelectorContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const DatesHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export const DatesGrid = styled(Grid)({
  placeContent: "center",
});

export const DateChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  minWidth: "120px",
  fontSize: "0.95rem",
  fontWeight: isSelected ? 600 : 400,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: isSelected
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
  },
}));
