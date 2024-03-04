import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  component: DividerComponent,
  title: 'DividerComponent',
};
export default meta;
type Story = StoryObj<DividerComponent>;

export const Default: Story = {
  args: {
    hasMargin: false,
  },
};
