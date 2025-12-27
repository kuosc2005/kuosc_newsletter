import "dotenv/config";
import { fetchData, fetchRepos } from "./controller/newsletter.controller";
async function main() {
  const owner = "facebook";
  const name = "react";
  try {
    const repos = await fetchRepos(owner);
    const result = await fetchData(owner, name);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

main();
