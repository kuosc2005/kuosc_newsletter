import "dotenv/config";
import { fetchRepos, getSummary } from "./controller/newsletter.controller";
import { Summary } from "./types/github";
import { sendDigestEmail } from "./sendDigest";

async function main() {
  const owner = "stdlib-js";
  try {
    const repos = await fetchRepos(owner);
    const summary: Summary[] = await getSummary(owner, repos);
    console.log(JSON.stringify(summary, null, 2));
    await sendDigestEmail(summary);
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

main();
