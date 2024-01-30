import { Injectable } from '@angular/core';
import { deepCopy } from '@kirbydesign/designsystem/helpers';
import { ActiveElement, Chart, ChartType as ChartJSType, ChartOptions } from 'chart.js';
import { AnnotationType, AnnotationTypeRegistry } from 'chartjs-plugin-annotation';
import { toDate } from 'date-fns';
import { ChartDataLabelOptions, ChartLocale, ChartType, ChartTypeConfig } from '../charts.types';

import { CHART_ANNOTATIONS_CONFIG } from './configs/annotations.config';
import { CHART_INTERACTION_FUNCTIONS_EXTENSIONS } from './configs/interaction-functions-extensions.config';
import { CHART_TYPES_CONFIG } from './configs/type.config';

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

  /* Our types does not always map 1 to 1 to the same type 
  that the chart.js chart is actually configured with. Therefore this function 
  for looking up the ChartJSType of a type.  */
  public chartTypeToChartJSType(chartType: ChartType): ChartJSType {
    return CHART_TYPES_CONFIG[chartType]['type'] as ChartJSType;
  }

  public applyInteractionFunctionsExtensions(options: ChartOptions): ChartOptions {
    const interactionFunctionsExtensions = CHART_INTERACTION_FUNCTIONS_EXTENSIONS;
    Object.entries(interactionFunctionsExtensions).forEach(([key]) => {
      const callback = options[key];
      options[key] = (e: Event, a: ActiveElement[], c: Chart) => {
        interactionFunctionsExtensions[key](e, a, c, callback);
      };
    });
    return options;
  }

  public getStockChartOptions(dataLabelOptions: ChartDataLabelOptions, locale: ChartLocale) {
    return {
      locale: locale,
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              const date = toDate((tooltipItems[0]?.raw as any)?.x);
              if (date.valueOf()) {
                return date.toLocaleTimeString(locale, {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });
              }
            },
            label: (context) => {
              // It's not possible to add spacing between color legend and text so we
              // prefix with a space.
              return ' ' + context.formattedValue + (dataLabelOptions.valueSuffix || '');
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => {
              return value + (dataLabelOptions.valueSuffix || '');
            },
          },
        },
      },
    };
  }
}
