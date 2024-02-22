import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TabNavigationComponent } from './tab-navigation.component';

const meta: Meta<TabNavigationComponent> = {
  component: TabNavigationComponent,
  title: 'TabNavigationComponent',
};
export default meta;
type Story = StoryObj<TabNavigationComponent>;

export const TestGrid: Story = {
  args: {
    selectedIndex: 0,
  },
};

export const Heading: Story = {
  args: {
    selectedIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab-navigation works!/gi)).toBeTruthy();
  },
};
