import { gql } from "graphql-request";

export const PR_QUERY = gql`
query PRActivitySince($searchQuery: String!) {
  search(
    query: $searchQuery
    type: ISSUE
    first: 5
  ) {
    nodes {
      ... on PullRequest {
        id
        number
        title
        url
        state
        createdAt
        mergedAt
        author {
          login
          url
        }
        comments {
          totalCount
        }
        additions
        deletions
        changedFiles
      }
    }
  }
}
`;
