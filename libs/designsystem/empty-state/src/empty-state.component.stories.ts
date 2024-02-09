import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { EmptyStateComponent } from './empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  component: EmptyStateComponent,
  title: 'EmptyStateComponent',
};
export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const Primary: Story = {
  args: {
    iconName: '',
    customIconName: '',
    title: '',
    subtitle: '',
  },
};

export const Heading: Story = {
  args: {
    iconName: '',
    customIconName: '',
    title: '',
    subtitle: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/empty-state works!/gi)).toBeTruthy();
  },
};
