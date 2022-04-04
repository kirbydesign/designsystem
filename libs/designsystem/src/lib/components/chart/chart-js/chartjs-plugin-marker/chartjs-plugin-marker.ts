/* 
  The marker plugin is heavily inspired by https://chartjs-plugin-crosshair.netlify.app
  The project appears stale and only the vertical line feature is needed
   part of the plugin that was actually needed is implemented here. 
*/

import { Chart } from 'chart.js';
import { valueOrDefault } from 'chart.js/helpers';

import { ChartDataset } from '../../chart.types';

var defaultOptions = {
  line: {
    color: 'black',
    width: 1,
    dashPattern: [],
  },
  snap: {
    enabled: false,
  },
};

const hasMarkerConfiguration = (chart: Chart) => {
  /* 
    Hacky solution. Should be fixed in this issue: https://github.com/kirbydesign/designsystem/issues/1967
  */
  return chart.data.datasets.some((dataset: ChartDataset) => !!dataset?.kirbyOptions?.isStockChart);
};

export default {
  id: 'marker',

  afterInit: function(chart) {
    if (!hasMarkerConfiguration(chart)) {
      return;
    }

    var xScaleType = chart.config.options.scales.x.type;

    if (
      xScaleType !== 'linear' &&
      xScaleType !== 'time' &&
      xScaleType !== 'category' &&
      xScaleType !== 'logarithmic'
    ) {
      return;
    }

    if (chart.options.plugins.marker === undefined) {
      chart.options.plugins.marker = defaultOptions;
    }

    chart.marker = {
      enabled: false,
      suppressUpdate: false,
      x: null,
      originalData: [],
      originalXRange: {},
      dragStarted: false,
      dragStartX: null,
      dragEndX: null,
      suppressTooltips: false,
      ignoreNextEvents: 0,
    };
  },

  getOption: function(chart, category, name) {
    return valueOrDefault(
      chart.options.plugins.marker[category]
        ? chart.options.plugins.marker[category][name]
        : undefined,
      defaultOptions[category][name]
    );
  },

  getXScale: function(chart) {
    return chart.data.datasets.length ? chart.scales[chart.getDatasetMeta(0).xAxisID] : null;
  },
  getYScale: function(chart) {
    return chart.scales[chart.getDatasetMeta(0).yAxisID];
  },

  afterEvent: function(chart, event) {
    if (!hasMarkerConfiguration(chart)) {
      return;
    }
    if (chart.config.options.scales.x.length == 0) {
      return;
    }

    let e = event.event;

    var xScaleType = chart.config.options.scales.x.type;

    if (
      xScaleType !== 'linear' &&
      xScaleType !== 'time' &&
      xScaleType !== 'category' &&
      xScaleType !== 'logarithmic'
    ) {
      return;
    }

    var xScale = this.getXScale(chart);

    if (!xScale) {
      return;
    }

    if (chart.marker.ignoreNextEvents > 0) {
      chart.marker.ignoreNextEvents -= 1;
      return;
    }

    // fix for Safari
    var buttons = e.native.buttons === undefined ? e.native.which : e.native.buttons;
    if (e.native.type === 'mouseup') {
      buttons = 0;
    }

    chart.marker.enabled =
      e.type !== 'mouseout' &&
      e.x > xScale.getPixelForValue(xScale.min) &&
      e.x < xScale.getPixelForValue(xScale.max);

    if (!chart.marker.enabled && !chart.marker.suppressUpdate) {
      if (e.x > xScale.getPixelForValue(xScale.max)) {
        // suppress future updates to prevent endless redrawing of chart
        chart.marker.suppressUpdate = true;
        chart.update('none');
      }
      chart.marker.dragStarted = false; // cancel zoom in progress
      return false;
    }
    chart.marker.suppressUpdate = false;

    chart.marker.x = e.x;

    chart.draw();
  },
  doDraw: function(chart) {
    if (!hasMarkerConfiguration(chart)) {
      return;
    }

    if (!chart.marker.enabled) {
      return;
    }

    this.drawTraceLine(chart);
    this.interpolateValues(chart);
    this.drawTracePoints(chart);

    return true;
  },
  beforeDraw: function(chart) {
    return this.doDraw(chart);
  },
  // Logic moved to beforeDraw in order
  // for the vertical line to be drawn
  // under tooltip and datalabels.
  // afterDraw: function(chart) {
  //   return this.doDraw(chart);
  // },

  drawTraceLine: function(chart) {
    if (!hasMarkerConfiguration(chart)) {
      return;
    }
    var yScale = this.getYScale(chart);

    var lineWidth = this.getOption(chart, 'line', 'width');
    var color = this.getOption(chart, 'line', 'color');
    var dashPattern = this.getOption(chart, 'line', 'dashPattern');
    var snapEnabled = this.getOption(chart, 'snap', 'enabled');

    var lineX = chart.marker.x;

    if (snapEnabled && chart._active.length) {
      lineX = chart._active[0].element.x;
    }

    chart.ctx.beginPath();
    chart.ctx.setLineDash(dashPattern);
    chart.ctx.moveTo(lineX, yScale.getPixelForValue(yScale.max));
    chart.ctx.lineWidth = lineWidth;
    chart.ctx.strokeStyle = color;
    chart.ctx.lineTo(lineX, yScale.getPixelForValue(yScale.min));
    chart.ctx.stroke();
    chart.ctx.setLineDash([]);
  },

  drawTracePoints: function(chart) {
    if (!hasMarkerConfiguration(chart)) {
      return;
    }
    for (var chartIndex = 0; chartIndex < chart.data.datasets.length; chartIndex++) {
      var dataset = chart.data.datasets[chartIndex];
      var meta = chart.getDatasetMeta(chartIndex);

      var yScale = chart.scales[meta.yAxisID];

      if (meta.hidden || !dataset.interpolate) {
        continue;
      }

      chart.ctx.beginPath();
      chart.ctx.arc(
        chart.marker.x,
        yScale.getPixelForValue(dataset.interpolatedValue),
        3,
        0,
        2 * Math.PI,
        false
      );
      chart.ctx.fillStyle = 'white';
      chart.ctx.lineWidth = 2;
      chart.ctx.strokeStyle = dataset.borderColor;
      chart.ctx.fill();
      chart.ctx.stroke();
    }
  },

  interpolateValues: function(chart) {
    for (var chartIndex = 0; chartIndex < chart.data.datasets.length; chartIndex++) {
      var dataset = chart.data.datasets[chartIndex];

      var meta = chart.getDatasetMeta(chartIndex);

      var xScale = chart.scales[meta.xAxisID];
      var xValue = xScale.getValueForPixel(chart.marker.x);

      if (meta.hidden || !dataset.interpolate) {
        continue;
      }

      var data = dataset.data;
      var index = data.findIndex(function(o) {
        return o.x >= xValue;
      });
      var prev = data[index - 1];
      var next = data[index];

      if (chart.data.datasets[chartIndex].steppedLine && prev) {
        dataset.interpolatedValue = prev.y;
      } else if (prev && next) {
        var slope = (next.y - prev.y) / (next.x - prev.x);
        dataset.interpolatedValue = prev.y + (xValue - prev.x) * slope;
      } else {
        dataset.interpolatedValue = NaN;
      }
    }
  },
};
