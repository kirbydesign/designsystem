import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { LabelComponent } from '@kirbydesign/designsystem/item';
import { responsiveModes } from 'tools/storybook-config/shared-config';

const meta: Meta<LabelComponent> = {
  component: LabelComponent,
  title: 'Components / Label',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
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

export const HorizontalLabel: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `<kirby-label ${argsToTemplate(args)}><p>My Label Text that is horizontal</p><data>Value with some length</data></kirby-label>`,
  }),
};
