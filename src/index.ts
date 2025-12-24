import "dotenv/config";
import { generateNewsletter } from "./services/newsletter";

async function main() {
  const data = await generateNewsletter();
  console.log(JSON.stringify(data, null, 2));
}

main();
