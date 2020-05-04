import { Options } from 'highcharts';
import { InjectionToken } from '@angular/core';

export const ACTIVITYGAUGE_OPTIONS = new InjectionToken<Options>('ActivityGaugeOptions');
export const ActivityGaugeOptions: Options = {
  chart: {
    style: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '300',
    },
    backgroundColor: 'transparent',
    type: 'solidgauge',
    description: '',
    height: '110%',
  },
  title: {
    align: 'center',
    verticalAlign: 'middle',
    text: '',
    y: 0,
    floating: false,
    style: {
      fontSize: '30px',
      color: '#fff',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: '',
    align: 'center',
    y: 25,
    verticalAlign: 'middle',
    style: {
      color: '#fff',
      fontSize: '14px',
      fontWeight: 'normal',
    },
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
    animation: false,
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        backgroundColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [1, 'rgba(255, 255, 255, 0.3)'],
            [0, 'rgba(255, 255, 255, 0.3)'],
          ],
        },
        outerRadius: '112%',
        innerRadius: '88%',
        borderWidth: 0,
      },
    ],
  },
  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [],
  },
  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: false,
      },
      linecap: 'round',
      stickyTracking: false,
      rounded: true,
    },
  },
  series: [
    {
      type: 'solidgauge',
      data: (this === undefined ? [] : this.data) as Array<Highcharts.SeriesGaugeDataOptions>,
    },
  ],
};
