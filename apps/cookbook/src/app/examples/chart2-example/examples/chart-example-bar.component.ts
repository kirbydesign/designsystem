import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Chart2Component } from '@kirbydesign/designsystem/components/chart2';

const config = {
  selector: 'cookbook-chart2-example-bar',
  template: `<kirby-card>
  <kirby-card-header title="Bar"></kirby-card-header>

  <kirby-chart-2 class="chart"  #chartBar1>
  </kirby-chart-2>

  
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleBarComponent implements AfterViewInit {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  @ViewChild('chartBar1') chartBar1: Chart2Component;

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

  ngAfterViewInit(): void {
    const barValues: number[] = [12, 19, 3, 5, 2, 3];
    this.setBarChart1(barValues);
  }
}
