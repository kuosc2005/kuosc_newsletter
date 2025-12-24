import { getRepos } from "../api/github";
import { GithubRepo, Summary } from "../types/github";

export async function generateNewsletter() {
  const org = "kuosc2005";
  const summary: Summary = {};
  const repos: GithubRepo[] = await getRepos(org);
  console.log(JSON.stringify(repos, null, 2));
  return summary;
}
