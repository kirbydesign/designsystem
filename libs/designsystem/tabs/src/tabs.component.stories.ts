import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { TabButtonComponent, TabsComponent } from '@kirbydesign/designsystem/tabs';

import { responsiveModes } from 'tools/storybook-config/shared-config';

const meta: Meta<TabsComponent> = {
  component: TabsComponent,
  title: 'Components / Tabs',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
  decorators: [
    moduleMetadata({
      imports: [
        TabsComponent,
        TabButtonComponent,
        IconComponent,
        BadgeComponent,
        ThemeColorDirective,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <kirby-tab-bar>
        <kirby-tab-button tab="overview">
          <kirby-icon name="overview-outline"></kirby-icon>
          Overview
        </kirby-tab-button>

        <kirby-tab-button tab="transfer">
          <kirby-icon name="swap"></kirby-icon>
          Transfer
        </kirby-tab-button>

        <kirby-tab-button tab="inbox">
          <kirby-icon name="inbox-outline"></kirby-icon>
          Inbox
        </kirby-tab-button>

        <kirby-tab-button tab="menu">
          <kirby-icon name="menu-no-decoration"></kirby-icon>
          Menu
        </kirby-tab-button>
      </kirby-tab-bar>
    `,
  }),
};

export const WithBadge: Story = {
  render: () => ({
    template: `
      <kirby-tab-bar>
        <kirby-tab-button tab="overview">
          <kirby-icon name="overview-outline"></kirby-icon>
          Overview
          <kirby-badge>99</kirby-badge>
        </kirby-tab-button>

        <kirby-tab-button tab="transfer">
          <kirby-icon name="swap"></kirby-icon>
          Transfer
          <kirby-badge themeColor="success">99</kirby-badge>
        </kirby-tab-button>

        <kirby-tab-button tab="inbox">
          <kirby-icon name="inbox-outline"></kirby-icon>
          Inbox
          <kirby-badge themeColor="warning">99</kirby-badge>
        </kirby-tab-button>

        <kirby-tab-button tab="menu">
          <kirby-icon name="menu-no-decoration"></kirby-icon>
          Menu
          <kirby-badge themeColor="danger">99</kirby-badge>
        </kirby-tab-button>
      </kirby-tab-bar>
    `,
  }),
};
