export interface ComponentStatusItem {
  component: string;
  code: {
    status: string;
    githubIssue: string;
  };
  ['ux & design']: {
    status: string;
    githubIssue: string;
  };
}

enum ItemCodeStatus {
  underConsideration = 'Under consideration',
  inProgress = 'In development',
  done = 'Done',
}

enum ItemUXAndDesignStatus {
  underConsideration = 'Under consideration',
  inProgress = 'In progress',
  done = 'Done',
}

export const componentStatusItems: ComponentStatusItem[] = [
  {
    component: 'Action Sheet',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Alert',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Badge',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Button',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Card',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Checkbox',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Chip',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Content',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Floating Action Button',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Icons',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Input',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Item',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'List',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Navigation',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Menu',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Modal',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Popover',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Progress Indicators',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Radio',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Refresher',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Reorder',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Routing',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Searchbar',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Segment',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Select',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Slides',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Tabs',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Toast',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Toggle',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
  {
    component: 'Toolbar',
    code: {
      status: ItemCodeStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
    ['ux & design']: {
      status: ItemUXAndDesignStatus.underConsideration,
      githubIssue: 'https://github.com/kirbydesign/designsystem/issues',
    },
  },
];
