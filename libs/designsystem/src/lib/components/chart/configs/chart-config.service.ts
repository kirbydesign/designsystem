import { Injectable } from '@angular/core';
import { ActiveElement, Chart, ChartOptions, ChartType as ChartJSType } from 'chart.js';
import { AnnotationType, AnnotationTypeRegistry } from 'chartjs-plugin-annotation';

import { deepCopy } from '../../../helpers/deep-copy';
import { ChartType, ChartTypeConfig } from '../chart.types';

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

  /* Our types does not always map 1 to 1 to the same type 
  that the chart.js chart is actually oconfigured with. Therefore this function 
  for looking up the ChartJSType of a type.  */
  public chartTypeToChartJSType(chartType: ChartType): ChartJSType {
    return CHART_TYPES_CONFIG[chartType]['type'] as ChartJSType;
  }

  public applyInteractionFunctionsExtensions(options: ChartOptions): ChartOptions {
    const interactionFunctionsExtensions = CHART_INTERACTION_FUNCTIONS_EXTENSIONS;
    Object.entries(interactionFunctionsExtensions).forEach(([key, _]) => {
      const callback = options[key];
      options[key] = (e: Event, a: ActiveElement[], c: Chart) => {
        interactionFunctionsExtensions[key](e, a, c, callback);
      };
    });
    return options;
  }
}
