import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import {
  TabNavigationComponent,
  TabNavigationModule,
} from '@kirbydesign/designsystem/tab-navigation';

const meta: Meta<TabNavigationComponent> = {
  component: TabNavigationComponent,
  title: 'Components / Page / Tab Navigation',
  decorators: [
    moduleMetadata({
      imports: [TabNavigationModule, IconModule, BadgeComponent],
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
