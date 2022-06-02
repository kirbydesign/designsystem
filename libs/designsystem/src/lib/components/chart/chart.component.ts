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

import { ResizeObserverFactory } from '../shared';

import { ChartJSService } from './chart-js/chart-js.service';
import {
  ChartDataLabelOptions,
  ChartDataset,
  ChartHighlightedElements,
  ChartLabel,
  ChartType,
} from './chart.types';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartJSService],
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @Input() type: ChartType = 'column';
  @Input() data: ChartDataset[] | number[];

  @Input() labels: ChartLabel[];

  @Input() customOptions?: ChartOptions;
  @Input() dataLabelOptions?: ChartDataLabelOptions;
  @Input() annotations?: AnnotationOptions[];
  @Input() highlightedElements?: ChartHighlightedElements;

  @HostBinding('style.--kirby-chart-height')
  _height: string;
  @Input() set height(value: string | number) {
    this._height = typeof value === 'number' ? `${value}px` : value;
  }

  @ViewChild('chartCanvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  private chartHasBeenRendered: boolean = false;

  constructor(private chartJSService: ChartJSService) {}

  private throwStockDeprecationWarning() {
    /* 
    TODO: When `stock` ChartType has been removed - this method can be safely deleted. 
    See issue: https://github.com/kirbydesign/designsystem/issues/2305 
    */
    if (this.type === 'stock') {
      console.warn(
        "DEPRECATION WARNING: The 'stock' ChartType will be removed in v7.0.0 of Kirby Designsystem. A new 'kirby-stock-chart' will be introduced in v7.0.0 which can be used as a replacement."
      );
    }
  }

  ngAfterViewInit() {
    this.throwStockDeprecationWarning();

    /* 
       A chart is not rendered until it has both a height and a width. 
       If ChartComponent is slotted in an ionic component it will
       not have any height or width on afterViewInit. This will cause 
       the animation to not be played on first draw. 
    */
    const canvasElement = this.canvasElement.nativeElement;
    this.whenElementHasHeightAndWidth(canvasElement).then(() => this.renderChart());
  }

  private whenElementHasHeightAndWidth(element: HTMLElement): Promise<void> {
    const rectIs2D = ({ width, height }) => height > 0 && width > 0;

    return new Promise((resolve) => {
      const initialClientRect = element.getBoundingClientRect();
      if (rectIs2D(initialClientRect)) resolve();

      const resizeObserver = new ResizeObserverFactory().create(([resizeObserverEntry]) => {
        if (rectIs2D(resizeObserverEntry.contentRect)) {
          resizeObserver.unobserve(element);
          resolve();
        }
      });

      resizeObserver.observe(element);
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (this.chartHasBeenRendered) {
      let shouldRedrawChart = false;

      const keyUpdateFnPairs = {
        data: () => this.updateData(),
        labels: () => this.updateLabels(),
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
  }

  private renderChart() {
    this.chartHasBeenRendered = true;
    this.chartJSService.renderChart({
      targetElement: this.canvasElement,
      type: this.type,
      data: this.data,
      labels: this.labels,
      customOptions: this.customOptions,
      annotations: this.annotations,
      dataLabelOptions: this.dataLabelOptions,
      highlightedElements: this.highlightedElements,
    });
  }

  private updateData() {
    this.chartJSService.updateData(this.data);
  }

  private updateLabels() {
    this.chartJSService.updateLabels(this.labels);
  }

  private updateType() {
    this.throwStockDeprecationWarning();
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
