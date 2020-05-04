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
  url: string;
  html_url: string;
  permalink_url: string;
  diff_url: string;
  patch_url: string;
  base_commit: GithubCommit;
  ahead_by: number;
  behind_by: number;
  commits: any[];
  files: any[];
  merge_base_commit: GithubCommit;
  status: string;
  total_commits: number;
}

export interface GithubCommit {
  sha: string;
  node_id: string;
  commit: GithubCommit;
  author: GithubAuthor;
  comments_url: string;
  committer: GithubComitter;
  html_url: string;
  parents: {
    html_url: string;
    sha: string;
    url: string;
  }[];
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
