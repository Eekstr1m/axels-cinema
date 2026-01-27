import GlobalStyles from "@mui/material/GlobalStyles";
import type { Theme } from "@mui/material/styles";

export const IndexGlobalStyles = () => (
  <GlobalStyles
    styles={(theme: Theme) => ({
      ":root": {
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        margin: 0,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
    })}
  />
);
