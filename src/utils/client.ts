import { GraphQLClient } from "graphql-request";

export const githubClient = new GraphQLClient(
  "https://api.github.com/graphql",
  {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  },
);
