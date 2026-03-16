import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  borderRadius: theme.spacing(2),
}));

export const HeaderBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "renderProfileButton",
})<{ renderProfileButton: boolean }>(({ theme, renderProfileButton }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: renderProfileButton ? "space-between" : "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),

  svg: {
    fontSize: 40,
  },
}));

export const HeaderBrand = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const HeaderTitle = styled(Link)({
  fontWeight: 700,
  textDecoration: "none",
  transition: "all 0.3s",
  color: "inherit",
  cursor: "pointer",

  "&:hover": {
    textShadow: "0 0px 15px rgba(255, 255, 255, 0.5)",
  },
});

export const HeaderActionButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderColor: alpha(theme.palette.common.white, 0.6),
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 2.5),
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    borderColor: alpha(theme.palette.common.white, 0.8),
  },
}));
