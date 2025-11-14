import axios from "axios";

interface PR {
  repo: string;
  title: string;
  url: string;
  author: string;
  created: string;
}

export async function fetchLatestPRsFromOrg(org: string): Promise<PR[]> {
  try {
    // 1️⃣ Fetch all repos in the organization
    const reposRes = await axios.get(
      `https://api.github.com/orgs/${org}/repos`
    );
    const repos = reposRes.data;

    const latestPRs: PR[] = [];

    // 2️⃣ Loop through each repo and fetch the latest open PR
    for (const repo of repos) {
      try {
        const prsRes = await axios.get(
          `https://api.github.com/repos/${org}/${repo.name}/pulls?state=open&sort=created&direction=desc`
        );

        const prs = prsRes.data;
        if (prs.length > 0) {
          const pr = prs[0]; // Take only the latest PR per repo
          latestPRs.push({
            repo: repo.name,
            title: pr.title,
            url: pr.html_url,
            author: pr.user.login,
            created: pr.created_at,
          });
        }
      } catch (err: any) {
        console.warn(`❌ Failed to fetch PRs for ${repo.name}:`, err.message);
      }
    }

    // 3️⃣ Sort globally by creation date descending
    latestPRs.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );

    return latestPRs;
  } catch (err: any) {
    console.error(
      "❌ Failed to fetch repos:",
      err.response?.data || err.message
    );
    return [];
  }
}
