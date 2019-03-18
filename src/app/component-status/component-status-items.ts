export interface ComponentStatusItem {
  component: string;
  aliases?: string[];
  ux: {
    version: number;
    status: string;
    zeplinUrl?: string;
  };
  code: {
    version: number;
    status: string;
    githubIssue?: string;
    cookbookUrl?: string;
  };
  children?: ComponentStatusItem[];
}

enum ItemUXStatus {
  underConsideration = 'Under consideration',
  notCurrentlyPlanned = 'Not currently planned',
  planned = 'Planned',
  inProgress = 'In progress',
  done = 'Done',
}

enum ItemCodeStatus {
  underConsideration = 'Under consideration',
  notCurrentlyPlanned = 'Not currently planned',
  planned = 'Planned',
  inProgress = 'In development',
  done = 'Done',
}

export const componentStatusItems: ComponentStatusItem[] = [
  {
    component: 'Avatar',
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/2yONGDG',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.done,
      cookbookUrl: 'showcase/avatar',
    },
  },
  {
    component: 'Badge',
    aliases: ['Beacon'],
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/agzl3GD',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
  },
  {
    component: 'Button',
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/bPPk4ok',
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.done,
      cookbookUrl: 'showcase/button',
    },
    children: [
      {
        component: 'Icon Button',
        ux: {
          version: 1.0,
          status: ItemUXStatus.underConsideration,
        },
        code: {
          version: 0.1,
          status: ItemCodeStatus.underConsideration,
        },
      },
      {
        component: 'Outline Button',
        ux: {
          version: 1.0,
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
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/2EBLPk8',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.done,
      cookbookUrl: 'showcase/card',
    },
  },
  {
    component: 'Checkbox',
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
    ux: {
      version: 1.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.underConsideration,
    },
  },
  {
    component: 'Floating Action Button',
    aliases: ['FAB'],
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/VqWoxg5',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
  },
  {
    component: 'Icon',
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/a7OAAWR',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
  },
  {
    component: 'List',
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.done,
      cookbookUrl: 'showcase/list',
    },
  },
  {
    component: 'List Item',
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.done,
    },
  },
  {
    component: 'Menu',
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
    ux: {
      version: 1.0,
      status: ItemUXStatus.inProgress,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.planned,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues/111',
    },
    children: [
      {
        component: 'Full Screen Modal',
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
        ux: {
          version: 1.0,
          status: ItemUXStatus.done,
        },
        code: {
          version: 0.0,
          status: ItemCodeStatus.planned,
        },
      },
      {
        component: 'Alert Modal',
        ux: {
          version: 1.0,
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
    component: 'Spinner',
    aliases: ['Progress Indicator'],
    ux: {
      version: 0.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.done,
      cookbookUrl: 'showcase/spinner',
    },
  },
  {
    component: 'Radio Button',
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
        ux: {
          version: 1.0,
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
    ux: {
      version: 1.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.underConsideration,
    },
  },
  {
    component: 'Reorder',
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
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
      zeplinUrl: 'https://zpl.io/a7OXP4v',
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.inProgress,
    },
  },
  {
    component: 'Tabs',
    ux: {
      version: 1.0,
      status: ItemUXStatus.underConsideration,
    },
    code: {
      version: 0.0,
      status: ItemCodeStatus.underConsideration,
    },
  },
  {
    component: 'Toast',
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
    ux: {
      version: 1.0,
      status: ItemUXStatus.planned,
    },
    code: {
      version: 0.1,
      status: ItemCodeStatus.planned,
    },
  },
];
