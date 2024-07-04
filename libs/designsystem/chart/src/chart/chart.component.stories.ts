import { type Meta, type StoryObj } from '@storybook/angular';

import { argsToTemplate, moduleMetadata } from '@storybook/angular';

import { ChartComponent, ChartConfigService } from '@kirbydesign/designsystem/chart';

const meta: Meta<ChartComponent> = {
  component: ChartComponent,
  title: 'Components / Chart',
  decorators: [
    moduleMetadata({
      providers: [ChartConfigService],
    }),
  ],
  render: (args: ChartComponent) => ({
    props: args,
    template: `<kirby-chart ${argsToTemplate(args)}></kirby-chart>`,
  }),
};
export default meta;
type Story = StoryObj<ChartComponent>;

export const Default: Story = {
  args: {
    type: 'column',
    data: [50, 200, 83, 102],
  },
  argTypes: {
    type: {
      options: ['line', 'column', 'bar'],
      control: { type: 'radio' },
    },
  },
};
