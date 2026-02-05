import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

export const ProfileShell = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  position: "relative",
  borderRadius: theme.spacing(2.5),
}));

export const HeroCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.88) 100%)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  flexWrap: "wrap",
}));

export const AvatarRing = styled(Box)(({ theme }) => ({
  width: 110,
  height: 110,
  borderRadius: "50%",
  padding: theme.spacing(0.7),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 14px 28px ${alpha(theme.palette.primary.main, 0.25)}`,
}));

export const HeroTextBlock = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.8),
  flex: 1,
  minWidth: 220,
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "2rem",
  color: theme.palette.text.primary,
  fontFamily: '"Space Grotesk", "DM Sans", system-ui, sans-serif',
}));

export const MetaRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",

  "& span": {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.6),
  },

  "& svg": {
    fontSize: "1.1rem",
    color: theme.palette.primary.main,
  },
}));

export const HeroActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
}));

export const PrimaryActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.2, 3),
  fontWeight: 600,
  textTransform: "none",
  borderRadius: theme.spacing(1.2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`,

  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

export const StatsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: theme.spacing(2),
  position: "relative",
  zIndex: 1,
}));

export const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.6),
  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",

  "& svg": {
    color: theme.palette.primary.main,
  },
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.85rem",
}));

export const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.4rem",
  color: theme.palette.text.primary,
}));

export const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: theme.spacing(2),
  position: "relative",
  zIndex: 1,
}));

export const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(2),
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  "& svg": {
    color: theme.palette.primary.main,
  },
}));

export const BookingItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.4),
  borderRadius: theme.spacing(1.5),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background: alpha(theme.palette.primary.main, 0.05),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.6),
}));

export const BookingTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const BookingMeta = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",

  "& span": {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
  },

  "& svg": {
    fontSize: "1rem",
    color: theme.palette.primary.main,
  },
}));
