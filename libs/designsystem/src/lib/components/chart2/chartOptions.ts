import { InjectionToken } from '@angular/core';
import { ChartConfiguration, ChartPoint } from 'chart.js';

export type ChartDataType = Array<number | null | undefined | number[]> | ChartPoint[];

export const CHART_CONFIGURATION = new InjectionToken<ChartConfiguration>('DefaultChartOptions');

export const DefaultChartOptions: ChartConfiguration = {
  options: {
    // maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    showLines: true,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    elements: {
      line: {
        tension: 0, // Smooth curve (0 = no smoothing)
        borderWidth: 1,
        // cubicInterpolationMode: 'monotone',
        fill: false, // Disable fill below line
      },
      point: {
        radius: 0, // By default points are hidden (if 0)
        hoverRadius: 8,
        hoverBorderWidth: 0,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
          offset: false,
          gridLines: {
            display: false, // Dont show gridlines on xAxis
            drawBorder: true,
          },
          ticks: {
            maxRotation: 0,
            autoSkipPadding: 85,
            fontSize: 11,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          offset: false,
          ticks: {
            padding: 16,
            fontSize: 11,
          },
          gridLines: {
            drawBorder: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    hover: {
      mode: 'index',
      intersect: false,
      animationDuration: 0,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      caretSize: 0,
      caretPadding: 12,
      cornerRadius: 2,
      displayColors: false,
      xPadding: 8,
      titleFontStyle: 'normal',
      titleFontSize: 12,
      bodyFontStyle: 'bold',
      bodyFontSize: 15,
    },
  },
};
