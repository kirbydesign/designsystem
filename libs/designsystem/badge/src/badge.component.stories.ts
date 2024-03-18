import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ThemeColor } from '@kirbydesign/core';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from './badge.component';

type BadgeProps = BadgeComponent & {
  themeColor?: ThemeColor;
};

const meta: Meta<BadgeProps> = {
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [IconModule],
    }),
  ],
  title: 'BadgeComponent',
};
export default meta;
type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  args: {
    text: 'Badge',
  },
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
  render: (args: BadgeProps) => ({
    props: args,
    template: `
    <kirby-badge ${argsToTemplate(args)}></kirby-badge>`,
  }),
};

export const ThemeColors: Story = {
  render: () => ({
    template: `
    <kirby-badge themeColor="white">1</kirby-badge>
    <kirby-badge themeColor="success">7</kirby-badge>
    <kirby-badge themeColor="warning">99</kirby-badge>
    <kirby-badge themeColor="danger">123</kirby-badge>`,
  }),
};
