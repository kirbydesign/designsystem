import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartPoint } from 'chart.js';

import { Chart2Component } from '@kirbydesign/designsystem/components/chart2';

@Component({
  selector: 'cookbook-chart2-example',
  templateUrl: './chart-example.component.html',
  styleUrls: ['./chart-example.component.scss'],
})
export class ChartExampleComponent implements AfterViewInit {
  @ViewChild('chartLine') chartLine: Chart2Component;
  @ViewChild('chartBar1') chartBar1: Chart2Component;
  @ViewChild('chartBar2') chartBar2: Chart2Component;
  @ViewChild('chartPie') chartPie: Chart2Component;
  @ViewChild('chartDoughnut') chartDoughnut: Chart2Component;

  constructor() {}

  private setLineChart1(value: ChartPoint[]): void {
    this.chartLine.options = {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
          {
            label: 'Label for Line Sample',
            data: value,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 5,
            hoverRadius: 8,
            hoverBorderWidth: 1,
          },
        },
      },
    };
  }
  private setBarChart1(values: number[]): void {
    this.chartBar1.options = {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Bar Sample',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
          },
        ],
      },
    };
  }
  private setBarChart2(): void {
    this.chartBar2.options = {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  private setPieChart1(value: number[]): void {
    const pieOptions: any = {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: value,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    };

    this.chartPie.options = pieOptions;
  }

  private setDoughnut(value: number[]): void {
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: value,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const doughnutOptions: any = {
      type: 'doughnut',
      data,
    };

    this.chartDoughnut.type = 'doughnut';
    this.chartDoughnut.options = doughnutOptions;
  }

  ngAfterViewInit(): void {
    const value: ChartPoint[] = [];
    value.push({ x: 1, y: 1 });
    value.push({ x: 2, y: 2 });
    value.push({ x: 3, y: 3 });
    value.push({ x: 4, y: 4 });
    value.push({ x: 5, y: 5 });
    value.push({ x: 6, y: 6 });
    const pieValues: number[] = [12, 19, 3, 5, 2, 3];

    this.setLineChart1(value);
    this.setBarChart1(pieValues);
    this.setBarChart2();
    this.setPieChart1(pieValues);
    this.setDoughnut(pieValues);
  }
}
