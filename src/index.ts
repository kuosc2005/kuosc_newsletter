import { fetchRepos } from "./fetchRepos.js";
import { fetchNews } from "./fetchNews.js";
import { generateNewsletter } from "./generatenewsletter.js";
import { fetchLatestPRsFromOrg } from "./fetchPrs.js";
import * as fs from "fs";

async function main() {
   const org = "kuosc2005";

  console.log("Fetching latest PRs from KUOSC repos...");
  const latestPRs = await fetchLatestPRsFromOrg(org);

  console.log(`✅ Found ${latestPRs.length} latest PRs:\n`);
  latestPRs.forEach(pr => {
    console.log(`[${pr.repo}] ${pr.title} by ${pr.author} → ${pr.url}`);
  });

  console.log("Fetching KUOSC repos...");
  const repos = await fetchRepos();
  console.log("Repos:", repos); // ✅ Log the repos

  

  console.log("Fetching open-source news...");
  const news = await fetchNews();
  console.log("News:", news); // ✅ Log the news

    const newsletter = generateNewsletter(repos, news, latestPRs);


  fs.writeFileSync("newsletter.md", newsletter);
  console.log("✅ Newsletter generated at newsletter.md");
}

main().catch((err) => {
  console.error("❌ Error generating newsletter:", err);
});
