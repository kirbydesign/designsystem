import { Options } from 'highcharts';
import { InjectionToken } from '@angular/core';

export const TIMESERIES_OPTIONS = new InjectionToken<Options>('TimeSeriesOptions');
export const TimeSeriesOptions: Options = {
  chart: {
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
    borderWidth: 0,
    split: true,
  },
  xAxis: {
    visible: true,
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
  },
  series: [
    {
      type: 'area',
      name: 'USD to EUR',
      data: (this === undefined ? [] : this.data) as Array<Highcharts.SeriesAreaDataOptions>,
    },
  ],
};
