import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  borderRadius: theme.spacing(2),
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),

  svg: {
    fontSize: 40,
  },
}));

export const MovieTitle = styled(Typography)({
  fontWeight: 700,
});

export const LoadingBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
});

export const MoviesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: theme.spacing(2),
  },
}));

export const MovieCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1.5),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

export const MovieImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingBottom: "150%",
  overflow: "hidden",
  backgroundColor: theme.palette.grey[300],

  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export const MovieContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

export const MovieTitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

export const MovieDescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  flex: 1,
}));

export const MovieMetaBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  flexWrap: "wrap",
}));

export const GenreChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  fontSize: "0.75rem",
  fontWeight: 500,
}));

export const MovieInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

export const MovieInfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),

  svg: {
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
}));

export const BookingButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  fontWeight: 600,
  padding: theme.spacing(1.2, 2),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    boxShadow: `0 8px 16px ${theme.palette.primary.light}`,
    transform: "translateY(-2px)",
  },

  "&:active": {
    transform: "translateY(0)",
  },
}));

export const ErrorBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
});

export const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
  textAlign: "center",
  gap: theme.spacing(2),

  svg: {
    fontSize: "80px",
    color: theme.palette.text.secondary,
    opacity: 0.5,
  },
}));
