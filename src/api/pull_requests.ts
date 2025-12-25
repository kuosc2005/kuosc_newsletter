import { gql } from "graphql-request";

export const PR_QUERY = gql`

query PRActivity($owner: String!, $name: String!){
  repository(owner: $owner, name: $name) {
    pullRequests(
      first: 5
      states: [OPEN, CLOSED, MERGED]
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      nodes {
        number
        title
        url
        state
        createdAt
        mergedAt
        author {
          login
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
