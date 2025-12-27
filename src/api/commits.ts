import { gql } from "graphql-request";
export const COMMIT_QUERY = gql`
  query CommitsActivity(
    $owner: String!
    $name: String!
    $sinceDate: GitTimestamp
  ) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, since: $sinceDate) {
              nodes {
                id
                url
                oid
                message
                additions
                deletions
                changedFilesIfAvailable
                committedDate
                author {
                  email
                  name
                  user {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
