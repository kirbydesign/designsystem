export interface ComponentStatusItem {
  title: string;
  parentTitle?: string;
  aliases?: string[];
  priority?: number;
  ux: {
    version?: number;
    status: string;
    wireFrameUrl?: string;
  };
  code: {
    version?: number;
    status: string;
    githubIssueNo?: number;
    cookbookUrl?: string;
    github?: string;
    enhancements?: ComponentStatusItem[];
  };
  children?: ComponentStatusItem[];
}

export enum ItemUXStatus {
  underConsideration = 'Under consideration',
  notCurrentlyPlanned = 'Not currently planned',
  planned = 'Planned',
  inProgress = 'In progress',
  ready = 'Ready',
}

export enum ItemCodeStatus {
  underConsideration = 'Under consideration',
  notCurrentlyPlanned = 'Not currently planned',
  planned = 'Planned',
  inProgress = 'In development',
  ready = 'Ready',
}

export enum ItemCodeStatusOrder {
  'Ready' = 0,
  'In development' = 1,
  'Planned' = 2,
  'Under consideration' = 3,
  'Not currently planned' = 4,
}
