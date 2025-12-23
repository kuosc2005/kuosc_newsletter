import { getRepos } from "../api/github";

export async function generateNewsletter(org: string) {
  const repos = await getRepos(org);
  console.log(repos);
}
