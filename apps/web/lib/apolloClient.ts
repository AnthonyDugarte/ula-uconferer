import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

let accessToken: string | null = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = "public";
  }
};

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    "statusCode" in networkError &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});

const createHttpLink = (headers: any) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(
      process.env.NEXT_PUBLIC_GRAPHQL_API_URL!.replace(
        /^http(s)?:\/\//,
        "ws$1://"
      ),
      {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          await requestAccessToken(); // happens on the client
          return {
            headers: {
              authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
          };
        },
      }
    )
  );
};

export default function createApolloClient(
  initialState: NormalizedCacheObject = {},
  headers: any
) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers); // executed on server
  } else {
    link = createWSLink(); // executed on client
  }

  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
