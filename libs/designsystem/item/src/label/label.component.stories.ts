import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { LabelComponent } from '@kirbydesign/designsystem/item';

const meta: Meta<LabelComponent> = {
  component: LabelComponent,
  title: 'Components / Label',
};
export default meta;
type Story = StoryObj<LabelComponent>;

export const Label: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `<kirby-label ${argsToTemplate(args)}>Label</kirby-label>`,
  }),
};
