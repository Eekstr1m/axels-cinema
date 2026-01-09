import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const PageContainer = styled(Box)({
  padding: "32px",
  maxWidth: 1000,
  margin: "0 auto",
});

export const BackButton = styled(Box)({
  marginBottom: "24px",
});

export const ImageGridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 24,
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "400px 1fr",
  },
}));

export const CharacterImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: 300,
  objectFit: "cover",
  [theme.breakpoints.up("md")]: {
    height: "100%",
  },
}));

export const CharacterName = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export const ChipsContainer = styled(Box)({
  marginBottom: "24px",
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
});

export const InfoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const EpisodeToggle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const EpisodesPaper = styled(Paper)({
  marginTop: "24px",
});

export const StatusBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
});

export const InfoFieldBox = styled(Box)({});
