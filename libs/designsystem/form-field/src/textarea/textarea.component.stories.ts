import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  component: TextareaComponent,
  title: 'TextareaComponent',
};
export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
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
