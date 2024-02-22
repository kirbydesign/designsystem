import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalCompactWrapperComponent } from './modal-compact-wrapper.component';

const meta: Meta<ModalCompactWrapperComponent> = {
  component: ModalCompactWrapperComponent,
  title: 'ModalCompactWrapperComponent',
};
export default meta;
type Story = StoryObj<ModalCompactWrapperComponent>;

export const TestGrid: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/modal-compact-wrapper works!/gi)).toBeTruthy();
  },
};
