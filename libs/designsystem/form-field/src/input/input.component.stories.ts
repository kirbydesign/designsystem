import type { Meta, StoryObj } from '@storybook/angular';

import { InputComponent, InputSize } from './input.component';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'InputComponent',
};
export default meta;
type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  args: {
    type: '',
    size: InputSize.large,
    borderless: false,
    hasError: false,
    autocomplete: 'off',
    autocorrect: 'off',
    value: '',
    maxlength: 0,
    inputmode: '',
  },
};
