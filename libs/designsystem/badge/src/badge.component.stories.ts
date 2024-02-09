import type { Meta, StoryObj } from '@storybook/angular';

import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  component: BadgeComponent,
  title: 'BadgeComponent',
};
export default meta;
type Story = StoryObj<BadgeComponent>;

export const Primary: Story = {
  args: {
    text: '',
    size: 'md',
  },
};
