import {
  getPRData,
  getIssueData,
  getReposData,
} from "../services/newsletter.service";

export async function fetchData(owner: string, name: string) {
  const [repos, issues, pullRequests] = await Promise.all([
    getReposData(owner),
    getIssueData(owner, name),
    getPRData(owner, name),
  ]);

  return {
    repository: `${owner}/${name}`,
    generatedAt: new Date().toISOString(),
    issues,
    pullRequests,
  };
}

export async function fetchRepos(owner: string) {
  const repos = await getReposData(owner);
  return repos;
}
