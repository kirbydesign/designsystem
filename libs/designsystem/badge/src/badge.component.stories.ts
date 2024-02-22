import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

import { ThemeColor } from '@kirbydesign/core';
import { BadgeComponent } from './badge.component';

type BadgeProps = BadgeComponent & { themeColor?: ThemeColor };

const meta: Meta<BadgeComponent> = {
  component: BadgeComponent,
  title: 'BadgeComponent',
};
export default meta;
type Story = StoryObj<BadgeProps>;

export const TestGrid: Story = {
  argTypes: {
    themeColor: {
      options: ['white', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
  },
  args: {
    text: '',
    size: 'md',
  },
  render: ({ themeColor, ...args }) => ({
    props: args,
    template: `
    <div class="test-row" title="Defaults (interactive)">
      <kirby-badge ${argsToTemplate(args)} themeColor="${themeColor}">1</kirby-badge>
    </div>

    <div class="test-row" title="ThemeColor">
      <kirby-badge themeColor="white">1</kirby-badge>
      <kirby-badge themeColor="success">7</kirby-badge>
      <kirby-badge themeColor="warning">99</kirby-badge>
      <kirby-badge themeColor="danger">123</kirby-badge>
    </div>
    
    <div class="test-row" title="Size">
      <kirby-badge size="sm">99</kirby-badge>
      <kirby-badge size="md">99</kirby-badge>
    </div>`,
  }),
};
