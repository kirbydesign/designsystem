import { formatNumber } from '@angular/common';
import { Options } from 'highcharts';
import { dateFormat } from 'highcharts/highstock';

import { ColorHelper } from '../../../helpers/color-helper';

export interface StockChartDataPoint {
  x: number;
  y: number;
  id: 'min' | 'max' | '';
}

export const stockChartOptions = (locale: string, height: number) => {
  const options: Options = defaultOptions(locale) as Options;
  const transparentColor = 'rgba(255,255,255,0)';
  options.chart.backgroundColor = transparentColor;
  options.chart.height = height;

  options.tooltip.backgroundColor = ColorHelper.getThemeColorRgbString('background-color');
  // Using a function instead of a lamdba-expression because of a reference to this.
  options.tooltip.formatter = function() {
    return (
      '<div class="kirby-text-xsmall">' +
      // @ts-ignore
      dateFormat('%e. %b', new Date(this.x)) +
      '</div><br/><div class="kirby-text-small kirby-text-bold">' +
      formatNumber(this.y, locale) +
      '</div>'
    );
  };
  options.plotOptions.area.fillColor = transparentColor;
  options.plotOptions.area.lineColor = ColorHelper.getThemeColorRgbString('tertiary');

  options.plotOptions.area.marker.lineColor = 'rgba(255,255,255,0.3)';
  options.plotOptions.area.marker.fillColor = ColorHelper.getThemeColorRgbString('primary');

  options.xAxis = {
    ...options.xAxis,
    crosshair: {
      color: ColorHelper.getThemeColorRgbString('primary'),
    },
    tickColor: transparentColor,
    lineColor: ColorHelper.getThemeColorRgbString('medium'),
    labels: {
      style: {
        color: ColorHelper.getThemeColorRgbString('semi-dark-tint'),
      },
    },
  };

  options.yAxis = {
    ...options.yAxis,
    lineColor: transparentColor,
    gridLineColor: ColorHelper.getThemeColorRgbString('medium'),
    labels: {
      style: {
        color: ColorHelper.getThemeColorRgbString('semi-dark-tint'),
      },
    },
  };

  /*
  // Using a function instead of a lamdba-expression because of a reference to this.
  options.plotOptions.area.events.mouseOver = function() {
    const transparentColor = 'rgba(255,255,255,0)';
    this.chart.xAxis[0].update({
      tickColor: transparentColor,
      lineColor: ColorHelper.getThemeColorRgbString('medium'),
      labels: {
        style: {
          color: ColorHelper.getThemeColorRgbString('semi-dark-tint'),
        },
      },
    });
  };

  // Using a function instead of a lamdba-expression because of a reference to this.
  options.plotOptions.area.events.mouseOut = function() {
    const transparentColor = 'rgba(255,255,255,0)';
    this.chart.xAxis[0].update({
      lineColor: transparentColor,
      labels: {
        style: {
          color: transparentColor,
        },
      },
    });
  };
   */

  return options;
};

export const annotations = (locale: string): Highcharts.AnnotationsOptions => {
  return {
    id: 'minmax',
    zIndex: 2,
    labels: [
      {
        point: 'max',
        shape: 'rect',
        distance: 5,
        align: 'center',
        verticalAlign: 'top',
        backgroundColor: ColorHelper.getThemeColorRgbString('tertiary'),
        // Using a function instead of a lamdba-expression because of a reference to this.
        formatter: function() {
          return formatNumber(this.y, locale, '1.1-1');
        },
      },
      {
        point: 'min',
        shape: 'rect',
        distance: -28,
        align: 'center',
        verticalAlign: 'bottom',
        backgroundColor: ColorHelper.getThemeColorRgbString('tertiary'),
        // Using a function instead of a lamdba-expression because of a reference to this.
        formatter: function() {
          return formatNumber(this.y, locale, '1.1-1');
        },
      },
    ],
    labelOptions: {
      y: 0,
      allowOverlap: true,
    },
  };
};

const defaultOptions = (locale: string): any => {
  return {
    chart: {
      zoomType: 'x',
      type: 'StockChart',
      spacingTop: 30,
      //spacingRight: 55,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      ordinal: true,
      type: 'datetime',
      lineWidth: 0.5,
      opposite: false,
      labels: {
        format: '{value:%Y-%b-%e %l:%M %p }',
      },
    },
    yAxis: {
      opposite: false,
      title: {
        text: '',
      },
      /* Doesn't work before upgrade.
        labels: {
          x: 0,
          y: 10,
          align: 'right',
        },
         */
    },
    annotations: [annotations(locale)],
    legend: {
      enabled: false,
    },
    tooltip: {
      crosshairs: {
        width: 1,
        zIndex: 2,
      },
      shadow: false,
      borderWidth: 0,
    },
    plotOptions: {
      area: {
        marker: {
          lineWidth: 16,
          radius: 7,
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        events: {},
        threshold: null,
      },
      series: {
        marker: {
          zIndex: 100,
          enabledThreshold: 50,
        },
      },
    },
    series: [
      {
        type: 'area',
        data: [],
      },
    ],
  };
};
