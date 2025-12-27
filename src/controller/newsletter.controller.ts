import {
  getPRData,
  getIssueData,
  getReposData,
  getCommitsData,
} from "../services/newsletter.service";
import { formatISO, subWeeks } from "date-fns";
import { GithubRepo } from "../types/github";

export async function fetchData(owner: string, name: string) {
  const sinceDate = formatISO(subWeeks(new Date(), 1));
  // console.log(sinceDate, typeof(sinceDate))
  const [commits, issues, pullRequests] = await Promise.all([
    getCommitsData(owner, name, sinceDate),
    getIssueData(owner, name, sinceDate),
    getPRData(owner, name, sinceDate),
  ]);
  return {
    generatedAt: new Date().toISOString(),
    issues,
    commits,
    pullRequests,
  };
}

export async function fetchRepos(owner: string): Promise<GithubRepo[]> {
  const repos = await getReposData(owner);
  return repos;
}
