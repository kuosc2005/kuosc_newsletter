import { githubClient } from "../utils/http";

export async function getRepos(org: string) {
  const res = await githubClient.get(`/orgs/${org}/repos`);
  return res.data;
}

export async function getCommits(owner: string, repo: string) {
  const res = await githubClient.get(`/repos/${owner}/${repo}/commits`);
  return res.data;
}
