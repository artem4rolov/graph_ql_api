export type RepoType = {
  id: string;
  name: string;
  stargazerCount: number;
  url: string;
  updatedAt: Date;
};

export type PaginationType = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
};

export type CurrentRepoType = {
  id: string;
  description: string;
  languages: [string];
  name: string;
  owner: [string];
  stargazerCount: number;
};
