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

export const getColumnOptions = (data: number[], categories: string[]) =>
  ({
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
      categories,
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
      tickPositioner: () => {
        var positions = [0, Math.max(...data)];
        return positions;
      },
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
    series: [
      {
        type: 'column',
        name: 'InvisibleClickReceiver',
        data: data.map((_, idx) => Math.max(...data) - data[idx]),
        opacity: 0,
      },
      {
        type: 'column',
        data: data,
      },
    ],
  } as Options);
