import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormFieldMessageComponent } from './form-field-message.component';

const meta: Meta<FormFieldMessageComponent> = {
  component: FormFieldMessageComponent,
  title: 'FormFieldMessageComponent',
};
export default meta;
type Story = StoryObj<FormFieldMessageComponent>;

export const TestGrid: Story = {
  args: {
    text: '',
    position: 'left',
  },
};

export const Heading: Story = {
  args: {
    text: '',
    position: 'left',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form-field-message works!/gi)).toBeTruthy();
  },
};
