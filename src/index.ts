import "dotenv/config";
import { fetchData, fetchRepos } from "./controller/newsletter.controller";
import { GithubRepo, Summary } from "./types/github";
import { sendDigestEmail } from "./sendDigest";

async function main() {
  const owner = "stdlib-js";
  try {
    const repos = await fetchRepos(owner);
    const generatedAt = new Date().toISOString();
    const summary: Summary[] = (
      await Promise.all(
        repos.map(async (repo) => {
          const { issues, commits, pullRequests } = await fetchData(
            owner,
            repo.name,
          );
          if (!issues.length && !commits.length && !pullRequests.length)
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
    console.log(JSON.stringify(summary, null, 2));
    await sendDigestEmail(summary);
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

main();
