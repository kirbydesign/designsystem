import { Options } from 'highcharts';
import { InjectionToken } from '@angular/core';
import * as Highcharts from 'highcharts';

export const TIMESERIES_OPTIONS = new InjectionToken<Options>('TimeSeriesOptions');
export const TimeSeriesOptions: Options = {
  chart: {
    backgroundColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 3 },
      stops: [
        [0, '#F6F6F6'],
        [1, '#808080'],
      ],
    },
    zoomType: 'x',
    type: 'timeseries',
    borderWidth: 0,
    plotBorderWidth: 0,
    margin: 0,
    marginTop: 48,
  },
  title: {
    text: '',
  },
  subtitle: {
    text: '',
  },
  tooltip: {
    shadow: false,
    formatter: function() {
      // @ts-ignore
      return Highcharts.dateFormat('%e. %b', new Date(this.x)) + '.' + '<br/><b>' + this.y + '</b>';
    },
    //xDateFormat: '%d/%m',
    positioner: function(labelWidth, labelHeight, point) {
      return { x: point.plotX, y: 0 };
    },
    borderWidth: 0,
  },
  xAxis: {
    visible: false,
    lineColor: '#FFFFFF',
    tickColor: '#FFFFFF',
    labels: {
      style: {
        color: 'white',
      },
    },
    opposite: true,
    crosshair: {
      zIndex: 3,
      width: 1,
      color: '#00E89A',
    },
    type: 'datetime',
    tickInterval: 1,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillColor: '#01352C',
      marker: {
        lineWidth: 14,
        lineColor: 'rgba(255,255,255,0.2)',
        radius: 6,
        fillColor: '#00E89A',
      },
      lineColor: '#01352C',
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
    series: {
      marker: {
        enabledThreshold: 50,
      },
    },
  },
  series: [
    {
      type: 'area',
      name: 'USD to EUR',
      data: (this === undefined ? [] : this.data) as Array<Highcharts.SeriesAreaDataOptions>,
    },
  ],
};
