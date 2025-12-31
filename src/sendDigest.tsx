import { Summary } from "./types/github";
import { generateGitHubDigestEmail } from "./emails/GithubDigest";
import { transporter } from "./utils/nodemailer";
import cron from "node-cron";
import { fetchRepos, getSummary } from "./controller/newsletter.controller";

export async function sendEmail() {
  const owner = "facebook";
  const cronExpressionDeploy = "30 0 * * 0"; // 11:30 AM on Sunday
  const cronExpressionTest = "*/15 * * * * *"; // Every 30 seconds

  cron.schedule(cronExpressionTest, async () => {
    const repos = await fetchRepos(owner);
    const summary: Summary[] = await getSummary(owner, repos);
    console.log(JSON.stringify(summary, null, 2));
    const data_to_send = generateGitHubDigestEmail(summary);
    try {
      const info = transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.TEST_EMAIL_RECIPIENT,
        subject: "Hello",
        html: data_to_send,
      });
      console.log(`Message sent: ${(await info).messageId}`);
    } catch (err) {
      console.log(`Error while sending email: ${err}`);
    }
  });
}
