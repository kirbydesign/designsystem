import { Injectable } from '@angular/core';
import { ChartType as ChartJSType } from 'chart.js';

import { deepCopy } from '../../../helpers/deep-copy';
import { ChartType } from '../chart.types';

import {
  CHART_ANNOTATION_CONFIGS,
  CHART_TYPE_CONFIGS,
  INTERACTION_FUNCTIONS_EXTENSIONS,
} from './type.config';

@Injectable()
export class ChartConfigService {
  public getTypeConfig(chartType: ChartType) {
    /* Deep copy to avoid Chart object modifying parts of CHART_TYPE_CONFIGS 
    as it copies by reference when initialized */
    return deepCopy(CHART_TYPE_CONFIGS[chartType]);
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
    return CHART_TYPE_CONFIGS[chartType]['type'] as ChartJSType;
  }
}
