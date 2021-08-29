import "../styles/globals.css";

import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


/**
 * Apollo Client connected to LocalHost. 
 * TODO: Handle the harcoded value in a configuration or ENV.
 */

const client = new ApolloClient({
  uri: 'https://localhost:3000//v1/graphql',
  cache: new InMemoryCache()
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>  
        <Head>
          <title>Uconferer</title>
          <meta name="description" content="Virtual conference app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
