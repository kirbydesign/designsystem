import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from '@kirbydesign/designsystem/divider';

const meta: Meta<DividerComponent> = {
  component: DividerComponent,
  title: 'Components / Divider',
};
export default meta;
type Story = StoryObj<DividerComponent>;

export const Divider: Story = {
  args: {
    hasMargin: false,
  },
};
