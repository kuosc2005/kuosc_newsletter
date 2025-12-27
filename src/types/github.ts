export interface Summary {
  repo?: GithubRepo;
  commits?: Commit[];
  issues?: Issue[];
  pullrequests?: PullRequest[];
}

export interface GithubRepo {
  id: string;
  url: string;
  name: string;
  description: string;
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

export interface Issue {
  id: string;
  title: string;
  url: string;
  author: {
    login: string;
    url: string;
  };
  createdAt: string;
  comments?: {
    totalCount: number;
  };
  labels?: {
    name: string;
    color: string;
  };
}

export interface PullRequest{
  id: string,
  number: string,
  title: string,
  url: string,
  state: string,
  createdAt: string,
  mergedAt: string,
  author:{
    login: string
  }
  comments?:{
    totalCount: number
  }
  additions: number
  deletions:number
  changedFilesIfAvailable: number;
}
