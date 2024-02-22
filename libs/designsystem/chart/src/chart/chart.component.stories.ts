import { type Meta, type StoryObj } from '@storybook/angular';

import { argsToTemplate, moduleMetadata } from '@storybook/angular';

import { ChartConfigService } from '../shared/chart-config-service/chart-config.service';
import { ChartComponent } from './chart.component';

const meta: Meta<ChartComponent> = {
  component: ChartComponent,
  title: 'ChartComponent',
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

export const TestGrid: Story = {
  args: {
    type: 'column',
    data: [50, 200, 83, 102],
  },
};
