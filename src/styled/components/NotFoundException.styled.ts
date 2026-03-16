import { alpha, keyframes, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
`;

export const NotFoundBanner = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(2.5),
  marginBottom: theme.spacing(4),
  minHeight: 220,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
  border: `1.5px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  animation: `${fadeIn} 0.45s ease both`,
}));

export const NotFoundContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(4),
  textAlign: "center",

  svg: {
    fontSize: 52,
    color: alpha(theme.palette.primary.main, 0.45),
    animation: `${pulse} 2.5s ease-in-out infinite`,
  },
}));

export const NotFoundTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.15rem",
  color: theme.palette.text.primary,
}));

export const NotFoundSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

export const NotFoundButton = styled("button")(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(1, 3),
  borderRadius: theme.spacing(1.5),
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.9rem",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "#fff",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.35)}`,

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 18px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
  "&:active": { transform: "translateY(0)" },
}));
