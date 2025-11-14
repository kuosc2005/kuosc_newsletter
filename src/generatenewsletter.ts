export function generateNewsletter(
  repos: any[],
  news: any[],
  prs: any[] // ✅ Add PRs parameter
) {
  return `
# KUOSC Weekly Newsletter

## 🔥 Latest Repositories
${repos
  .map(
    (r) => `- **[${r.name}](${r.url})** — ${r.description ?? "No description"}`
  )
  .join("\n")}

---

## 🏗 Latest Pull Requests
${
  prs.length > 0
    ? prs
        .map(
          (pr) =>
            `- **[${pr.title}](${pr.url})** by ${pr.author} in **${pr.repo}**`
        )
        .join("\n")
    : "- No open PRs at the moment."
}

---

## 📰 Open Source News
${news.map((n) => `- **[${n.title}](${n.url})**`).join("\n")}

Generated on ${new Date().toDateString()}
  `;
}
