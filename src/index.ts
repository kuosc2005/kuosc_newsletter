
import "dotenv/config";
import { fetchData } from "./controller/newsletter.controller";
async function main() {

  const owner = 'atrociousdinner'
  const name = 'expense-tracker-cli'

  try {
    const result = await fetchData(
      owner,
      name
  );

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

main();
