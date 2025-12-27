import "dotenv/config";
import { fetchData, fetchRepos } from "./controller/newsletter.controller";
import { GithubRepo, Summary } from "./types/github";
import { sendDigestEmail } from "./sendDigest";

async function main() {
  const owner = "kuosc2005";
  try {
    const repos = await fetchRepos(owner);
    const summary: Summary[] = await Promise.all(
      repos.map(async (repo: GithubRepo) => {
        const issuesCommitsPullRequests = await fetchData(owner, repo.name);
        return {
          ...repo,
          ...issuesCommitsPullRequests,
        };
      }),
    );
    console.log(JSON.stringify(summary, null, 2));
    await sendDigestEmail(summary);
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

main();
