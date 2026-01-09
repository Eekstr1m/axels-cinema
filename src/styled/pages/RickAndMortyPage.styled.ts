import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const StatusBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
});

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1400,
  margin: "0 auto",
}));

export const PageHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  textAlign: "center",
}));

export const CharactersGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const CharacterCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: 4,
  },
});

export const CharacterImage = styled("img")({
  width: "100%",
  height: 300,
  objectFit: "cover",
});

export const CharacterContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const CharacterContentName = styled(Typography)({
  fontWeight: 600,
});

export const CharacterInfoFieldText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const NoCharactersBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(4),
}));

export const PaginationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  mt: theme.spacing(4),
}));
