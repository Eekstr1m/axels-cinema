import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),

  //   Size the icon within the header box
  svg: {
    fontSize: 40,
  },
}));

export const CinemaTitle = styled(Typography)({
  fontWeight: 700,
});

export const LoadingBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
