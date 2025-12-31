import { Summary } from "./types/github";
import nodemailer from "nodemailer";
import { generateGitHubDigestEmail } from "./emails/GithubDigest";

export async function sendDigestEmail(summary: Summary[]) {
  const html = generateGitHubDigestEmail(summary);

  const generateTransporter = () => {
    return {
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_ACCOUNT,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };
  };

  const transporter = nodemailer.createTransport(generateTransporter());
  const mailOptions = {
    from: process.env.NODEMAILER_ACCOUNT,
    to: "uhisijan@gmail.com",
    subject: "Welcome to ConnectNow",
    html: html,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
}
