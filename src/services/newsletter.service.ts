import { githubClient } from "../utils/client";
import { ISSUE_QUERY } from "../api/issues";
import { PR_QUERY } from "../api/pull_requests";
import { REPO_QUERY } from "../api/repos";
import { COMMIT_QUERY } from "../api/commits";
import { Commit, GithubRepo, Issue, PullRequest } from "../types/github";

export async function getReposData(owner: string): Promise<GithubRepo[]> {
  const data = await githubClient.request(REPO_QUERY, { owner });
  return data.organization.repositories.nodes;
}

export async function getCommitsData(
  owner: string,
  name: string,
  sinceDate: string,
): Promise<Commit[]> {
  const data = await githubClient.request(COMMIT_QUERY, {
    owner,
    name,
    sinceDate,
  });
  return data.repository.defaultBranchRef?.target.history.nodes;
}
export async function getIssueData(
  owner: string,
  name: string,
  sinceDate: string,
): Promise<Issue[]> {
  const data = await githubClient.request(ISSUE_QUERY, {
    owner,
    name,
    sinceDate,
  });
  return data.repository.issues?.nodes;
}

export async function getPRData(
  owner: string,
  name: string,
  sinceDate: string,
): Promise<PullRequest[]> {
  const searchQuery = `repo:${owner}/${name} is:pr created:>=${sinceDate}`;

  const data = await githubClient.request(PR_QUERY, {searchQuery});
  return data.search.nodes
}
