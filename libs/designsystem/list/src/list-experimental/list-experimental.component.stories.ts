import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ListExperimentalComponent } from './list-experimental.component';

const meta: Meta<ListExperimentalComponent> = {
  component: ListExperimentalComponent,
  title: 'ListExperimentalComponent',
};
export default meta;
type Story = StoryObj<ListExperimentalComponent>;

export const TestGrid: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list-experimental works!/gi)).toBeTruthy();
  },
};
