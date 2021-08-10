import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const clientBuilder = (isSrr: boolean) => {
  if (!isSrr)
    return new ApolloClient({
      ssrMode: isSrr,
      uri: "/api/graphql",
      cache: new InMemoryCache(),
    });

  return new ApolloClient({
    ssrMode: isSrr,
    link: createHttpLink({
      uri: "/api/graphql",

      // TODO: ADD Auth

      // credentials: "same-origin",
      // headers: {
      //   cookie: req.header("Cookie"),
      // },
    }),
    cache: new InMemoryCache(),
  });
};

export const backendGraphqlClient = clientBuilder(true);
