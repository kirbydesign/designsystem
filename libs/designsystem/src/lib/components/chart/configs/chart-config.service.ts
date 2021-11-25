import { Injectable } from '@angular/core';
import { ChartDataset, ChartType as ChartJSType } from 'chart.js';
import { AnnotationType, AnnotationTypeRegistry } from 'chartjs-plugin-annotation';

import { deepCopy } from '../../../helpers/deep-copy';
import { ChartDataDateSpan, ChartType, ChartTypeConfig } from '../chart.types';

import { CHART_ANNOTATIONS_CONFIG } from './annotations.config';
import { CHART_INTERACTION_FUNCTIONS_EXTENSIONS } from './interaction-functions-extensions.config';
import { CHART_TYPES_CONFIG } from './type.config';

@Injectable()
export class ChartConfigService {
  public getTypeConfig(chartType: ChartType): ChartTypeConfig {
    /* Deep copy to avoid Chart object modifying parts of CHART_TYPES_CONFIG 
    as it copies by reference when initialized */
    return deepCopy(CHART_TYPES_CONFIG[chartType]);
  }

  public getAnnotationDefaults(type: AnnotationType): AnnotationTypeRegistry[AnnotationType] {
    return CHART_ANNOTATIONS_CONFIG[type];
  }

  public getInteractionFunctionsExtensions() {
    return CHART_INTERACTION_FUNCTIONS_EXTENSIONS;
  }

  /* Our types does not always map 1 to 1 to the same type 
  that the chart.js chart is actually oconfigured with. Therefore this function 
  for looking up the ChartJSType of a type.  */
  public chartTypeToChartJSType(chartType: ChartType): ChartJSType {
    return CHART_TYPES_CONFIG[chartType]['type'] as ChartJSType;
  }

  /**
   * Find the chart period that is suited given the dataset provided.
   *
   * @returns a string representation of the chart period.
   */
  public findChartPeriod(data: ChartDataset): ChartDataDateSpan {
    // assuming that data is ordered chronologically.
    const start = (data.data[0] as any).x;
    const end = (data.data[data.data.length - 1] as any).x;

    const distanceInMs = end - start;

    const aDayInSeconds = 86400;
    const possiblePeriods = {
      [aDayInSeconds * 1000]: ChartDataDateSpan.oneDay,
      [aDayInSeconds * 7 * 1000]: ChartDataDateSpan.oneWeek,
      [aDayInSeconds * 31 * 1000]: ChartDataDateSpan.oneMonth,
      [aDayInSeconds * 31 * 3 * 1000]: ChartDataDateSpan.threeMonths,
      [aDayInSeconds * 31 * 6 * 1000]: ChartDataDateSpan.sixMonths,
      [aDayInSeconds * 365 * 1000]: ChartDataDateSpan.oneYear,
      [aDayInSeconds * 365 * 5 * 1000]: ChartDataDateSpan.fiveYears,
    };

    const findClosest = (needle: number) =>
      Object.keys(possiblePeriods).reduce((a, b) =>
        Math.abs(+b - needle) < Math.abs(+a - needle) ? b : a
      );

    return possiblePeriods[findClosest(distanceInMs)];
  }
}
