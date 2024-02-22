import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalWrapperComponent } from './modal-wrapper.component';

const meta: Meta<ModalWrapperComponent> = {
  component: ModalWrapperComponent,
  title: 'ModalWrapperComponent',
};
export default meta;
type Story = StoryObj<ModalWrapperComponent>;

export const TestGrid: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/modal-wrapper works!/gi)).toBeTruthy();
  },
};
