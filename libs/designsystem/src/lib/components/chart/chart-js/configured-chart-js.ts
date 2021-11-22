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
  registerables,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { mergeDeepAll } from '../../../helpers/merge-deep';
import { CHART_GLOBAL_DEFAULTS } from '../configs/global-defaults.config';

const CHART_SCALES = [CategoryScale, LinearScale];
const CHART_ELEMENTS = [BarElement, LineElement, PointElement];
const CHART_CONTROLLERS = [BarController, LineController];
const CHART_PLUGINS = [annotationPlugin, Filler, ChartDataLabels, CrosshairPlugin];

/* Order matters; defaults must be merged after register as 
   register modifies the Chart.defaults objects */
Chart.register(
  ...registerables,
  Legend,
  ...CHART_SCALES,
  ...CHART_ELEMENTS,
  ...CHART_CONTROLLERS,
  ...CHART_PLUGINS
);

/* Chart.defaults is read only; set each key modified in 
   CHART_GLOBAL_DEFAULTS manually */
const mergedDefaults = mergeDeepAll(Chart.defaults, CHART_GLOBAL_DEFAULTS);
Object.entries(CHART_GLOBAL_DEFAULTS).forEach(([key]) => {
  Chart.defaults[key] = mergedDefaults[key];
});

export { Chart };
