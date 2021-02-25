import { DOCUMENT } from '@angular/common';
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
import { Chart, ChartConfiguration, ChartDataSets, ChartPoint } from 'chart.js';
import 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import merge from 'ts-deepmerge';

import { ChartCalculator, ChartTimeFormats } from './chart-calculator';
import { CHART_CONFIGURATION } from './chartOptions';
import { KirbyIntegration } from './kirby-helpers';

export type ChartDataType = Array<number | null | undefined | number[]> | ChartPoint[];

@Component({
  selector: 'kirby-chart-2',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [KirbyIntegration, { provide: CHART_CONFIGURATION, useValue: CHART_CONFIGURATION }],
})
export class Chart2Component implements AfterViewInit, OnDestroy {
  // Make sure global settings are only initiated to default on first instance creation

  private static globalsInitiated = false;
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

  private overrideConfiguration: ChartConfiguration;
  private defaultChartConfiguration: ChartConfiguration;

  private chartData: ChartDataType = null;
  private chartDataset: ChartDataSets = null;
  private chartDatasets: ChartDataSets[] = null;

  private chartType: Chart.ChartType = null;
  private chartBorderWidth: number;
  private chartLabel: string = null;

  private chartLabels: string[] = null;
  private chartBackgroundColor: string[] = null;
  private chartBorderColor: string[] = null;

  //  private chartTimeFormats: ChartTimeFormats = null;

  constructor(
    @Inject(CHART_CONFIGURATION) chartConfiguration: ChartConfiguration,
    @Inject(CHART_CONFIGURATION) overrideConfiguration: ChartConfiguration,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private locale: string,
    private kirbyIntegration: KirbyIntegration,
    @Self() private elementRef: ElementRef<HTMLElement>
  ) {
    this.defaultChartConfiguration = merge(chartConfiguration);
    this.overrideConfiguration = merge(overrideConfiguration);

    //TODO: look into this
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
  }

  public get categories(): string[] {
    return this.labels;
  }

  /**
   * Provides labels data
   */
  @Input()
  public set categories(value: string[]) {
    this.labels = value;
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
  }

  public get type(): Chart.ChartType {
    return this.chartType;
  }

  /**
   * Provides chart type
   */
  @Input()
  public set type(value: Chart.ChartType) {
    this.chartType = value;
    if (this.chartType) {
      this.overrideConfiguration.type = this.chartType;
      switch (this.chartType) {
        case 'line':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.line)
          );
          break;
        case 'bar':
          this.defaultChartConfiguration = merge(
            this.defaultChartConfiguration,
            Chart.defaults.bar
          );
          break;
        case 'pie':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.pie)
          );
          break;
        case 'doughnut':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.doughnut)
          );
          break;
        case 'horizontalBar':
          merge(this.defaultChartConfiguration, Chart.defaults.bar);
          break;
        case 'polarArea':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.polarArea)
          );
          break;
        case 'radar':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.radar)
          );
          break;
        case 'bubble':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.bubble)
          );
          break;
        case 'scatter':
          merge(
            this.defaultChartConfiguration,
            (this.defaultChartConfiguration = Chart.defaults.scatter)
          );
          break;
      }
    }
  }

  public get dataset(): ChartDataSets {
    return this.chartDataset;
  }

  /**
   * Provides data for graph as a Dataset type, ie a complex type
   */
  @Input()
  public set dataset(value: ChartDataSets) {
    this.chartDataset = value;
  }

  public get datasets(): ChartDataSets[] {
    return this.chartDatasets;
  }

  /**
   * Provides data for graph as a Dataset type, ie a complex type
   */
  @Input()
  public set datasets(value: ChartDataSets[]) {
    this.chartDatasets = value;
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
  }

  public get options(): ChartConfiguration {
    return this.overrideConfiguration;
  }

  /**
   * Sets Chart.js Options overrides for the graph.
   * If provided these settings will merge with the default setting.
   * See chartjs.org for config options.
   */
  @Input()
  public set options(value: ChartConfiguration) {
    this.overrideConfiguration = merge(this.overrideConfiguration, value);
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.cleanUp();
  }

  private resetDataSet(value: ChartDataSets): void {
    if (!value.label) {
      value.label = '';
    }
    if (!value.borderWidth) {
      value.borderWidth = 1;
    }
    if (!value.borderColor) {
      value.borderColor = [];
    }
    if (!value.backgroundColor) {
      value.backgroundColor = [];
    }
  }

  private initialize(): void {
    moment.locale(this.locale);
    // const colors = this.kirbyIntegration.getSettings(this.elementRef.nativeElement);
    const colors = this.kirbyIntegration.getSettingsFromDocument(this.document);
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
  private createOptions(): ChartConfiguration {
    let options = merge(this.defaultChartConfiguration);
    options = merge(options, merge(this.overrideConfiguration));
    if (this.chartDatasets) {
      this.chartDatasets.forEach((v) => this.resetDataSet(v));
      options.data.datasets = this.chartDatasets;
    }

    if (this.chartDataset) {
      this.ensureDataset(options);
      this.resetDataSet(this.chartDataset);
      options.data.datasets.push(this.chartDataset);
    }

    if (this.chartData) {
      this.ensureDataset(options);
      const dataSet: ChartDataSets = {
        data: this.chartData,
        label: this.chartLabel,
        backgroundColor: this.backgroundColor,
        borderColor: this.chartBorderColor,
        borderWidth: this.chartBorderWidth,
      };
      this.resetDataSet(dataSet);
      options.data.datasets.push(dataSet);
    }
    if (this.chartLabels) {
      options.data.labels = this.chartLabels;
    }

    return options;
  }

  private ensureDataset(options: ChartConfiguration): void {
    if (!options.data) {
      options.data = { labels: [], datasets: [] };
    }
    if (!options.data.datasets) {
      options.data.datasets = [];
    }
    if (!options.data.labels) {
      options.data.labels = [];
    }
  }

  private createStyledOptions(steps: any): ChartConfiguration {
    const styledOptions: ChartConfiguration = {
      options: {
        elements: {
          line: {
            borderColor: this.colorGraph,
            backgroundColor: this.colorGraph,
            borderWidth: 1,
          },
          point: {
            // hoverBackgroundColor: this.colorPoint,
            borderColor: this.colorGraph,
            backgroundColor: this.colorGraph,
            borderWidth: 1,
          },
          arc: {
            borderColor: this.colorGraph,
            backgroundColor: this.colorGraph,
            borderWidth: 1,
          },
          rectangle: {
            borderColor: this.colorGraph,
            backgroundColor: this.colorGraph,
            borderWidth: 1,
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
          },
        },
      },
    };
    return styledOptions;
  }

  public renderChart(): void {
    this.initialize();
    if (this.renderingElement == null) {
      return;
    }

    let options: ChartConfiguration = this.createOptions();
    //    if (options.data.datasets.length === 0) return;

    // Find highest and lowest values from the dataset
    const minMax: {
      min: number;
      minIndex: number;
      max: number;
      maxIndex: number;
    } = ChartCalculator.readMinMaxY(options.data.datasets);

    this.min = minMax.min;
    this.max = minMax.max;
    this.minIndex = minMax.minIndex;
    this.maxIndex = minMax.maxIndex;

    const steps = ChartCalculator.getSteps(this.min, this.max);

    // Create config
    const styledOptions = this.createStyledOptions(steps);
    options = merge(options, styledOptions);
    //    console.log('resulting Options', options);

    if (this.chart !== null) {
      this.cleanUp();
    }
    this.chart = new Chart(this.renderingElement.nativeElement, options);
  }

  private cleanUp(): void {
    if (this.chart !== null) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
