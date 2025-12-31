import { Summary, Commit, Issue, PullRequest } from "../types/github";
import { formatDistanceToNow } from "date-fns";

export function generateGitHubDigestEmail(repos: Summary[]) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const generateCommitHTML = (commit: Commit) => `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 20px; border-bottom: 1px solid #f3f4f6;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 12px; vertical-align: top;">
                <img src="${commit.author.avatarUrl}" width="40" height="40" style="border-radius: 50%; display: block;" alt="${commit.author.user.login}">
              </td>
              <td style="vertical-align: top;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151;">
                  <strong>${commit.author.user.login}</strong>
                  <span style="color: #9ca3af;">committed</span>
                  <span style="color: #6b7280;">${formatDistanceToNow(
                    new Date(commit.committedDate),
                    {
                      addSuffix: true,
                    },
                  )}</span>
                </p>
                <a href="${commit.url}" style="color: #1f2937; text-decoration: none; display: block; margin-bottom: 8px; font-size: 14px;">
                  ${commit.messageHeadline}
                </a>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 11px; color: #6b7280;">
                      ${commit.oid.substring(0, 8)}
                    </td>
                    <td style="padding-left: 12px; font-size: 13px; color: #6b7280;">
                      ${commit.changedFilesIfAvailable} ${commit.changedFilesIfAvailable === 1 ? "file" : "files"}
                    </td>
                    <td style="padding-left: 12px; font-size: 13px; color: #059669;">
                      +${commit.additions}
                    </td>
                    <td style="padding-left: 8px; font-size: 13px; color: #dc2626;">
                      -${commit.deletions}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const generateIssueHTML = (issue: Issue) => `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 20px; border-bottom: 1px solid #f3f4f6;">
          <a href="${issue.url}" style="color: #1f2937; text-decoration: none; display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
            #${issue.number} ${issue.title}
          </a>
          ${
            issue.labels && issue.labels.nodes && issue.labels.nodes.length > 0
              ? `
            <div style="margin-bottom: 8px;">
              ${issue.labels.nodes
                .map(
                  (label) => `
                <span style="display: inline-block; background-color: #${label.color}; color: #000; padding: 2px 8px; border-radius: 12px; font-size: 11px; margin-right: 4px;">
                  ${label.name}
                </span>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          <p style="margin: 0; font-size: 13px; color: #6b7280;">
            opened by ${issue.author.login} • 
            ${formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })} •
            ${issue.comments?.totalCount || 0} comments
          </p>
        </td>
      </tr>
    </table>
  `;

  const generatePRHTML = (pr: PullRequest) => `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 20px; border-bottom: 1px solid #f3f4f6;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 12px; vertical-align: top;">
                <img src="${pr.author?.avatarUrl}" width="40" height="40" style="border-radius: 50%; display: block;" alt="${pr.author.login}">
              </td>
              <td style="vertical-align: top;">
                <a href="${pr.url}" style="color: #1f2937; text-decoration: none; display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">
                  #${pr.number} ${pr.title}
                </a>
                <span style="display: inline-block; background-color: ${pr.state === "MERGED" ? "#f3e8ff" : pr.state === "OPEN" ? "#dcfce7" : "#fee2e2"}; color: ${pr.state === "MERGED" ? "#7c3aed" : pr.state === "OPEN" ? "#16a34a" : "#dc2626"}; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin-bottom: 8px; text-transform: capitalize;">
                  ${pr.state.toLowerCase()}
                </span>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">
                  ${pr.author.login} ${pr.mergedBy ? `→ merged by ${pr.mergedBy.login}` : ""} • ${formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
                </p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 13px; color: #6b7280;">
                      ${pr.changedFiles} ${pr.changedFiles === 1 ? "file" : "files"}
                    </td>
                    <td style="padding-left: 12px; font-size: 13px; color: #059669;">
                      +${pr.additions}
                    </td>
                    <td style="padding-left: 8px; font-size: 13px; color: #dc2626;">
                      -${pr.deletions}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const generateRepoHTML = (repo: Summary) => {
    const badges = [];
    if (repo.issues && repo.issues.length > 0) {
      badges.push(
        `<span style="background-color: #fed7aa; color: #9a3412; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 500; display: inline-block; margin-right: 8px; margin-top: 4px;">${repo.issues.length} new ${repo.issues.length === 1 ? "issue" : "issues"}</span>`,
      );
    }
    if (repo.pullRequests && repo.pullRequests.length > 0) {
      badges.push(
        `<span style="background-color: #e9d5ff; color: #7c3aed; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 500; display: inline-block; margin-right: 8px; margin-top: 4px;">${repo.pullRequests.length} ${repo.pullRequests.length === 1 ? "PR" : "PRs"}</span>`,
      );
    }
    if (repo.commits && repo.commits.length > 0) {
      badges.push(
        `<span style="background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 500; display: inline-block; margin-right: 8px; margin-top: 4px;">${repo.commits.length} new ${repo.commits.length === 1 ? "commit" : "commits"}</span>`,
      );
    }

    return `
      <tr>
        <td style="padding: 0; border: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <!-- Repo Header -->
            <tr>
              <td style="background-color: #f8f8f8; padding: 20px; border-bottom: 1px solid #e5e7eb;">
                <a href="${repo.repoUrl}" style="color: #2563eb; text-decoration: none; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 500;">${repo.repoUrl.replace("https://github.com/", "")}</a>
                <p style="margin: 8px 0 12px 0; color: #6b7280; font-size: 14px;">${repo.repoDescription || ""}</p>
                <div>${badges.join("")}</div>
              </td>
            </tr>

            ${
              repo.issues && repo.issues.length > 0
                ? `
              <tr>
                <td style="padding: 0; border-bottom: 1px solid #e5e7eb;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color: #fff7ed; padding: 12px 20px; border-bottom: 1px solid #fed7aa;">
                        <p style="margin: 0; color: #9a3412; font-weight: 600; font-size: 14px;">New Issues</p>
                      </td>
                    </tr>
                  </table>
                  ${repo.issues.map(generateIssueHTML).join("")}
                </td>
              </tr>
            `
                : ""
            }

            ${
              repo.pullRequests && repo.pullRequests.length > 0
                ? `
              <tr>
                <td style="padding: 0; border-bottom: 1px solid #e5e7eb;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color: #faf5ff; padding: 12px 20px; border-bottom: 1px solid #e9d5ff;">
                        <p style="margin: 0; color: #6b21a8; font-weight: 600; font-size: 14px;">Pull Requests</p>
                      </td>
                    </tr>
                  </table>
                  ${repo.pullRequests.map(generatePRHTML).join("")}
                </td>
              </tr>
            `
                : ""
            }

            ${
              repo.commits && repo.commits.length > 0
                ? `
              <tr>
                <td style="padding: 0; border-bottom: 1px solid #e5e7eb;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color: #eff6ff; padding: 12px 20px; border-bottom: 1px solid #bfdbfe;">
                        <p style="margin: 0; color: #1e3a8a; font-weight: 600; font-size: 14px;">New Commits</p>
                      </td>
                    </tr>
                  </table>
                  ${repo.commits.map(generateCommitHTML).join("")}
                </td>
              </tr>
            `
                : ""
            }
          </table>
        </td>
      </tr>
    `;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Repository Digest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #111827; padding: 32px; color: #ffffff;">
                            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600;">GitHub Repository Digest</h1>
                            <p style="margin: 0 0 16px 0; color: #d1d5db; font-size: 14px;">Your daily update on tracked repositories</p>
                            <p style="margin: 0; color: #9ca3af; font-size: 13px;">${currentDate}</p>
                        </td>
                    </tr>

                    <!-- Repository Sections -->
                    ${repos.map(generateRepoHTML).join("")}

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                Generated by GitHub Digest Tool
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
