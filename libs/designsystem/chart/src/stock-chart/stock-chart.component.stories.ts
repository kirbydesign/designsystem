import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { argsToTemplate } from '@storybook/angular';

import {
  ChartConfigService,
  ChartDataLabelOptions,
  StockChartComponent,
} from '@kirbydesign/designsystem/chart';
import { ColorHelper } from '@kirbydesign/designsystem/helpers';

const { getThemeColorHexString } = ColorHelper;

const chartDataLabelOptions: ChartDataLabelOptions = {
  locale: 'da-DK',
  valueSuffix: '%',
};

const _datasets = [
  {
    data: [
      { x: 1628294399000, y: 49.8 },
      { x: 1628553599000, y: 49.6 },
      { x: 1628639999000, y: 49.6 },
      { x: 1628726399000, y: 49.6 },
    ],
    borderColor: getThemeColorHexString('secondary'),
  },
  {
    data: [
      { x: 1628294399000, y: 49.8 },
      { x: 1628553599000, y: 69.6 },
      { x: 1628639999000, y: 39.6 },
      { x: 1628726399000, y: 69.6 },
    ],
    borderColor: getThemeColorHexString('primary'),
  },
  {
    data: [
      { x: 1628294399000, y: 49.8 },
      { x: 1628553599000, y: 59.6 },
      { x: 1628639999000, y: 69.6 },
      { x: 1628726399000, y: -49.6 },
    ],
    borderColor: getThemeColorHexString('semi-dark'),
  },
];

const meta: Meta<StockChartComponent> = {
  component: StockChartComponent,
  title: 'Components / Chart / Stock Chart',
  decorators: [
    moduleMetadata({
      providers: [ChartConfigService],
    }),
  ],
  render: (args: StockChartComponent) => ({
    props: args,
    template: `<kirby-stock-chart ${argsToTemplate(args)}></kirby-stock-chart>`,
  }),
};
export default meta;
type Story = StoryObj<StockChartComponent>;

export const StockChart: Story = {
  args: {
    data: _datasets,
    dataLabelOptions: chartDataLabelOptions,
  },
};
