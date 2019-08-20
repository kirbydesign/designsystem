export interface ChangelogVersion {
  name: string;
  date?: string;
  compareLink?: string;
  associatedPullRequests?: ChangelogAssociatedPullRequest[];
}

export interface ChangelogAssociatedPullRequest {
  title: string;
  closed_at: string;
  number: number;
  labels: ChangelogLabel[];
}

export interface ChangelogLabel {
  color: string;
  name: string;
}
