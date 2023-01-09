import { mergeDeepAll } from '@kirbydesign/designsystem/helpers';
import { Chart } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { ChartConfigService } from '../';

export class AnnotationsDelegate {
  constructor(private chartConfigService: ChartConfigService) {}

  public applyDefaultsToAnnotations(annotations: AnnotationOptions[]) {
    return annotations.map((annotation) => {
      const annotationTypeDefaults = this.chartConfigService.getAnnotationDefaults(annotation.type);
      return mergeDeepAll(annotationTypeDefaults, annotation);
    });
  }

  public createAnnotationPluginOptionsObject(annotations: AnnotationOptions[]) {
    const annotationsWithDefaults = this.applyDefaultsToAnnotations(annotations);
    return {
      plugins: {
        annotation: {
          annotations: annotationsWithDefaults,
        },
      },
    };
  }

  public getExistingChartAnnotations(chart: Chart): AnnotationOptions[] {
    const annotations = chart.options.plugins?.annotation?.annotations;
    /* In browser chart.js might return annotations as a Proxy object; force it to be an array.
       Each annotationOption in the resulting array  will also be a Proxy object. 
       But internally chart.js will just work with them as normal values */
    if (annotations !== undefined) {
      return Object.keys(annotations).map((key) => annotations[key]);
    } else {
      return [];
    }
  }
}
