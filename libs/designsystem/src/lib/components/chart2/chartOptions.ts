import { InjectionToken } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

export const CHART_CONFIGURATION = new InjectionToken<ChartConfiguration>('DefaultChartOptions');

export const DefaultChartOptions: ChartConfiguration = {
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    showLines: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 0,
      },
    },
    elements: {
      line: {
        tension: 0, // Smooth curve (0 = no smoothing)
        borderWidth: 1,
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
