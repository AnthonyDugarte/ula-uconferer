module.exports = {
  reactStrictMode: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/graphql",
          destination: process.env.GRAPHQL_API_URL,
        },
      ],
    };
  },
};
