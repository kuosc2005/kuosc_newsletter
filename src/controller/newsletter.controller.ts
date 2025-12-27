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
  // const [commits, issues, pullRequests] = await Promise.all([
  //   getCommitsData(owner, name, sinceDate),
  //   getIssueData(owner, name),
  //   getPRData(owner, name),
  // ]);

  const commit = await getCommitsData(owner, name, sinceDate);
  return {
    generatedAt: new Date().toISOString(),
    commits: commit,
  };
}

export async function fetchRepos(owner: string) {
  const repos = await getReposData(owner);
  return repos;
}
