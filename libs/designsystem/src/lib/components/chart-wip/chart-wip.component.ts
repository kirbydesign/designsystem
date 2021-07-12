import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { ChartJSService } from './chart-js/chart-js.service';
import { ChartData, ChartHighlightedElements, ChartType } from './chart-wip.types';

@Component({
  selector: 'kirby-chart-wip',
  templateUrl: './chart-wip.component.html',
  styleUrls: ['./chart-wip.component.scss'],
  providers: [ChartJSService],
})
export class ChartWipComponent implements AfterViewInit, OnChanges {
  @Input() type: ChartType = 'column';
  @Input() data: ChartData;
  @Input() dataLabels?: string[] | string[][];
  @Input() customOptions?: ChartOptions;
  @Input() annotations?: AnnotationOptions[];
  @Input() highlightedElements?: ChartHighlightedElements;

  @HostBinding('style.--kirby-chart-height')
  _height: string;
  @Input() set height(value: string | number) {
    this._height = typeof value === 'number' ? `${value}px` : value;
  }

  @ViewChild('chartCanvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(private chartJSService: ChartJSService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let shouldRedrawChart = false;

    const keyUpdateFnPairs = {
      data: () => this.updateData(),
      dataLabels: () => this.updateDataLabels(),
      type: () => this.updateType(),
      customOptions: () => this.updateCustomOptions(),
      annotations: () => this.updateAnnotations(),
      highlightedElements: () => this.updateHighlightedElements(),
    };

    Object.entries(simpleChanges).forEach(([key]) => {
      if (simpleChanges[key].firstChange || !keyUpdateFnPairs[key]) return;
      shouldRedrawChart = true;
      keyUpdateFnPairs[key]();
    });

    if (shouldRedrawChart) this.redrawChart();
  }

  private renderChart() {
    this.chartJSService.renderChart(
      this.canvasElement,
      this.type,
      this.data,
      this.dataLabels,
      this.customOptions,
      this.annotations,
      this.highlightedElements
    );
  }

  private updateData() {
    this.chartJSService.updateData(this.data);
  }

  private updateDataLabels() {
    this.chartJSService.updateDataLabels(this.dataLabels);
  }

  private updateType() {
    this.chartJSService.updateType(this.type, this.customOptions);
  }

  private updateCustomOptions() {
    this.chartJSService.updateOptions(this.customOptions, this.type);
  }

  private updateAnnotations() {
    this.chartJSService.updateAnnotations(this.annotations);
  }

  private updateHighlightedElements() {
    this.chartJSService.updateHighlightedElements(this.highlightedElements);
  }

  private redrawChart() {
    this.chartJSService.redrawChart();
  }
}
