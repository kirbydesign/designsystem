import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../helpers';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Legend);

const defaultConfig = {
  elements: {
    ...Chart.defaults.elements,
    bar: {
      ...Chart.defaults.elements.bar,
      backgroundColor: getThemeColorHexString('secondary'),
      hoverBackgroundColor: getThemeColorHexString('primary'),
    },
  },
  scales: {
    ...Chart.defaults.scales,
    linear: {
      ...Chart.defaults.scales.linear,
      display: false,
      ticks: {
        ...Chart.defaults.scales.linear.ticks,
        display: false,
      },
    },
    category: {
      ...Chart.defaults.scales.category,
      display: true,
      grid: {
        ...Chart.defaults.scales.category.grid,
        display: false,
      },
    },
  },
  font: {
    ...Chart.defaults.font,
    family: 'Roboto',
    size: parseInt(fontSize('xs')),
  },
};

// Chart.defaults is read-only hence set each property seperately
Chart.defaults.scales = defaultConfig.scales;
Chart.defaults.elements = defaultConfig.elements;
Chart.defaults.font = defaultConfig.font;

export { Chart };
