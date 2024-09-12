import type { Meta, StoryObj } from '@storybook/angular';

import { InputComponent, InputSize } from '@kirbydesign/designsystem/form-field';

type InputProps = InputComponent & { placeholder?: string };

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'Components / FormField / Standalone /Input',
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

export const Input: Story = {
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
