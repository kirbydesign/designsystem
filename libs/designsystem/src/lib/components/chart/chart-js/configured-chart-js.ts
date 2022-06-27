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

import { mergeDeepAll } from '../../../helpers/merge-deep';
import MarkerPlugin from '../chart-js/chartjs-plugin-marker/chartjs-plugin-marker';
import { CHART_GLOBAL_DEFAULTS } from '../configs/global-defaults.config';

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
