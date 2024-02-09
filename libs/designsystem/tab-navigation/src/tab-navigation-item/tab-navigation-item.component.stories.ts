import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TabNavigationItemComponent } from './tab-navigation-item.component';

const meta: Meta<TabNavigationItemComponent> = {
  component: TabNavigationItemComponent,
  title: 'TabNavigationItemComponent',
};
export default meta;
type Story = StoryObj<TabNavigationItemComponent>;

export const Primary: Story = {
  args: {
    label: '',
  },
};

export const Heading: Story = {
  args: {
    label: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab-navigation-item works!/gi)).toBeTruthy();
  },
};
