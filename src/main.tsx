import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { IndexGlobalStyles } from "./styled/GlobalStyles.tsx";
import { Router } from "./pages/router.tsx";
import { store } from "./redux/store.ts";
import { theme } from "./styled/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IndexGlobalStyles />
        <Router />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
