import { getPRData, getIssueData } from "../services/newsletter.service";

export async function fetchData(owner: string, name: string) {
  const [issues, pullRequests] = await Promise.all([
    getIssueData(owner, name),
    getPRData(owner, name),
  ]);

  return {
    repository: `${owner}/${name}`,
    generatedAt: new Date().toISOString(),
    issues,
    pullRequests
};

}


