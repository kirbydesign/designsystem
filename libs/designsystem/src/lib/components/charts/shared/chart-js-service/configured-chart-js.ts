import { mergeDeepAll } from '@kirbydesign/designsystem/helpers';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { CHART_GLOBAL_DEFAULTS } from '../chart-config-service/configs/global-defaults.config';

import MarkerPlugin from './chartjs-plugin-marker/chartjs-plugin-marker';

const CHART_SCALES = [CategoryScale, LinearScale, TimeScale];
const CHART_ELEMENTS = [BarElement, LineElement, PointElement];
const CHART_CONTROLLERS = [BarController, LineController];
const CHART_PLUGINS = [annotationPlugin, Filler, ChartDataLabels, Tooltip, MarkerPlugin].map(
  (plugin: any) => (plugin?.__esModule ? plugin.default : plugin)
);

/* Order matters; defaults must be merged after register as 
   register modifies the Chart.defaults objects */
Chart.register(Legend, ...CHART_SCALES, ...CHART_ELEMENTS, ...CHART_CONTROLLERS, ...CHART_PLUGINS);

/* Chart.defaults is read only; set each key modified in 
   CHART_GLOBAL_DEFAULTS manually */
const mergedDefaults = mergeDeepAll(Chart.defaults, CHART_GLOBAL_DEFAULTS);
Object.entries(CHART_GLOBAL_DEFAULTS).forEach(([key]) => {
  Chart.defaults[key] = mergedDefaults[key];
});

export { Chart };
