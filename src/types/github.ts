export interface Summary {
  repoId: string;
  repoUrl: string;
  repoName: string;
  repoDescription?: string;

  commits?: Commit[];
  issues?: Issue[];
  pullRequests?: PullRequest[];
  generatedAt: string;
}

export interface GithubRepo {
  id: string;
  url: string;
  name: string;
  description?: string;
}

export interface Commit {
  id: string;
  oid: string;
  url: string;
  messageHeadline: string;
  additions: number;
  deletions: number;
  changedFilesIfAvailable: number;
  committedDate: string;
  author: {
    name: string;
    email: string;
    avatarUrl: string;
    user: {
      login: string;
    };
  };
}

export interface Label {
  name: string;
  color: string;
}
export interface Issue {
  id: string;
  title: string;
  url: string;
  number: number;
  author: {
    login: string;
    url: string;
    avatarUrl: string;
  };
  createdAt: string;
  comments?: {
    totalCount: number;
  };
  labels?: {
    nodes: Label[];
  };
}

export interface PullRequest {
  id: string;
  number: string;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  mergedAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  comments?: {
    totalCount: number;
  };
  mergedBy: {
    login: string;
  };
  additions: number;
  deletions: number;
  changedFiles: number;
}
