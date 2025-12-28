import fs from "fs";
import path from "path";
import { render } from "@react-email/render";
import { Summary } from "./types/github";
import EmailTemplate from "./emails/GithubDigestEmail";

export async function sendDigestEmail(summary: Summary[]) {
  const html = await render(<EmailTemplate summary={summary} />);
  const filePath = path.join(process.cwd(), "preview.html");
  fs.writeFileSync(filePath, html);
}
