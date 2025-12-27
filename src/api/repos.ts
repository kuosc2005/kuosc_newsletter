import { gql } from "graphql-request";

export const REPO_QUERY = gql`
  query getOrganizationRepos($owner: String!) {
    organization(login: $owner) {
      repositories(first: 50) {
        nodes {
          id
          url
          name
          description
        }
      }
    }
  }
`;
