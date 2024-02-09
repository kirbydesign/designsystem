import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TabsComponent } from './tabs.component';

const meta: Meta<TabsComponent> = {
  component: TabsComponent,
  title: 'TabsComponent',
};
export default meta;
type Story = StoryObj<TabsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tabs works!/gi)).toBeTruthy();
  },
};
