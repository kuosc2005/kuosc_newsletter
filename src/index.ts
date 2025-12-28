import "dotenv/config";
import { fetchData, fetchRepos } from "./controller/newsletter.controller";
import { GithubRepo, Summary } from "./types/github";
import cron from "node-cron";
import nodemailer from 'nodemailer'
import { transporter } from "./utils/nodemailer";

async function main() {
  const owner = "facebook";
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
    const JSON_summary = JSON.stringify(summary, null, 2)
    console.log(JSON.stringify(summary, null, 2));
    return JSON_summary
  } catch (error) {
    console.error("Failed to generate repo activity summary");
    console.error(error);
    process.exit(1);
  }
}

// main();


const cronExpressionDeploy = '30 0 * * 0' // 11:30 AM on Sunday
const cronExpressionTest = '*/30 * * * * *' // Every 30 seconds



cron.schedule(cronExpressionTest, async () => {
  const data_to_send = await main()
  try{
    const info = transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.TEST_EMAIL_RECIPIENT, 
      subject: "Hello", 
      text: data_to_send,
    })
    console.log(`Message sent: ${(await info).messageId}`)
  }
  catch(err){
    console.log(`Error while sending email: ${err}`)
  }
})