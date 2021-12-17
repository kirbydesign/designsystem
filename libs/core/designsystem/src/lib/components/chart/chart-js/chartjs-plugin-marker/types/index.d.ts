import * as Chart from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    marker?: MarkerOptions;

    // extends chart.options.plugins[]
    ///libs/designsystem/src/lib/components/chart/configs/type.config.ts
  }
}

export interface MarkerOptions {
  line?: LineOptions | undefined;
  snap?: SnapOptions | undefined;
}

export interface LineOptions {
  color?: string | undefined;
  width?: number | undefined;
  dashPattern?: number[] | undefined;
}

export interface SnapOptions {
  enabled?: boolean | undefined;
}
