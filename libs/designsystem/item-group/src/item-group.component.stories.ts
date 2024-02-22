import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ItemGroupComponent } from './item-group.component';

const meta: Meta<ItemGroupComponent> = {
  component: ItemGroupComponent,
  title: 'ItemGroupComponent',
};
export default meta;
type Story = StoryObj<ItemGroupComponent>;

export const TestGrid: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/item-group works!/gi)).toBeTruthy();
  },
};
