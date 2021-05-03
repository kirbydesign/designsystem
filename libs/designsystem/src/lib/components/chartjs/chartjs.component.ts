import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';

import { styles } from '../../helpers/color-helper.styles';

@Component({
  selector: 'kirby-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss'],
})
export class ChartjsComponent implements OnInit, OnChanges, AfterContentInit {
  @ViewChild('chart', { static: true }) chartElement: ElementRef<HTMLCanvasElement>;

  @Input() data: ChartData = null;
  @Input() height: number = 300;
  @Input() chartType: ChartType;
  @Input() chartOptions: ChartOptions;

  config: ChartConfiguration = {
    type: 'bar',
    data: null,
    options: {
      backgroundColor: styles.mainColors.primary,
    },
  };

  chart: Chart;

  constructor() {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      BarController,
      BarElement
    );
  }
  ngAfterContentInit(): void {
    this.chart = new Chart(this.chartElement.nativeElement.getContext('2d'), { ...this.config });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartType) {
    }

    this.updateProperties();
  }

  private updateProperties() {
    if (this.chart) {
      this.chart.config.type = this.chartType;
      this.chart.config.data = this.data;
      this.chart.update();
    }
  }
}
