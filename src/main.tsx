import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { IndexGlobalStyles } from "./styled/GlobalStyles.tsx";
import { Router } from "./pages/router.tsx";
import { store } from "./redux/store.ts";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <IndexGlobalStyles />
        <Router />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
