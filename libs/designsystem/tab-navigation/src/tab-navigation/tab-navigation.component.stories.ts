import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CardComponent } from '@kirbydesign/designsystem/card';
import {
  TabNavigationComponent,
  TabNavigationItemComponent,
} from '@kirbydesign/designsystem/tab-navigation';

// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../../.storybook/story-helpers';

const meta: Meta<TabNavigationComponent> = {
  component: TabNavigationComponent,
  title: 'Components / Page / Tab Navigation',
  decorators: [
    moduleMetadata({
      imports: [
        TabNavigationComponent,
        TabNavigationItemComponent,
        IconComponent,
        BadgeComponent,
        CardComponent,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TabNavigationComponent>;

export const TabNavigation: Story = {
  args: {
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `<kirby-tab-navigation ${argsToTemplate(args)}>
    <kirby-tab-navigation-item
      label="Item 1">
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="Item 2">
      <kirby-badge themeColor="warning">
        <kirby-icon name="attach">
        </kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="Item 3">
    </kirby-tab-navigation-item>
  </kirby-tab-navigation>`,
  }),
};

const tabNavigationStates = ['default', 'hover', 'focus-visible', 'selected'];

export const InteractionStates: Story = {
  parameters: {
    // The item forwards its id to its tab button
    pseudo: pseudoStatesFor(idsOnSurfaces('tab-navigation', ['item'])),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    <kirby-tab-navigation [selectedIndex]="states.indexOf('selected')">
      @for (state of states; track state) {
        <kirby-tab-navigation-item
          [attr.id]="'tab-navigation-' + surface + '-item-' + state"
          [label]="state"
        ></kirby-tab-navigation-item>
      }
    </kirby-tab-navigation>
  `,
    'max-content',
    { states: tabNavigationStates },
    { stacked: true }
  ),
};
