import { formatISO, subWeeks } from "date-fns";
import { Commit, GithubRepo } from "../types/github";
import { githubClient } from "../utils/http";

export async function getRepos(org: string): Promise<GithubRepo[]> {
  const res = await githubClient.get<GithubRepo[]>(`/orgs/${org}/repos`);
  return res.data;
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
