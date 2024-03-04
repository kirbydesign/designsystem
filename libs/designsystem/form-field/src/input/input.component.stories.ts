import type { Meta, StoryObj } from '@storybook/angular';

import { InputComponent, InputSize } from './input.component';

type InputProps = InputComponent & { placeholder?: string };

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'InputComponent',
  argTypes: {
    maxlength: {
      control: {
        type: 'number',
      },
    },
  },
};
export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    type: '',
    size: InputSize.large,
    borderless: false,
    hasError: false,
    autocomplete: 'off',
    autocorrect: 'off',
    value: '',
    inputmode: '',
    placeholder: '',
  },
  render: (args: InputComponent) => ({
    props: args,
    template: `<input kirby-input />`,
  }),
};
