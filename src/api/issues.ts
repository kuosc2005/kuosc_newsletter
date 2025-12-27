import { gql } from "graphql-request";

export const ISSUE_QUERY = gql`
  query IssueActivity($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(
        first: 5
        states: OPEN
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          title
          url
          author {
            login
            url
          }
          createdAt
          comments {
            totalCount
          }
          labels(first: 5) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;
