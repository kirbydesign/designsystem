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
    component: 'Badge',
    aliases: ['Beacon'],
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
    component: 'Button',
    ux: {
      version: 1.0,
      status: ItemUXStatus.done,
    },
    code: {
      version: 0.5,
      status: ItemCodeStatus.done,
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
