import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalV2WrapperComponent } from './wrapper.component';

const meta: Meta<ModalV2WrapperComponent> = {
  component: ModalV2WrapperComponent,
  title: 'ModalV2WrapperComponent',
};
export default meta;
type Story = StoryObj<ModalV2WrapperComponent>;

export const TestGrid: Story = {
  args: {
    flavor: 'modal',
    title: '',
    hasCollapsibleTitle: true,
    scrollDisabled: false,
  },
};

export const Heading: Story = {
  args: {
    flavor: 'modal',
    title: '',
    hasCollapsibleTitle: true,
    scrollDisabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/wrapper works!/gi)).toBeTruthy();
  },
};
