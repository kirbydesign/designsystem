
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ChartModel } from '../../../kirby/components/doughnut-chart-ns/doughnut-chart-ns.component';

@Component({
  selector: 'kirby-doughnut-chart-ns-example',
  templateUrl: './doughnut-chart-ns-example.component.html',
  styleUrls: ['./doughnut-chart-ns-example.component.scss']
})

export class DoughnutChartNsExampleComponent implements OnInit {
  public chartModels$: Observable<ChartModel[]>;
  private _paletteColors = ['#33a87f', '#005d3c', '#02f5a1', '#24765a'];
  buttonText = 'View details';
  title = 'Your investments';

  constructor() { }

  ngOnInit() {
    this.chartModels$ = this.convertToChartModel(this.getMockData(), this._paletteColors).pipe(delay(500));
  }
  getMockData(): {type: string, labelPercentage: string, drawingPercentage: number}[] {
    return [
      {
        type: 'Stocks',
        labelPercentage: '75%',
        drawingPercentage: 73.41
        },
        {
        type: 'Investment Funds',
        labelPercentage: '25%',
        drawingPercentage: 24.61
        },
        {
        type: 'Certificates',
        labelPercentage: '< 1%',
        drawingPercentage: 0.98
        },
        {
        type: 'ETFs',
        labelPercentage: '< 1%',
        drawingPercentage: 0.98
        }
    ];
  }

  // tslint:disable-next-line:max-line-length
  convertToChartModel(data: {type: string, labelPercentage: string, drawingPercentage: number}[], colors: string[]): Observable<ChartModel[]> {
    let index = 0;
    const distributions$ = of(data);
    return distributions$.pipe(map(distributions => {
      return distributions.map(distribution => {
        const currentIndex = index;
        index++;
        if (index > colors.length - 1) {
          index = 0;
        }
        return new ChartModel(
          distribution.type,
          distribution.labelPercentage,
          distribution.drawingPercentage,
          colors[currentIndex]
        );
      });
    }));
  }

}
