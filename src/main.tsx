import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IndexGlobalStyles } from "./styled/GlobalStyles.tsx";
import { Router } from "./pages/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndexGlobalStyles />
    <Router />
  </StrictMode>
);
