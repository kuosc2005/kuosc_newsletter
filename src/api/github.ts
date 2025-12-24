import { formatISO, subWeeks } from "date-fns";
import { Commit, GithubRepo } from "../types/github";
import { githubClient } from "../utils/http";

export async function getRepos(org: string): Promise<GithubRepo[]> {
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
