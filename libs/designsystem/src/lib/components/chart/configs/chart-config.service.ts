import { Injectable } from '@angular/core';

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
}
