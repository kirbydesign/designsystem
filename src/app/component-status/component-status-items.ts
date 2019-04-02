export interface ComponentStatusItem {
  component: string;
  aliases?: string[];
  priority: number;
  ux: {
    version: number;
    status: string;
    zeplinUrl?: string;
  };
  code: {
    version: number;
    status: string;
    githubIssueNo?: number;
    cookbookUrl?: string;
    github?: string;
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
  'Under consideration' = 3,
  'Not currently planned' = 4,
  'Planned' = 1,
  'In development' = 0,
  'Ready' = 2,
}

export const componentStatusItems: ComponentStatusItem[] = [
  {
    component: 'Avatar',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/2yONGDG',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/avatar',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/avatar',
    },
  },
  {
    component: 'Badge',
    aliases: ['Beacon'],
    priority: 20,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/agzl3GD',
    },
    code: {
      version: 0.9,
      status: ItemCodeStatus.inProgress,
      githubIssueNo: 165,
    },
  },
  {
    component: 'Button',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/bPPk4ok',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/button',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/button',
    },
    children: [
      {
        component: 'Icon Button',
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
        component: 'Outline Button',
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
    component: 'Card',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/2EBLPk8',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/card',
      github: 'https://github.com/kirbydesign/designsystem/tree/master/src/kirby/components/card',
    },
  },
  {
    component: 'Charts',
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
        component: 'Donut',
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
        component: 'Pie',
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
        component: 'Area Spline',
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
        component: 'Activity Gauge',
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
    component: 'Checkbox',
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.planned,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
  },
  {
    component: 'Chip',
    aliases: ['Button', 'Compact Button', 'Tag'],
    priority: 30,
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.inProgress,
    },
  },
  {
    component: 'Floating Action Button',
    aliases: ['FAB'],
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/VqWoxg5',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.inProgress,
      cookbookUrl: 'showcase/floating-action-button',
      githubIssueNo: 171,
    },
  },
  {
    component: 'Icon',
    priority: 40,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/a7OAAWR',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.ready,
      cookbookUrl: 'showcase/icon',
    },
  },
  {
    component: 'Input',
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
    component: 'List',
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
    component: 'List Item',
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
    component: 'Menu',
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
    component: 'Modal',
    priority: 70,
    ux: {
      version: 1.0,
      status: ItemUXStatus.inProgress,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.planned,
      githubIssueNo: 111,
    },
    children: [
      {
        component: 'Full Screen Modal',
        priority: 0,
        ux: {
          version: 1.0,
          status: ItemUXStatus.planned,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.planned,
        },
      },
      {
        component: 'Popover Modal',
        priority: 0,
        ux: {
          version: 1.0,
          status: ItemUXStatus.ready,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.planned,
        },
      },
      {
        component: 'Alert Modal',
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
    component: 'Loading Indicators',
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
        component: 'Loading',
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
        component: 'Progress Bar',
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
        component: 'Skeleton Text',
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
        component: 'Spinner',
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
    component: 'Radio Button',
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
        component: 'Radio Button Group',
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
    component: 'Pull To Refresh',
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
    component: 'Reorder',
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
    component: 'Segmented Control',
    aliases: ['Segment', 'Inline Tabs', 'Button Group'],
    priority: 10,
    ux: {
      version: 1.0,
      status: ItemUXStatus.ready,
      zeplinUrl: 'https://zpl.io/2v7Evw5',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.inProgress,
    },
    children: [
      {
        component: 'Segmented Control',
        priority: 11,
        ux: {
          version: 1.0,
          status: ItemUXStatus.ready,
          zeplinUrl: 'https://zpl.io/2v7Evw5',
        },
        code: {
          version: 0.9,
          status: ItemCodeStatus.inProgress,
          githubIssueNo: 166,
        },
      },
      {
        component: 'Segmented Chip Control',
        priority: 12,
        ux: {
          version: 0.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.1,
          status: ItemCodeStatus.inProgress,
          githubIssueNo: 144,
        },
      },
    ],
  },
  {
    component: 'Tabs',
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
    component: 'Toast',
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
    component: 'Switch',
    aliases: ['Toggle'],
    priority: 0,
    ux: {
      version: 1.0,
      status: ItemUXStatus.planned,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
  },
  {
    component: 'Calendar',
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
];
