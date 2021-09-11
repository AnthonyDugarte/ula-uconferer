import "../styles/globals.css";

import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Uconferer</title>
        <meta name="description" content="Virtual conference app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
