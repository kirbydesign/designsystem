import { AfterViewInit, Component, ElementRef, Injectable, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

export enum ChartType {
  column = 'column',
}

export abstract class ChartService {
  renderChart: (targetElement: ElementRef, type: ChartType) => void;
  //TODO: implement these?
  updateChart?: void;
  changeChartType?: void;
}

@Injectable()
class ChartJSService implements ChartService {
  public renderChart(targetElement: ElementRef<HTMLCanvasElement>, type: ChartType): void {
    switch (type) {
      case ChartType.column:
        this.renderColumnChart(targetElement);
    }
  }

  private renderColumnChart(targetElement: ElementRef<HTMLCanvasElement>) {
    const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    new Chart(targetElement.nativeElement, config);
  }
}

@Component({
  selector: 'kirby-chart-wip',
  templateUrl: './chart-wip.component.html',
  styleUrls: ['./chart-wip.component.scss'],
  providers: [
    {
      provide: ChartService,
      useClass: ChartJSService,
    },
  ],
})
export class ChartWipComponent implements AfterViewInit {
  @Input() type: ChartType = ChartType.column;

  @ViewChild('chartCanvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  private renderChart() {
    this.chartService.renderChart(this.canvas, this.type);
  }
}
