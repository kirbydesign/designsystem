import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ListHeaderComponent } from './list-header.component';

const meta: Meta<ListHeaderComponent> = {
  component: ListHeaderComponent,
  title: 'ListHeaderComponent',
};
export default meta;
type Story = StoryObj<ListHeaderComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list-header works!/gi)).toBeTruthy();
  },
};
