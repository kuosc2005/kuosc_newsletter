import "dotenv/config";
import { sendEmail } from "./sendDigest";

async function main() {
  try {
    sendEmail();
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

main();
