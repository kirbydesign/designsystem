import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  component: TextareaComponent,
  title: 'TextareaComponent',
};
export default meta;
type Story = StoryObj<TextareaComponent>;

export const TestGrid: Story = {
  args: {
    value: '',
    borderless: false,
    hasError: false,
    autocomplete: 'off',
    autocorrect: 'off',
    maxlength: 0,
  },
};

export const Heading: Story = {
  args: {
    value: '',
    borderless: false,
    hasError: false,
    autocomplete: 'off',
    autocorrect: 'off',
    maxlength: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/textarea works!/gi)).toBeTruthy();
  },
};
