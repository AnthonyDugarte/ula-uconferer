import { NextPage, NextPageContext } from "next";
import { AppContext } from "next/app";
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import {
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import createApolloClient from "./apolloClient";

import auth0 from "./auth0";
import { FC } from "react";

interface ApolloNextPageProps {
  apolloClient?: ReturnType<typeof createApolloClient>;
  apolloState?: NormalizedCacheObject;
}

type EnrichedNextPageContext = NextPageContext &
  ApolloNextPageProps & {
    ctx?: AppContext["ctx"] & ApolloNextPageProps;
  };

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ReturnType<typeof createApolloClient> | null = null;

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 */
export const initOnContext = (ctx: EnrichedNextPageContext) => {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === "development") {
    if (inAppContext) {
      console.warn(
        "Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n" +
          "Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n"
      );
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ctx.apolloState, inAppContext ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  // @ts-ignore
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext && ctx.ctx) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

async function getHeaders(ctx: EnrichedNextPageContext) {
  if (typeof window !== "undefined") return null;
  if (typeof ctx.req === "undefined") return null;

  if (ctx.res) {
    const s = await auth0.getSession(ctx.req, ctx.res);

    if (!s?.idToken) return null;

    return {
      authorization: `Bearer ${s ? s.id?.idToken : ""}`,
    };
  }
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (
  initialState?: NormalizedCacheObject,
  headers?: any
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, headers);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers);
  }

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 */
export const withApollo =
  <T,>({ ssr = true, auth = true } = {}) =>
  (PageComponent: NextPage<T>) => {
    const WithApolloBase: FC<
      T & EnrichedNextPageContext & WithPageAuthRequiredProps
    > = ({ apolloClient, apolloState, ...pageProps }) => {
      let client: ReturnType<typeof createApolloClient>;
      if (apolloClient) {
        // Happens on: getDataFromTree & next.js ssr
        client = apolloClient;
      } else {
        // Happens on: next.js csr
        client = initApolloClient(apolloState, {});
      }

      return (
        <ApolloProvider client={client}>
          {/* @ts-ignore */}
          <PageComponent {...pageProps} />
        </ApolloProvider>
      );
    };
    const WithApollo = auth
      ? withPageAuthRequired(WithApolloBase, {
          onRedirecting() {
            // TODO: Improve loader
            return <>Loading...</>;
          },
        })
      : WithApolloBase;

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== "production") {
      const displayName =
        PageComponent.displayName || PageComponent.name || "Component";
      WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
      // @ts-ignore
      WithApollo.getInitialProps = async (ctx: EnrichedNextPageContext) => {
        const { AppTree } = ctx;

        // Initialize ApolloClient, add it to the ctx object so
        // we can use it in `PageComponent.getInitialProp`.
        const apolloClient = (ctx.apolloClient = initApolloClient(
          undefined,
          await getHeaders(ctx)
        ));

        // Run wrapped getInitialProps methods
        let pageProps = {};
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx);
        }

        // Only on the server:
        if (typeof window === "undefined") {
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res && ctx.res.writableEnded) {
            return pageProps;
          }

          // Only if ssr is enabled
          if (ssr) {
            try {
              // Run all GraphQL queries
              const { getDataFromTree } = await import(
                "@apollo/client/react/ssr"
              );

              await getDataFromTree(
                <AppTree
                  pageProps={{
                    ...pageProps,
                    apolloClient,
                  }}
                />
              );
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              // Handle them in components via the data.error prop:
              // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
              console.error("Error while running `getDataFromTree`", error);
            }
          }
        }

        // Extract query data from the Apollo store
        const apolloState = apolloClient.cache.extract();

        return {
          ...pageProps,
          apolloState,
        };
      };
    }

    return WithApollo;
  };
