import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { CookiesProvider } from 'react-cookie'
import { AppProvider } from "./context/AppContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new ApolloClient({
  uri: 'https://equipment-borrowing-system-api.vercel.app/graphql',
  cache: new InMemoryCache(),
  credentials: 'same-origin'
});
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <AppProvider>
            <App />
        </AppProvider>
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>
);

