import { githubClient } from "../utils/client";
import { ISSUE_QUERY } from "../api/issues";
import { PR_QUERY } from "../api/pull_requests";


export async function getIssueData(owner: string, name: string){
    const data = await githubClient.request(ISSUE_QUERY, {owner, name})
    return data
}

export async function getPRData(owner: string, name: string){
    const data = await githubClient.request(PR_QUERY, {owner, name})

    return data
}