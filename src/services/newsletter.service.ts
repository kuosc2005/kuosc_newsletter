import { githubClient } from "../utils/client";
import { ISSUE_QUERY } from "../api/issues";
import { PR_QUERY } from "../api/pull_requests";
import { REPO_QUERY } from "../api/repos";

export async function getReposData(owner: string) {
  const data = await githubClient.request(REPO_QUERY, { owner });
  return data;
}

export async function getIssueData(owner: string, name: string) {
  const data = await githubClient.request(ISSUE_QUERY, { owner, name });
  return data;
}

export async function getPRData(owner: string, name: string) {
  const data = await githubClient.request(PR_QUERY, { owner, name });

  return data;
}

