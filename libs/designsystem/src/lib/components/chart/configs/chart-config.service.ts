import { Injectable } from '@angular/core';
import { ChartType as ChartJSType } from 'chart.js';

import { deepCopy } from '../../../helpers/deep-copy';
import { ChartType, ChartTypeConfig } from '../chart.types';

import {
  CHART_ANNOTATION_CONFIGS,
  CHART_TYPES_CONFIG,
  INTERACTION_FUNCTIONS_EXTENSIONS,
} from './type.config';

@Injectable()
export class ChartConfigService {
  public getTypeConfig(chartType: ChartType): ChartTypeConfig {
    /* Deep copy to avoid Chart object modifying parts of CHART_TYPES_CONFIG 
    as it copies by reference when initialized */
    return deepCopy(CHART_TYPES_CONFIG[chartType]);
  }

  public getAnnotationDefaults(type: string) {
    return CHART_ANNOTATION_CONFIGS[type];
  }

  public getInteractionFunctionsExtensions() {
    return INTERACTION_FUNCTIONS_EXTENSIONS;
  }

  /* Our types does not always map 1 to 1 to the same type 
  that the chart.js chart is actually oconfigured with. Therefore this function 
  for looking up the ChartJSType of a type.  */
  public chartTypeToChartJSType(chartType: ChartType): ChartJSType {
    return CHART_TYPES_CONFIG[chartType]['type'] as ChartJSType;
  }
}
