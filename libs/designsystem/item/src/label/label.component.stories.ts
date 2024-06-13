import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { LabelComponent } from '@kirbydesign/designsystem/item';

const meta: Meta<LabelComponent> = {
  component: LabelComponent,
  title: 'LabelComponent',
};
export default meta;
type Story = StoryObj<LabelComponent>;

export const Default: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args: LabelComponent) => ({
    props: args,
    template: `<kirby-label ${argsToTemplate(args)}>Label</kirby-label>`,
  }),
};
