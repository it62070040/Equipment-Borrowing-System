import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { CookiesProvider } from 'react-cookie'
import Cookies from 'universal-cookie';
import { AppProvider } from "./context/AppContext";
import App from "./App";
import { setContext } from '@apollo/client/link/context';
import { createUploadLink  } from 'apollo-upload-client'

const root = ReactDOM.createRoot(document.getElementById("root"));
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('filmballpetenewbeer-token');
  const cookies = new Cookies();
  const token = cookies.get('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const httpLink = createUploadLink({
  uri: 'https://equipment-borrowing-system-api.vercel.app/graphql' || 'http://localhost:3001/graphql',
});


// const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // credentials: 'include',
})


// const client = new ApolloClient({
//   uri: 'https://equipment-borrowing-system-api.vercel.app/graphql',
//   cache: new InMemoryCache(),
//   credentials: 'include'
// });
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