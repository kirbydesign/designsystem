import { ElementRef } from '@angular/core';

export enum ChartType {
  column = 'column',
}

export abstract class ChartService {
  renderChart: (targetElement: ElementRef, type: ChartType) => void;
  //TODO: implement these?
  updateChart?: void;
  changeChartType?: void;
}
