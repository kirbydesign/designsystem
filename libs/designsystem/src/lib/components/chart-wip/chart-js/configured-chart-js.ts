import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../../helpers';
const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Legend);

// Global Defaults must be after register
const GLOBAL_DEFAULTS = {
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
  plugins: {
    ...Chart.defaults.plugins,
    legend: {
      ...Chart.defaults.plugins.legend,
      display: false,
    },
  },
};
// Chart.defaults is read-only hence set each property seperately
Chart.defaults.plugins = GLOBAL_DEFAULTS.plugins;
Chart.defaults.scales = GLOBAL_DEFAULTS.scales;
Chart.defaults.elements = GLOBAL_DEFAULTS.elements;
Chart.defaults.font = GLOBAL_DEFAULTS.font;

export { Chart };
