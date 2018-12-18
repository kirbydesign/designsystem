
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ChartModel } from '../../../kirby/components/doughnut-chart-ns/doughnut-chart-ns.component';

export class Distribution {
  constructor(public type?: string,
    public percentage?: number,
    public drawingPercentage?: number,
    public labelPercentage?: string) {
  }
}

@Component({
  selector: 'kirby-doughnut-chart-ns-example',
  templateUrl: './doughnut-chart-ns-example.component.html',
  styleUrls: ['./doughnut-chart-ns-example.component.scss']
})

export class DoughnutChartNsExampleComponent implements OnInit {
  public chartModels$: Observable<ChartModel[]>;
  private _paletteColors = ['#33a87f', '#005d3c', '#02f5a1', '#24765a'];
  buttonText = 'View details';
  title = 'Yours investments';

  constructor() { }

  ngOnInit() {
    this.chartModels$ = this.convertToChartModel(this.getMockData(), this._paletteColors).pipe(delay(500));
  }

  getMockData(): Distribution[] {
    return [
      {
        'type': 'Stocks',
        'labelPercentage': '75%',
        'drawingPercentage': 73.41
        },
        {
        'type': 'Investment Funds',
        'labelPercentage': '25%',
        'drawingPercentage': 24.61
        },
        {
        'type': 'Certificates',
        'labelPercentage': '< 1%',
        'drawingPercentage': 0.98
        },
        {
        'type': 'ETFs',
        'labelPercentage': '< 1%',
        'drawingPercentage': 0.98
        }
    ];
  }

  convertToChartModel(data: Distribution[], colors: string[]): Observable<ChartModel[]> {
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
          distribution.percentage,
          distribution.drawingPercentage,
          distribution.labelPercentage,
          colors[currentIndex]
        );
      });
    }));
  }

}
