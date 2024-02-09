import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ListSectionHeaderComponent } from './list-section-header.component';

const meta: Meta<ListSectionHeaderComponent> = {
  component: ListSectionHeaderComponent,
  title: 'ListSectionHeaderComponent',
};
export default meta;
type Story = StoryObj<ListSectionHeaderComponent>;

export const Primary: Story = {
  args: {
    title: '',
  },
};

export const Heading: Story = {
  args: {
    title: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list-section-header works!/gi)).toBeTruthy();
  },
};
