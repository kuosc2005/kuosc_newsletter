export interface Summary {
  repo?: GithubRepo;
  commits?: Commit[];
}

export interface GithubRepo {
  id: string;
  name: string;
  description: string;
  defaultBranchRef?: {
    target: {
      history: {
        nodes: Commit[];
      };
    };
  };
}

export interface Commit {
  id: string;
  oid: string;
  url: string;
  message: string;
  additions: number;
  deletions: number;
  changedFilesIfAvailable: number;
  committedDate: string;
  author: {
    name: string;
    email: string;
    user?: {
      login: string;
    };
  };
}
