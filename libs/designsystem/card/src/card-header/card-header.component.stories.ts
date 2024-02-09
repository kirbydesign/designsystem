import type { Meta, StoryObj } from '@storybook/angular';

import { CardHeaderComponent } from './card-header.component';

const meta: Meta<CardHeaderComponent> = {
  component: CardHeaderComponent,
  title: 'CardHeaderComponent',
};
export default meta;
type Story = StoryObj<CardHeaderComponent>;

export const Primary: Story = {
  args: {
    title: '',
    subtitle: '',
    isTitleBold: false,
    flagged: null,
    hasPadding: true,
  },
};
