import fs from "fs";
import path from "path";
import { render } from "@react-email/render";
import { GitHubDigestEmail } from "./emails/GithubDigestEmail";
import { Summary } from "./types/github";

export async function sendDigestEmail(summary: Summary[]) {
  const html = await render(<GitHubDigestEmail summary={summary} />);
  const filePath = path.join(process.cwd(), "preview.html");
  fs.writeFileSync(filePath, html);
}
