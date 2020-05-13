import { Options } from 'highcharts';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';

const getColor = DesignTokenHelper.getColor;
const fontSize = DesignTokenHelper.fontSize;

function colorPoints() {
  var series = this.series;
  for (var i = 0, ie = series.length; i < ie; ++i) {
    var points = series[i].data;
    for (var j = 0, je = points.length; j < je; ++j) {
      if (points[j].graphic) {
        points[j].graphic.element.style.stroke = getColor('background-color').value;
      }
    }
  }
}

export const barOptions: Options = {
  chart: {
    type: 'bar',
    animation: {
      duration: 150,
    },
    backgroundColor: 'transparent',
    events: {
      load: colorPoints,
      redraw: colorPoints,
    },
  },
  accessibility: {
    description: 'Bar chart',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  xAxis: {
    labels: {
      style: {
        fontSize: fontSize('s'),
        fontFamily: 'roboto',
        color: getColor('black').value,
      },
    },
    min: 0,
    lineColor: 'transparent',
  },
  yAxis: {
    title: {
      text: '',
    },
    labels: {
      enabled: false,
    },
    min: 0,
    lineWidth: 0,
    minorGridLineWidth: 0,
    gridLineColor: 'transparent',
    minorTickLength: 0,
    tickLength: 0,
    maxPadding: 0,
    endOnTick: false,
    showLastLabel: false,
    showFirstLabel: false,
  },
  plotOptions: {
    bar: {
      events: {},
    },
    series: {
      color: getColor('secondary').value,
      stacking: 'normal',
      states: {
        hover: {
          enabled: false,
        },
        inactive: {
          opacity: 1,
        },
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
};
