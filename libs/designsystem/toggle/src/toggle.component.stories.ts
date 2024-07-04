import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'Components / Toggle',
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Toggle: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};
