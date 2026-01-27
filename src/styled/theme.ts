import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#667eea", light: "#667eea99" },
    secondary: { main: "#764ba2" },
    error: { main: "#d32f2f" },
    success: { main: "#376e37" },
    warning: { main: "#ff9800" },
    info: { main: "#2196f3" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
});
