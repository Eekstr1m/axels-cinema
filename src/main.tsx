import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { IndexGlobalStyles } from "./styled/GlobalStyles.tsx";
import { Router } from "./pages/router.tsx";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <IndexGlobalStyles />
      <Router />
    </Provider>
  </StrictMode>
);
