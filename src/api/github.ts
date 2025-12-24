import { formatISO, subWeeks } from "date-fns";
import { Commit, GithubRepo } from "../types/github";
import { githubClient } from "../utils/http";

export async function getRepos(org: string): Promise<GithubRepo[]> {
  const query = `
    query getOrganizationRepos($org: String!) {
      organization(login: $org) {
        repositories(first: 50) {
          nodes {
            id
            name
            description
          }
        }
      }
    }
  `;

  const res = await githubClient.post("/graphql", {
    query,
    variables: { org },
  });

  console.log(res.data);
  return res.data.data.organization.repositories.nodes;
}

export async function getCommitsWeekAgo(
  owner: string,
  repo: string,
): Promise<Commit[]> {
  const sinceDate = formatISO(subWeeks(new Date(), 1));
  const res = await githubClient.get<Commit[]>(
    `/repos/${owner}/${repo}/commits?since=${sinceDate}`,
  );
  return res.data;
}
