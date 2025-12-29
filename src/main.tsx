import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import { IndexGlobalStyles } from "./styled/GlobalStyles.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndexGlobalStyles />
    <App />
  </StrictMode>
);
