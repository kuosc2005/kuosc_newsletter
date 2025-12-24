import { getCommitsWeekAgo, getRepos } from "../api/github";
import { GithubRepo, Summary } from "../types/github";

export async function generateNewsletter() {
  const org = "kuosc2005";
  const summary: Summary = {};
  const repos: GithubRepo[] = await getRepos(org);
  console.log(repos);
  // getRecentCommits(summary, repos, org);
  return summary;
}

// function getRecentCommits(summary: Summary, repos: GithubRepo[], org: string) {
//   repos.forEach(async (repo) => {
//     const repoName = repo.name;
//     const repoDesciption = repo.description;
//     const id = repo.id;
//     const recentCommits = await getCommitsWeekAgo(org, repoName);
//     console.log(recentCommits);
//   });
// }
