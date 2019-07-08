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

export const componentStatusItems: ComponentStatusItem[] = [
  {
    title: 'Action Sheet',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://sketch.cloud/s/pAE4G/oYz8ZKQ/play',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/action-sheet',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/modal',
      githubIssueNo: 210,
    },
  },
  {
    title: 'Avatar',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/2yONGDG',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/avatar',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/avatar',
    },
  },
  {
    title: 'Badge',
    aliases: ['Beacon'],
    priority: 20,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/agzl3GD',
    },
    code: {
      version: 0.9,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/badge',
    },
  },
  {
    title: 'Button',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/bPPk4ok',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/button',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/button',
    },
    children: [
      {
        title: 'Icon Button',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.1,
          status: ItemCodeStatus.underConsideration,
        },
      },
      {
        title: 'Outline Button',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.1,
          status: ItemCodeStatus.underConsideration,
        },
      },
    ],
  },
  {
    title: 'Card',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/2EBLPk8',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/card',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/card',
    },
  },
  {
    title: 'Charts',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 1.0,
      status: ItemCodeStatus.ready,
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/chart',
    },
    children: [
      {
        title: 'Donut',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 1.0,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/chart',
        },
      },
      {
        title: 'Pie',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 1.0,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/chart',
        },
      },
      {
        title: 'Area Spline',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 1.0,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/chart',
        },
      },
      {
        title: 'Activity Gauge',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 1.0,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/chart',
        },
      },
    ],
  },
  {
    title: 'Checkbox',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.planned,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/checkbox',
    },
  },
  {
    title: 'Chip',
    aliases: ['Button', 'Compact Button', 'Tag'],
    priority: 30,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/chip',
    },
  },
  {
    title: 'Empty State',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.8,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/empty-state',
    },
  },
  {
    title: 'Floating Action Button',
    aliases: ['FAB'],
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/VqWoxg5',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/floating-action-button',
    },
  },
  {
    title: 'Icon',
    priority: 40,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/a7OAAWR',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/icon',
    },
  },
  {
    title: 'Input',
    priority: 80,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.underConsideration,
    },
  },
  {
    title: 'List',
    priority: 50,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/list',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/list',
    },
  },
  {
    title: 'List Item',
    priority: 60,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
    },
  },
  {
    title: 'Menu',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.notCurrentlyPlanned,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.notCurrentlyPlanned,
    },
  },
  {
    title: 'Modal',
    priority: 70,
    ux: {
      version: 1.0,
      status: ItemUXStatus.inProgress,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/modal',
    },
    children: [
      {
        title: 'Full Screen Modal',
        priority: 0,
        ux: {
          version: 1.0,
          status: ItemUXStatus.planned,
        },
        code: {
          version: 0.5,
          status: ItemCodeStatus.inProgress,
          githubIssueNo: 111,
        },
      },
      {
        title: 'Popover Modal',
        priority: 0,
        ux: {
          version: 1.0,
          status: ItemUXStatus.ready,
        },
        code: {
          version: 0.5,
          status: ItemCodeStatus.inProgress,
          githubIssueNo: 111,
        },
      },
      {
        title: 'Alert Modal',
        priority: 0,
        ux: {
          version: 1.0,
          status: ItemUXStatus.ready,
          wireFrameUrl: 'https://zpl.io/blD0gze',
        },
        code: {
          version: 0.9,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/alert',
          github:
            'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/modal',
          githubIssueNo: 189,
        },
      },
    ],
  },
  {
    title: 'Loading Indicators',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.notCurrentlyPlanned,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/spinner',
      github:
        'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/spinner',
    },
    children: [
      {
        title: 'Loading',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.notCurrentlyPlanned,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.notCurrentlyPlanned,
        },
      },
      {
        title: 'Progress Bar',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.notCurrentlyPlanned,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.notCurrentlyPlanned,
        },
      },
      {
        title: 'Skeleton Text',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.notCurrentlyPlanned,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.underConsideration,
        },
      },
      {
        title: 'Spinner',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.1,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/spinner',
        },
      },
    ],
  },
  {
    title: 'Radio Button',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.planned,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
    children: [
      {
        title: 'Radio Button Group',
        priority: 0,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.underConsideration,
        },
      },
    ],
  },
  {
    title: 'Pull To Refresh',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.underConsideration,
    },
  },
  {
    title: 'Reorder',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.notCurrentlyPlanned,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.notCurrentlyPlanned,
    },
  },
  {
    title: 'Segmented Control',
    aliases: ['Segment', 'Inline Tabs', 'Button Group'],
    priority: 10,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      wireFrameUrl: 'https://zpl.io/2v7Evw5',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.ready,
    },
    children: [
      {
        title: 'Segmented Control',
        priority: 11,
        ux: {
          version: 1.0,
          status: ItemUXStatus.ready,
          wireFrameUrl: 'https://zpl.io/2v7Evw5',
        },
        code: {
          version: 0.9,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/segmented-control',
        },
      },
      {
        title: 'Segmented Chip Control',
        priority: 12,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.1,
          status: ItemCodeStatus.ready,
          cookbookUrl: 'showcase/segmented-chip-control',
        },
      },
    ],
  },
  {
    title: 'Tabs',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.underConsideration,
    },
  },
  {
    title: 'Toast',
    priority: 0,
    ux: {
      version: 0.0,
      status: ItemUXStatus.notCurrentlyPlanned,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/toast',
    },
  },
  {
    title: 'Toggle',
    aliases: ['Switch'],
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.planned,
      wireFrameUrl: 'https://zpl.io/beKAX3B',
    },
    code: {
      version: 0.9,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/toggle',
    },
  },
  {
    title: 'Calendar',
    priority: 0,
    ux: {
      version: 0.9,
      status: ItemUXStatus.planned,
      wireFrameUrl: 'https://sketch.cloud/s/7bga2/Gmlbp2Y',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.inProgress,
      githubIssueNo: 238,
    },
  },
];
