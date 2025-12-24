import "dotenv/config";
import { getGithubActivitySummary } from "./api/github";

async function main() {
  const data = await getGithubActivitySummary();
  console.log(JSON.stringify(data, null, 2));
}

main();
