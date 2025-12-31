import { Summary } from "./types/github";
import nodemailer from "nodemailer";
import { generateGitHubDigestEmail } from "./emails/GithubDigest";

export async function sendDigestEmail(summary: Summary[]) {
  const html = generateGitHubDigestEmail(summary);
}
