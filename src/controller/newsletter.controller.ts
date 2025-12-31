import {
  getPRData,
  getIssueData,
  getReposData,
  getCommitsData,
} from "../services/newsletter.service";
import { formatISO, subWeeks } from "date-fns";
import { GithubRepo, Summary } from "../types/github";

export async function fetchData(owner: string, name: string) {
  const sinceDate = formatISO(subWeeks(new Date(), 1));

  const [commits, issues, pullRequests] = await Promise.all([
    getCommitsData(owner, name, sinceDate),
    getIssueData(owner, name, sinceDate),
    getPRData(owner, name, sinceDate),
  ]);

  return {
    issues,
    commits,
    pullRequests,
  };
}

export async function fetchRepos(owner: string): Promise<GithubRepo[]> {
  const repos = await getReposData(owner);
  return repos;
}

export async function getSummary(owner: string, repos: GithubRepo[]) {
  const generatedAt = new Date().toISOString();
  return (
    await Promise.all(
      repos.map(async (repo) => {
        const { issues, commits, pullRequests } = await fetchData(
          owner,
          repo.name,
        );
        if (!issues?.length && !commits?.length && !pullRequests?.length)
          return null;
        return {
          repoId: repo.id,
          repoUrl: repo.url,
          repoName: repo.name,
          repoDescription: repo.description,
          issues,
          commits,
          pullRequests,
          generatedAt,
        };
      }),
    )
  ).filter((r): r is Summary => r !== null);
}
