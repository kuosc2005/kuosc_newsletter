import { formatISO, subWeeks } from "date-fns";
import { Summary } from "../types/github";
import { githubClient } from "../utils/http";

export async function getGithubActivitySummary(): Promise<Summary[]> {
  const org = "kuosc2005";
  const sinceDate = formatISO(subWeeks(new Date(), 1));
  const query = `
    query getOrganizationRepos($org: String!, $sinceDate: GitTimestamp!) {
      organization(login: $org) {
        repositories(first: 50) {
          nodes {
            id
            url
            name
            description
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
      }
    }
  `;

  const res = await githubClient.post("/graphql", {
    query,
    variables: { org, sinceDate },
  });

  console.log(res.data);
  return res.data.data.organization.repositories.nodes;
}
