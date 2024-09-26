import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ThemeColor } from '@kirbydesign/core';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

import { BadgeExampleModule } from '~/app/examples/badge-example/badge-example.module';

type BadgeProps = BadgeComponent & {
  themeColor?: ThemeColor;
};

const meta: Meta<BadgeProps> = {
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [IconModule, BadgeExampleModule],
    }),
  ],
  title: 'Components / Badge',
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
  render: (args) => ({
    props: args,
    template: `
    <kirby-badge ${argsToTemplate(args)}></kirby-badge>`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-badge-example></cookbook-badge-example>`,
  }),
};
