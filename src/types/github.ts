export interface Summary {
  repo?: GithubRepo;
  commits?: Commit[];
}
export interface GithubRepo {
  id: number;
  name: string;
  description: string;
}

export interface Commit {
  id: number;
  url: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  sha: string;
  message: String;
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
  files_changed: number;
}
