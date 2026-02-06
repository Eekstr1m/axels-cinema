import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";

export const LoginPageWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(6, 2),
  // background: `linear-gradient(135deg, ${alpha(
  //   theme.palette.primary.main,
  //   0.12,
  // )} 0%, ${alpha(theme.palette.secondary.main, 0.12)} 100%)`,
  // position: "relative",
  // overflow: "hidden",
  // "&::before": {
  //   content: '""',
  //   position: "absolute",
  //   width: 420,
  //   height: 420,
  //   borderRadius: "50%",
  //   top: -140,
  //   right: -120,
  //   background: `radial-gradient(circle, ${alpha(
  //     theme.palette.primary.main,
  //     0.35,
  //   )} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
  //   filter: "blur(4px)",
  // },
  // "&::after": {
  //   content: '""',
  //   position: "absolute",
  //   width: 360,
  //   height: 360,
  //   borderRadius: "50%",
  //   bottom: -140,
  //   left: -100,
  //   background: `radial-gradient(circle, ${alpha(
  //     theme.palette.secondary.main,
  //     0.35,
  //   )} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`,
  //   filter: "blur(6px)",
  // },
}));

export const LoginGrid = styled(Box)(({ theme }) => ({
  // position: "relative",
  // zIndex: 1,
  // width: "100%",
  // maxWidth: 1100,
  display: "grid",
  // gridTemplateColumns: "1.05fr 0.95fr",
  gap: theme.spacing(2),
  // alignItems: "stretch",
  // [theme.breakpoints.down("md")]: {
  //   gridTemplateColumns: "1fr",
  // },
}));

export const BrandPanel = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(140deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  boxShadow: `0 24px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.common.white,
      0.12,
    )} 0%, ${alpha(theme.palette.common.white, 0)} 100%)`,
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
  },
}));

export const BrandContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  gap: theme.spacing(2.5),
}));

export const LogoBadge = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& svg": {
    fontSize: 30,
    color: "white",
  },
}));

export const BrandTitle = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: 0.4,
}));

export const BrandSubtitle = styled(Typography)(() => ({
  opacity: 0.85,
  maxWidth: 420,
}));

export const FeatureList = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
}));

export const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  fontSize: "0.95rem",

  "& svg": {
    fontSize: 20,
  },
}));

export const LoginCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(4),
  backgroundColor: alpha(theme.palette.common.white, 0.95),
  boxShadow: `0 20px 50px ${alpha(theme.palette.grey[900], 0.12)}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1.5),
}));

export const CardTitle = styled(Typography)(() => ({
  fontWeight: 700,
}));

export const HomeButton = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textDecoration: "none",
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  paddingBottom: 2,
  transition: "border-color 0.3s",

  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

export const CardSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const FormStack = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
}));

export const ActionRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.3, 2),
  fontWeight: 600,
  textTransform: "none",
  borderRadius: theme.spacing(1.5),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: `0 16px 30px ${alpha(theme.palette.primary.main, 0.35)}`,

  "&:hover": {
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.45)}`,
    transform: "translateY(-1px)",
  },
}));

export const HelperText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 500,
}));
