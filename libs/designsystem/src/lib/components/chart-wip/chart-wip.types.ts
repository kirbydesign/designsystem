import { ElementRef } from '@angular/core';

export enum ChartType {
  column = 'column',
}

export abstract class ChartService {
  renderChart: (
    targetElement: ElementRef,
    type: ChartType,
    data: number[],
    dataLabels: string[],
    label: string
  ) => void;
  //TODO: implement these?
  updateChart?: void;
  changeChartType?: void;
}
