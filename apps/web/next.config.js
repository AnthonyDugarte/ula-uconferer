module.exports = {
  reactStrictMode: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/graphql",
          destination: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
        },
      ],
    };
  },
};
