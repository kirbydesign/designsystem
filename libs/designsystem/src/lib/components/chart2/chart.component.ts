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
import { Chart, ChartConfiguration, ChartData, ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import merge from 'ts-deepmerge';

import { ChartCalculator, ChartTimeFormats } from './chart-calculator';
import { ChartDataType, CHART_CONFIGURATION, DefaultChartOptions } from './chartOptions';
import { KirbyIntegration } from './kirby-helpers';

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
  @Input() height = 300;
  @Input() description = '';
  @Input() useDefaultOptions = true;
  @Input() useDefaultStyle = true;

  // Private configurations of graph coloring used for default layout
  private colorFont: string;
  private colorGrid: string;
  private colorGraph: string;
  private colorPoint: string;
  private colorTooltip: string;
  private colorDatalabelsFont: string;
  private overrideConfiguration: ChartConfiguration = {};
  private defaultChartConfiguration: ChartConfiguration;

  private rootChartData: ChartData = null;
  private chartDataType: ChartDataType = null;
  private chartDatasets: ChartDataSets[] = [];
  private chartType: Chart.ChartType = 'line';
  private chartBorderWidth: number;
  private chartLabel: string = null;
  private chartLabels: string[] = null;
  private chartBackgroundColor: string[] = null;
  private chartBorderColor: string[] = null;

  //  private chartTimeFormats: ChartTimeFormats = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private locale: string,
    private kirbyIntegration: KirbyIntegration,
    @Self() private elementRef: ElementRef<HTMLElement>
  ) {
    this.defaultChartConfiguration = merge(DefaultChartOptions);
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
  }

  /**
   * Provides data for graph as a ChartDataSets type
   */
  @Input()
  public set dataset(value: ChartDataSets) {
    this.chartDatasets = [];
    if (value) {
      this.chartDatasets.push(value);
      this.renderChart();
    }
  }

  /**
   * Provides data for graph as an array ChartDataSets[] type
   */
  @Input()
  public set datasets(value: ChartDataSets[]) {
    this.chartDatasets = value;
    if (value) {
      this.renderChart();
    }
  }

  /**
   * Provides data for graph as a ChartDataType
   */
  @Input()
  public set data(value: ChartDataType) {
    this.chartDataType = value;
  }

  /**
   * Provides data for graph as a Dataset type, ie a complex type
   */
  @Input()
  public set chartData(value: ChartData) {
    this.rootChartData = value;
  }

  /**
   * Sets Chart.js Options overrides for the graph.
   * If provided these settings will merge with the default setting.
   * It can be used to hold options and data
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

  private cleanUp(): void {
    if (this.chart !== null) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  /**
   * handles the build of configuration, data and chart creation
   */
  public renderChart(): void {
    this.initialize();
    if (this.renderingElement == null) {
      return;
    }

    let options: ChartConfiguration = this.buildConfiguration();
    options = this.addData(options);

    console.log('resulting Options', options);

    if (this.chart !== null) {
      this.cleanUp();
    }
    this.chart = new Chart(this.renderingElement.nativeElement, options);
  }

  private initializeDataSet(chartDataSets: ChartDataSets): void {
    if (!chartDataSets) return;
    if (!chartDataSets.label) {
      chartDataSets.label = '';
    }
    if (!chartDataSets.borderWidth) {
      chartDataSets.borderWidth = 1;
    }
    if (!chartDataSets.borderColor) {
      chartDataSets.borderColor = [];
    }
    if (!chartDataSets.backgroundColor) {
      chartDataSets.backgroundColor = [];
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

  private createTypeSpecificConfiguration(): ChartConfiguration {
    let specificChartConfiguration: ChartConfiguration = {};
    const cType: Chart.ChartType =
      this.chartType || (this.overrideConfiguration.type as Chart.ChartType);
    if (cType) {
      this.overrideConfiguration.type = cType;
      this.chartType = cType;
      switch (this.chartType) {
        case 'line':
          specificChartConfiguration = merge(Chart.defaults.line);
          break;
        case 'bar':
          specificChartConfiguration = merge(Chart.defaults.bar);
          break;
        case 'pie':
          specificChartConfiguration = merge(Chart.defaults.pie);
          break;
        case 'doughnut':
          specificChartConfiguration = merge(Chart.defaults.doughnut);
          break;
        case 'horizontalBar':
          specificChartConfiguration = merge(Chart.defaults.horizontalBar);
          break;
        case 'polarArea':
          specificChartConfiguration = merge(Chart.defaults.polarArea);
          break;
        case 'radar':
          specificChartConfiguration = merge(Chart.defaults.radar);
          break;
        case 'bubble':
          specificChartConfiguration = merge(Chart.defaults.bubble);
          break;
        case 'scatter':
          specificChartConfiguration = merge(Chart.defaults.scatter);
          break;
      }
    }
    return specificChartConfiguration;
  }

  /**
   * Returns a merged Chart.js configuration
   * merge order matters
   */
  private buildConfiguration(): ChartConfiguration {
    let options: ChartConfiguration = {};
    if (this.useDefaultOptions) {
      options = merge(this.defaultChartConfiguration);
    }
    options = merge(options, this.createTypeSpecificConfiguration());
    options = merge(options, this.overrideConfiguration);
    if (this.useDefaultStyle) {
      options = merge(options, this.createStyledOptions());
    }
    return options;
  }

  /**
   * adds data to Chart.js configuration
   */
  private addData(options: ChartConfiguration): ChartConfiguration {
    if (this.rootChartData) {
      options.data = this.rootChartData;
      return options;
    }

    this.ensureDataset(options);
    if (this.chartDatasets) {
      this.chartDatasets.forEach((v) => {
        this.initializeDataSet(v);
        options.data.datasets.push(v);
      });
    }
    if (this.chartDataType) {
      const dataSet: ChartDataSets = {
        data: this.chartDataType,
        label: this.chartLabel,
        backgroundColor: this.backgroundColor,
        borderColor: this.chartBorderColor,
        borderWidth: this.chartBorderWidth,
      };
      this.initializeDataSet(dataSet);
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

  /**
   * Returns a Chart.js configuration with Kirby colors inserted
   */
  private createStyledOptions(): ChartConfiguration {
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
      },
    };
    return styledOptions;
  }
}
