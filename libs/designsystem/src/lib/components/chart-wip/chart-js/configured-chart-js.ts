import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import { ColorHelper, DesignTokenHelper } from '../../../helpers';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

const CHART_SCALES = [CategoryScale, LinearScale];
const CHART_ELEMENTS = [BarElement, LineElement, PointElement];
const CHART_CONTROLLERS = [BarController, LineController];
const CHART_PLUGINS = [annotationPlugin];

Chart.register(Legend, ...CHART_SCALES, ...CHART_ELEMENTS, ...CHART_CONTROLLERS, ...CHART_PLUGINS);

// Global Defaults must be after register
export const GLOBAL_DEFAULTS = {
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
Chart.defaults.maintainAspectRatio = false;

export { Chart };
