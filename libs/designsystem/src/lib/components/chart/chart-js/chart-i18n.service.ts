import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { format, toDate } from 'date-fns';
import { da, enUS } from 'date-fns/locale';

import { ChartLocale, ChartPeriod } from '../chart.types';

const CHART_LOCALE_DEFAULT = 'en-US';

@Injectable({
  providedIn: 'root',
})
export class ChartI18nService {
  private getLocale(key: ChartLocale) {
    return { 'da-DK': da, 'en-US': enUS }[key];
  }
  private getDisplayFormats(key: ChartLocale) {
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
    options: ChartOptions,
    chartPeriod: ChartPeriod,
    localeString: ChartLocale = CHART_LOCALE_DEFAULT
  ): ChartOptions {
    // Handle localization in graph.
    options.locale = localeString;

    const scaleX = options.scales.x as any;
    // Update chart options with the given period.
    scaleX.time = {
      unit: chartPeriod,
    };
    scaleX.adapters = {
      date: {
        locale: this.getLocale(localeString),
      },
    };
    scaleX.time.displayFormats = this.getDisplayFormats(localeString);

    let tooltipDateformat = '';
    if (chartPeriod == ChartPeriod.oneDay) {
      tooltipDateformat = this.getDisplayFormats(localeString).hour;
    } else if (chartPeriod == ChartPeriod.fiveYears) {
      tooltipDateformat = 'LLL yyyy';
    } else {
      tooltipDateformat = this.getDisplayFormats(localeString).day;
    }

    options.plugins.tooltip.callbacks.title = (tooltipItems) => {
      const date = toDate(tooltipItems[0]?.parsed?.x);
      if (date.valueOf()) {
        return format(date, tooltipDateformat, { locale: this.getLocale(localeString) });
      }
    };

    return options;
  }
}
