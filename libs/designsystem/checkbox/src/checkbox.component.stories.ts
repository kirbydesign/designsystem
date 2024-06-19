import { type Meta, type StoryObj } from '@storybook/angular';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'Components / Checkbox',
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Checkbox: Story = {
  args: {
    checked: false,
    attentionLevel: '2',
    text: 'Label',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};
