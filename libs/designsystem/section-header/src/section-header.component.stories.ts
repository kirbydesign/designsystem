import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SectionHeaderComponent } from './section-header.component';

const meta: Meta<SectionHeaderComponent> = {
  component: SectionHeaderComponent,
  title: 'SectionHeaderComponent',
};
export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/section-header works!/gi)).toBeTruthy();
  },
};
