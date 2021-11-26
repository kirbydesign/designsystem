import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { format, toDate } from 'date-fns';
import { da, enUS } from 'date-fns/locale';

import { ChartDataDateSpan } from '../chart.types';

@Injectable({
  providedIn: 'root',
})
export class ChartI18nService {
  private getLocale(key: string) {
    return { 'da-DK': da, 'en-US': enUS }[key];
  }
  private getDisplayFormats(key: string) {
    return {
      'da-DK': {
        hour: 'HH:mm',
        day: 'd MMM',
      },
      'en-US': {
        hour: 'HH:mm',
        day: 'MMM d',
      },
    }[key];
  }

  public handleLocalization(
    // It was very unclear how to type the property options
    // given that options is a DeepPartialObject of ?
    // with options.scales.x.type set to 'time'
    // options.scales.x.time.unit, options.scales.x.adapters
    // and options.scales.x.time.displayFormats
    // should be valid properties.
    options: any,
    chartPeriod: ChartDataDateSpan,
    language: string
  ): ChartOptions {
    language = language || 'en-US';
    // Handle localization in graph.
    options.locale = language;

    // Update chart options with the given period.
    const scaleX = options.scales.x;
    scaleX.time.unit = chartPeriod;
    scaleX.adapters = {
      date: {
        locale: this.getLocale(language),
      },
    };
    scaleX.time.displayFormats = this.getDisplayFormats(language);

    let tooltipDateformat = '';
    switch (chartPeriod) {
      case ChartDataDateSpan.oneDay:
        tooltipDateformat = this.getDisplayFormats(language).hour;
        break;
      case ChartDataDateSpan.oneWeek:
      case ChartDataDateSpan.oneMonth:
      case ChartDataDateSpan.threeMonths:
      case ChartDataDateSpan.sixMonths:
      case ChartDataDateSpan.oneYear:
        tooltipDateformat = this.getDisplayFormats(language).day;
        break;
      case ChartDataDateSpan.fiveYears:
        tooltipDateformat = 'LLL yy';
        break;
    }

    options.plugins.tooltip.callbacks.title = (tooltipItems) => {
      const date = toDate(tooltipItems[0]?.parsed?.x);
      if (date.valueOf()) {
        return format(date, tooltipDateformat, { locale: this.getLocale(language) });
      }
    };

    return options;
  }
}
