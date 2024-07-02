import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from '@kirbydesign/designsystem/form-field';

const meta: Meta<TextareaComponent> = {
  component: TextareaComponent,
  title: 'Components / FormField / Standalone / Textarea',
};
export default meta;
type Story = StoryObj<TextareaComponent>;

export const Textarea: Story = {
  args: {
    value: '',
    borderless: false,
    hasError: false,
    autocomplete: 'off',
    autocorrect: 'off',
  },
  argTypes: {
    maxlength: {
      control: {
        type: 'number',
      },
    },
  },
};
