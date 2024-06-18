import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'ToggleComponent',
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};
