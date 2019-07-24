export interface GithubTag {
  commit: {
    sha: string;
    url: string;
  };
  name: string;
  node_id: string;
  tarball_url: string;
  zipball_url: string;
}

export interface GitHubCompare {
  permalink: string;
  ahead_by: number;
  base_commit: GithubCommit;
  behind_by: number;
  commits: any[];
  diff_url: string;
  files: any[];
  html_url: string;
  merge_base_commit: GithubCommit;
  patch_url: string;
  permalink_url: string;
  status: string;
  total_commits: number;
  url: string;
}

export interface GithubCommit {
  author: GithubAuthor;
  comments_url: string;
  commit: GithubCommit;
  committer: GithubComitter;
  html_url: string;
  node_id: string;
  parents: {
    html_url: string;
    sha: string;
    url: string;
  }[];
  sha: string;
  url: string;
}

export interface GithubComitter {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface GithubAuthor {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}
