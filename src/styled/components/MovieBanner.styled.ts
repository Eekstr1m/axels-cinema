import { alpha, keyframes, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const MovieHeroBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posterUrl",
})<{ posterUrl: string }>(({ theme, posterUrl }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(2.5),
  marginBottom: theme.spacing(4),
  minHeight: 280,

  backgroundImage: `url(${posterUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center 20%",

  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `linear-gradient(90deg, ${alpha("#000", 0.88)} 0%, ${alpha("#000", 0.65)} 50%, ${alpha("#000", 0.2)} 100%)`,
    zIndex: 1,
  },
}));

export const MovieHeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  display: "flex",
  gap: theme.spacing(3.5),
  padding: theme.spacing(3.5),
  animation: `${fadeIn} 0.5s ease both`,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
  },
}));

export const MovieHeroPoster = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: 140,
  height: 210,
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
  border: `3px solid ${alpha("#fff", 0.15)}`,

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  [theme.breakpoints.down("sm")]: {
    width: 110,
    height: 165,
  },
}));

export const MovieHeroInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  color: "#fff",
  flex: 1,
  minWidth: 0,
}));

export const MovieHeroTitle = styled(Typography)({
  fontWeight: 800,
  fontSize: "1.8rem",
  color: "#fff",
  lineHeight: 1.2,
  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
});

export const MovieHeroMetaRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  color: alpha("#fff", 0.8),
  fontSize: "0.875rem",
  fontWeight: 500,

  svg: {
    fontSize: 16,
    opacity: 0.8,
  },
}));

export const MovieHeroMetaItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

export const MovieHeroGenres = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.75),
}));

export const MovieHeroGenreChip = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.25, 1.25),
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "capitalize",
  background: alpha(theme.palette.primary.main, 0.55),
  border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
  color: "#fff",
  backdropFilter: "blur(4px)",
}));

export const MovieHeroDescription = styled(Typography)({
  fontSize: "0.9rem",
  color: alpha("#fff", 0.75),
  lineHeight: 1.6,
});
