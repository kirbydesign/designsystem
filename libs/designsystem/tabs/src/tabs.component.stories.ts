import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { TabButtonComponent, TabsComponent } from '@kirbydesign/designsystem/tabs';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { responsiveModes } from 'tools/storybook-config/shared-config';
// eslint-disable-next-line no-restricted-imports
import { pseudoStatesFor } from '../../.storybook/story-helpers';

const meta: Meta<TabsComponent> = {
  component: TabsComponent,
  title: 'Components / Tabs',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
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

const tabButtonStates = [
  { state: 'default', icon: 'overview-outline' },
  { state: 'hover', icon: 'swap' },
  { state: 'active', icon: 'inbox-outline' },
  { state: 'focus-visible', icon: 'menu-no-decoration' },
  { state: 'selected', icon: 'overview-outline' },
];

const focusAndSelectTabButtons = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const tabButtons = Array.from(canvasElement.querySelectorAll('ion-tab-button'));
  await TestHelper.whenReady(tabButtons);

  canvasElement
    .querySelector('#tab-button-focus-visible ion-tab-button')
    .classList.add('ion-focused');
  canvasElement.querySelector<HTMLIonTabButtonElement>(
    '#tab-button-selected ion-tab-button'
  ).selected = true;
};

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(['tab-button'], 'ion-tab-button'),
  },
  render: () => ({
    props: { states: tabButtonStates },
    template: `
      <kirby-tab-bar>
        @for (button of states; track button.state) {
          <kirby-tab-button [attr.id]="'tab-button-' + button.state" [tab]="button.state">
            <kirby-icon [name]="button.icon"></kirby-icon>
            {{ button.state }}
          </kirby-tab-button>
        }
      </kirby-tab-bar>
    `,
  }),
  play: focusAndSelectTabButtons,
};
