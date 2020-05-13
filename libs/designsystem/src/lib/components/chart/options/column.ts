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
        points[j].graphic.element.style.stroke = getColor('secondary').value;
      }
    }
  }
}

export const columnOptions: Options = {
  chart: {
    animation: {
      duration: 500,
    },
    backgroundColor: 'transparent',
    type: 'column',
    events: {
      load: colorPoints,
      redraw: colorPoints,
    },
  },
  title: {
    text: '',
  },
  accessibility: {
    description: 'Column chart',
  },
  xAxis: {
    labels: {
      style: {
        fontSize: fontSize('xxs'),
        fontFamily: 'roboto',
        color: getColor('black').value,
      },
    },
    lineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: 'transparent',
    minorTickLength: 0,
    tickLength: 0,
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
    showLastLabel: false,
    showFirstLabel: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      stacking: 'normal',
    },
    series: {
      color: getColor('secondary').value,
      zIndex: 10,
      states: {
        hover: {
          enabled: false,
        },
        inactive: {
          opacity: 1,
        },
      },
    },
    line: {
      className: 'avg-line',
      marker: {
        enabled: false,
      },
      allowPointSelect: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
};
