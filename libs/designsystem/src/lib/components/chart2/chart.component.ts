import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Chart, ChartData, ChartPoint, ChartTooltipItem } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import merge from 'ts-deepmerge';

import { ChartCalculator, ChartTimeFormats } from './chart-calculator';
import {
  ChartDataset,
  ChartDataType,
  ChartOption,
  ChartOverrideOptions,
  CHART_OPTIONS,
} from './chartOptions';
import { KirbyIntegration } from './kirby-helpers';

@Component({
  selector: 'kirby-chart-2',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [KirbyIntegration, { provide: CHART_OPTIONS, useValue: CHART_OPTIONS }],
})
export class Chart2Component implements AfterViewInit, OnDestroy {
  // Make sure global settings are only initiated to default on first instance creation
  private static globalsInitiated = false;

  @Input() styleWidth = '100%';
  @Input() styleHeight = '300px';
  @ViewChild('rendering', { static: false }) renderingElement: ElementRef = null;

  public chart: Chart = null;
  public min: number = null;
  public minIndex: number = null;
  public max: number = null;
  public maxIndex: number = null;

  // Private configurations of graph coloring used for default layout
  private colorFont: string;
  private colorGrid: string;
  private colorGraph: string;
  private colorPoint: string;
  private colorTooltip: string;
  private colorDatalabelsFont: string;

  // Using 'any' type as ChartConfiguration lacks hoverBackgroundColor on point
  private chartConfiguration: ChartOption;
  private overrideOptions: ChartOption = new ChartOverrideOptions();
  private chartDefaultOptions: ChartOption;

  private chartData: ChartDataType = null;
  private chartDataset: ChartDataset = null;
  private chartType: string = null;
  private chartLabels: string[] = null;
  private chartLabel: string = null;
  private chartBackgroundColor: string[] = null;
  private chartBorderColor: string[] = null;
  private chartBorderWidth: number;

  private chartTimeFormats: ChartTimeFormats = null;

  constructor(
    @Inject(CHART_OPTIONS) chartOptions: ChartOption,
    @Inject(LOCALE_ID) private locale: string,
    private kirbyIntegration: KirbyIntegration,
    @Self() private elementRef: ElementRef<HTMLElement>
  ) {
    this.chartDefaultOptions = merge(chartOptions);
    // First time the component is used - trigger setting of global values on chart component
    if (!Chart2Component.globalsInitiated) {
      Chart2Component.fontFamily =
        '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif';
      Chart2Component.globalsInitiated = true;
    }
  }

  public static get fontFamily(): string {
    return Chart.defaults.global.defaultFontFamily;
  }

  /**
   * Overrides the default fontFamily on the Chart.js object (globally as this is a global setting on Chart.js)
   */
  public static set fontFamily(value: string) {
    Chart.defaults.global.defaultFontFamily = value;
  }

  public get backgroundColor(): string[] {
    return this.chartBackgroundColor;
  }

  /**
   * Provides backgroundColor
   */
  @Input()
  public set backgroundColor(value: string[]) {
    this.chartBackgroundColor = value;
    if (this.chartBackgroundColor) {
      this.ensureDataset();
      this.overrideOptions.data.datasets[0].backgroundColor = this.chartBackgroundColor;
    }
    this.initChart();
  }

  public get borderColor(): string[] {
    return this.chartBorderColor;
  }

  /**
   * Provides borderColor
   */
  @Input()
  public set borderColor(value: string[]) {
    this.chartBorderColor = value;
    if (this.chartBorderColor) {
      this.ensureDataset();
      this.overrideOptions.data.datasets[0].borderColor = this.chartBorderColor;
    }
    this.initChart();
  }

  public get borderWidth(): number {
    return this.chartBorderWidth;
  }

  /**
   * Provides borderWidth
   */
  @Input()
  public set borderWidth(value: number) {
    this.chartBorderWidth = value;
    if (this.chartBorderWidth) {
      this.ensureDataset();
      this.overrideOptions.data.datasets[0].borderWidth = this.chartBorderWidth;
    }
    this.initChart();
  }

  public get label(): string {
    return this.chartLabel;
  }

  /**
   * Provides label data
   */
  @Input()
  public set label(value: string) {
    this.chartLabel = value;
    if (this.chartLabel) {
      this.ensureDataset();
      this.overrideOptions.data.datasets[0].label = this.chartLabel;
    }
    this.initChart();
  }

  public get labels(): string[] {
    return this.chartLabels;
  }

  /**
   * Provides labels data
   */
  @Input()
  public set labels(value: string[]) {
    this.chartLabels = value;
    if (this.chartLabels) {
      this.overrideOptions.data.labels = this.chartLabels;
    }
    this.initChart();
  }

  public get type(): string {
    return this.chartType;
  }

  /**
   * Provides chart type
   */
  @Input()
  public set type(value: string) {
    this.chartType = value;
    if (this.chartType) {
      this.overrideOptions.type = this.chartType;
      console.log(' this.overrideOptions.type', this.overrideOptions.type);
      switch (this.chartType) {
        case 'line':
          this.chartDefaultOptions = Chart.defaults.line;
          break;
        case 'bar':
          this.chartDefaultOptions = Chart.defaults.bar;
          break;
        case 'pie':
          this.chartDefaultOptions = Chart.defaults.pie;
          break;
        case 'doughnut':
          this.chartDefaultOptions = Chart.defaults.doughnut;
          break;
        case 'horizontalBar':
          this.chartDefaultOptions = Chart.defaults.horizontalBar;
          break;
        case 'gauge':
          this.chartDefaultOptions = Chart.defaults.doughnut;
          break;
        case 'polarArea':
          this.chartDefaultOptions = Chart.defaults.polarArea;
          break;
      }
    }
    this.initChart();
  }

  public get dataset(): ChartDataset {
    return this.chartDataset;
  }

  /**
   * Provides data for graph as a Dataset type, ie a complex type
   */
  @Input()
  public set dataset(value: ChartDataset) {
    this.chartDataset = value;
    if (this.chartDataset) {
      if (this.overrideOptions.data.datasets === null) {
        this.overrideOptions.data.datasets = [];
      }
      this.overrideOptions.data.datasets.push(this.chartDataset);
    }
  }

  public get data(): ChartDataType {
    return this.chartData;
  }

  /**
   * Provides data for graph as an array of ChartPoints or an array of numbers
   */
  @Input()
  public set data(value: ChartDataType) {
    this.chartData = value;
    if (this.chartData) {
      this.ensureDataset();
      this.overrideOptions.data.datasets[0].data = this.chartData;
    }
  }

  /**
   * Sets Chart.js Options overrides for the graph.
   * If provided these settings will merge with the default setting.
   * See chartjs.org for config options.
   */
  public set options(value: ChartOption) {
    this.overrideOptions = value;
    this.initChart();
  }

  /**
   * A filter to read a chartpoint from a Chart.js point tooltipItem
   * and data (used for chartdata points). Tooltip item and data is provided by Chart.js.
   */
  public getChartPointFromTooltipItem(
    tooltipItem: ChartTooltipItem | ChartTooltipItem[],
    data: ChartData
  ): ChartPoint {
    // If array, pick the first item in the array
    if (tooltipItem instanceof Array) {
      if (tooltipItem.length <= 0) {
        return null;
      }
      tooltipItem = tooltipItem[0];
    }

    return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as ChartPoint;
  }

  /**
   * A filter to read a chartpoint from a Chart.js point context (used for chartdata points). Context is provided by Chart.js.
   */
  public getChartPointFromContext(context: Context): ChartPoint {
    return context.dataset.data[context.dataIndex] as ChartPoint;
  }

  ngAfterViewInit(): void {
    this.initialize();
    this.initChart();
  }

  ngOnDestroy(): void {
    this.cleanUp();
  }

  private ensureDataset(): void {
    if (
      this.overrideOptions.data.datasets === null ||
      this.overrideOptions.data.datasets.length === 0
    ) {
      this.overrideOptions.data.datasets = [];
      this.overrideOptions.data.datasets.push({});
    }
  }

  private initialize(): void {
    moment.locale(this.locale);
    const colors = this.kirbyIntegration.getSettings(this.elementRef.nativeElement);
    this.colorPoint = colors.colorPoint;
    this.colorGraph = colors.colorGraph;
    this.colorDatalabelsFont = colors.colorDatalabelsFont;
    this.colorTooltip = colors.colorTooltip;
    this.colorGrid = colors.colorGrid;
    this.colorFont = colors.colorFont;
  }

  /**
   * Returns a merged Chart.js configuration
   *
   */

  private getOptions(styledOptions: ChartOption): ChartOption {
    const options: ChartOption = merge(this.chartDefaultOptions, styledOptions);
    const resultingOptions: ChartOption = merge(options, this.overrideOptions);
    //    console.log('resultingOptions', resultingOptions);
    return resultingOptions;
  }

  private createStyledOptions(steps: any): ChartOption {
    const styledOptions: ChartOption = {
      options: {
        elements: {
          line: {
            borderColor: this.colorGraph,
          },
          point: {
            hoverBackgroundColor: this.colorPoint,
          },
        },
        tooltips: {
          backgroundColor: this.colorTooltip,
          titleFontColor: this.colorGraph,
          bodyFontColor: this.colorGraph,
        },
        plugins: {
          datalabels: {
            backgroundColor: this.colorGraph,
            color: this.colorDatalabelsFont,
            /*
            align: (context: Context): Align => {
              const currVal: ChartPoint = this.getChartPointFromContext(
                context
              );
              return currVal !== null
                ? this.max === currVal.y
                  ? 'top'
                  : 'bottom'
                : null;
            },
            display: (context: Context): boolean => {
              return (
                context.dataIndex === minIndex || context.dataIndex === maxIndex
              );
            },
            formatter: (value: any, context: Context): string => {
              const currVal: ChartPoint = this.getChartPointFromContext(
                context
              );
              return currVal !== null
                ? formatNumber(currVal.y as number, this.locale, '1.2-2')
                : null;
            },*/
          },
        },
      },
    };
    return styledOptions;
  }

  private initChart(): void {
    if (this.renderingElement == null) {
      return;
    }
    if (
      !this.overrideOptions.data ||
      !this.overrideOptions.data.datasets ||
      this.overrideOptions.data.datasets.length === 0
    ) {
      return;
    }

    // TODO: fix this area
    const chartData = this.overrideOptions.data.datasets[0].data;

    // Find highest and lowest values from the dataset
    const minMax: {
      min: number;
      minIndex: number;
      max: number;
      maxIndex: number;
    } = ChartCalculator.readMinMaxY(chartData);

    this.min = minMax.min;
    this.max = minMax.max;
    this.minIndex = minMax.minIndex;
    this.maxIndex = minMax.maxIndex;

    const steps = ChartCalculator.getSteps(this.min, this.max);

    // Create config
    const styledOptions = this.createStyledOptions(steps);
    this.chartConfiguration = this.getOptions(styledOptions);

    if (this.chart !== null) {
      this.cleanUp();
    }

    // console.log('resulting chartConfiguration', this.chartConfiguration);

    this.chart = new Chart(this.renderingElement.nativeElement, this.chartConfiguration);
  }

  private cleanUp(): void {
    if (this.chart !== null) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
