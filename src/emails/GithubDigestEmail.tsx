import {
  Html,
  Body,
  Container,
  Section,
  Link,
  Preview,
  Head,
  Tailwind,
  Font,
  Img,
} from "@react-email/components";

import { Summary } from "../types/github";
import { formatDistanceToNow } from "date-fns";

type Props = {
  summary: Summary[];
};

export default function EmailTemplate({ summary }: Props) {
  const date = new Date(Date.now());

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const getPRStateColor = (state: string) => {
    const colors: Record<string, string> = {
      OPEN: "bg-green-100 text-green-800",
      CLOSED: "bg-red-100 text-red-800",
      MERGED: "bg-purple-100 text-purple-800",
    };
    return colors[state] || "bg-gray-100 text-gray-800";
  };

  return (
    <Html>
      <Preview>Weekly Github Digest</Preview>
      <Tailwind>
        <Head>
          <Font
            fontFamily="system-ui"
            fallbackFontFamily="sans-serif"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Body className="max-w-2xl mx-auto bg-white shadow-xl">
          {/* Email Header */}
          <Container className="mx-auto w-full max-w-[600px] p-0">
            <div
              style={{ backgroundColor: "#111827" }}
              className=" text-white p-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-white">GitHub Repository Digest</h1>
              </div>
              <p className="text-gray-300">
                Your daily update on tracked repositories
              </p>
              <div className="mt-4 text-sm text-gray-400">{formatted}</div>
            </div>
            {/* Summary Section */}

            {/* Repository Header */}

            <Container className="w-full border border-gray-200">
              {summary?.map((repo, i) => (
                <Section key={i}>
                  <Container className="p-5 border-b bg-[#F8F8F8] border-gray-200">
                    <div className="flex items-start justify-between ">
                      <div className="flex-1">
                        <Link
                          href={repo.repoName}
                          className="text-blue-600 hover:underline flex items-center gap-2 mb-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="font-mono">{repo.repoUrl}</span>
                        </Link>
                        <p className="text-gray-600 text-sm">
                          {repo.repoDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {repo.issues && repo.issues?.length > 0 && (
                        <div className="bg-orange-100 text-orange-800 inline-block px-3 py-1 rounded-full text-xs">
                          {repo.issues.length} new{" "}
                          {repo.issues.length === 1 ? "issue" : "issues"}
                        </div>
                      )}
                      {repo.pullRequests && repo.pullRequests?.length > 0 && (
                        <div className="bg-purple-100 text-purple-800 inline-block px-3 py-1 rounded-full text-xs">
                          {repo.pullRequests.length} merged{" "}
                          {repo.pullRequests.length === 1 ? "PR" : "PRs"}
                        </div>
                      )}
                      {repo.commits && repo.commits?.length > 0 && (
                        <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-xs">
                          {repo.commits.length} new{" "}
                          {repo.commits.length === 1 ? "commit" : "commits"}
                        </div>
                      )}
                    </div>
                  </Container>

                  {repo.issues && repo.issues.length > 0 && (
                    <div className="border-b border-gray-200">
                      <div className="bg-orange-50 px-5 py-2 border-b border-orange-100">
                        <p className="text-orange-900 m-2 gap-2">New Issues</p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {repo.issues.map((issue, index) => (
                          <div
                            key={index}
                            className="p-5 border-b border-blue-100 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={issue.url}
                                  className="text-gray-900 hover:text-blue-600 block mb-2"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  #{issue.number} {issue.title}
                                </Link>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  {issue.labels?.nodes.map((label, index) => (
                                    <span
                                      key={index}
                                      className={`text-black bg-[#${label.color}]/80 px-2 py-1 rounded-full text-xs inline-flex items-center gap-1`}
                                    >
                                      {label.name}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>opened by {issue.author.login}</span>
                                  <span>
                                    {formatDistanceToNow(issue.createdAt, {
                                      addSuffix: true,
                                    })}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    {issue.comments?.totalCount} comments
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {repo.pullRequests && repo.pullRequests.length > 0 && (
                    <div className="border-b border-gray-200">
                      <div className="bg-purple-50 px-5 py-2 border-b border-purple-100">
                        <p className="text-purple-900 m-2 gap-2">
                          Pull Requests
                        </p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {repo.pullRequests.map((pr, index) => (
                          <div
                            key={index}
                            className="p-5 border-b border-blue-100 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <Img
                                className="rounded-full"
                                src={pr.author?.avatarUrl}
                                width="40"
                                height="40"
                                alt={`${pr.author.login}'s profile picture`}
                              />
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={pr.url}
                                  className="text-gray-900 hover:text-blue-600 block mb-2"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  #{pr.number} {pr.title}
                                </Link>

                                <div className="flex items-center gap-2 mb-2">
                                  <span
                                    className={`${getPRStateColor(pr.state)} px-2 py-1 rounded-full text-xs capitalize`}
                                  >
                                    {pr.state}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                  <span>{pr.author.login}</span>
                                  {pr.mergedBy && (
                                    <span>
                                      <span className="text-gray-400">→</span>
                                      <span>
                                        merged by {pr.mergedBy?.login}
                                      </span>
                                    </span>
                                  )}
                                  <span className="text-gray-400">•</span>
                                  <span>
                                    {formatDistanceToNow(pr.createdAt, {
                                      addSuffix: true,
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="flex items-center gap-1 text-gray-600">
                                    {pr.changedFiles}{" "}
                                    {pr.changedFiles === 1 ? "file" : "files"}
                                  </span>
                                  <span className="flex items-center gap-1 text-green-600">
                                    + {pr.additions}
                                  </span>
                                  <span className="flex items-center gap-1 text-red-600">
                                    - {pr.deletions}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {repo.commits && repo.commits.length > 0 && (
                    <div className="border-b border-gray-200">
                      <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
                        <p className="text-blue-900 m-2 gap-2">New Commits</p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {repo.commits.map((commit, index) => (
                          <div
                            key={index}
                            className="p-5 border-b border-blue-100 hover:bg-gray-50 transition-colors"
                          >
                            {/* Commit Header */}
                            <div className="flex items-start border-blue-100 gap-3 mb-3">
                              <Img
                                className="rounded-full"
                                src={commit.author.avatarUrl}
                                width="40"
                                height="40"
                                alt={`${commit.author.user.login}'s profile picture`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-gray-900">
                                    {commit.author.user.login}
                                  </span>
                                  <span className="text-gray-400 text-sm">
                                    committed
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    {formatDistanceToNow(commit.committedDate, {
                                      addSuffix: true,
                                    })}
                                  </span>
                                </div>
                                <Link
                                  href={commit.url}
                                  className="text-gray-800 hover:text-blue-600 block mb-2"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {commit.messageHeadline}
                                </Link>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs">
                                    {commit.oid}
                                  </span>
                                  <div className="flex items-center gap-3 text-gray-600">
                                    <span className="flex items-center gap-1">
                                      {commit.changedFilesIfAvailable}{" "}
                                      {commit.changedFilesIfAvailable === 1
                                        ? "file"
                                        : "files"}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-600">
                                      + {commit.additions}
                                    </span>
                                    <span className="flex items-center gap-1 text-red-600">
                                      - {commit.deletions}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Section>
              ))}
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
