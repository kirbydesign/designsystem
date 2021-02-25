import { InjectionToken } from '@angular/core';
import { ChartPoint } from 'chart.js';

export type ChartDataType = number[] | ChartPoint[];

export interface ChartDataset {
  label?: string;
  data?: ChartDataType;
  backgroundColor?: any[];
  borderColor?: any[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}
export interface ChartOption {
  type?: string;
  data?: ChartData;
  options?: any;
}
export const CHART_OPTIONS = new InjectionToken<ChartOption>('ChartOptions');

export class ChartOverrideOptions implements ChartOption {
  public data: ChartData;
  constructor() {
    this.data = {
      datasets: [],
      labels: [],
    };
  }
}

export const DefaultChartOptions: ChartOption = {
  type: 'line',
  data: {
    datasets: [],
    labels: [],
  },
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
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
        borderWidth: 2,
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

      /*
        callbacks: {
          title: (tooltipItems: ChartTooltipItem[], chartData: ChartData) => {
            const currPoint: ChartPoint = this.getChartPointFromTooltipItem(
              tooltipItems,
              chartData
            );
            return moment(currPoint.x)
              .tz(TimeOrDatePipe.DK_TZ)
              .format(chartTimeFormats.tooltipFormat);
          },
          label: (tooltipItem: ChartTooltipItem, chartData: ChartData) => {
            const currPoint: ChartPoint = this.getChartPointFromTooltipItem(
              tooltipItem,
              chartData
            );
            const val: number = currPoint.y as number;

            return formatNumber(val, this.locale, '1.2-2');
          },
        },*/
    },

    plugins: {
      datalabels: {
        //          backgroundColor: this.colorGraph,
        //          color: this.colorDatalabelsFont,
        borderRadius: 3,
        font: {
          lineHeight: 1,
          size: 11,
        },
        padding: {
          top: 6,
          left: 5,
          right: 5,
          bottom: 5,
        },

        offset: 5,
        /*
          align: (context: Context): Align => {
            const currVal: ChartPoint = this.getChartPointFromContext(
              context
            );
            return currVal !== null
              ? this.max === currVal.y
                ? 'top'
                : 'bottom'
              : null;
          },
          display: (context: Context): boolean => {
            return (
              context.dataIndex === minIndex || context.dataIndex === maxIndex
            );
          },
          formatter: (value: any, context: Context): string => {
            const currVal: ChartPoint = this.getChartPointFromContext(
              context
            );
            return currVal !== null
              ? formatNumber(currVal.y as number, this.locale, '1.2-2')
              : null;
          },*/
      },
    },
  },
};
