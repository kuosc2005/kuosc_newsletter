import { generateNewsletter } from "./services/newsletter";

async function main() {
  const org = "kuosc2005";
  const data = await generateNewsletter(org);
  console.log(JSON.stringify(data, null, 2));
}

main();
