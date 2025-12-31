import { gql } from "graphql-request";

export const ISSUE_QUERY = gql`
  query IssueActivity($owner: String!, $name: String!, $sinceDate: DateTime!) {
    repository(owner: $owner, name: $name) {
      issues(
        first: 5
        states: OPEN
        orderBy: { field: CREATED_AT, direction: DESC }
        filterBy: { since: $sinceDate }
      ) {
        nodes {
          id
          title
          url
          number
          author {
            login
            avatarUrl
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
