
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ChartModel } from '../../../kirby/components/distribution-chart-ns/distribution-chart-ns.component';

export class Distribution {
  constructor(public type?: string, public percentage?: number, public drawingPercentage?: number, public labelPercentage?: string) {
  }
}

@Component({
  selector: 'kirby-distribution-chart-ns-example',
  templateUrl: './distribution-chart-ns-example.component.html',
  styleUrls: ['./distribution-chart-ns-example.component.scss']
})

export class DistributionChartNsExampleComponent implements OnInit {
  private _distributions$: Observable<Distribution[]>;
  private _chartModels$: Observable<ChartModel[]>;
  private _paletteColors = ['#33a87f', '#005d3c', '#02f5a1', '#24765a'];
  buttonText: string;
  title: string;
  subtitle: string;

  constructor() { }

  ngOnInit() {
    this.buttonText = 'Se mere';
    this.title = 'Investeringsoverblik';
    this.subtitle = '';
    this._distributions$ = of(this.getDistributionsMock()).pipe(delay(1000));
    this._chartModels$ = this.convertToChartModel(this._distributions$, this._paletteColors);
  }

  get chartModels$() {
    return this._chartModels$;
  }

  getDistributionsMock(): Distribution[] {
    return [
      {
        'type': 'Aktier',
        'labelPercentage': '75%',
        'percentage': 74.67617426898828,
        'drawingPercentage': 73.41971847284807
        },
        {
        'type': 'Investeringsforeninger',
        'labelPercentage': '25%',
        'percentage': 25.035158629414028,
        'drawingPercentage': 24.613932308232766
        },
        {
        'type': 'Certifikater',
        'labelPercentage': '< 1%',
        'percentage': 0.22769746122264,
        'drawingPercentage': 0.9831746094595799
        },
        {
        'type': 'ETF\'er',
        'labelPercentage': '< 1%',
        'percentage': 0.060969640375046326,
        'drawingPercentage': 0.9831746094595799
        }
    ];
  }

  convertToChartModel(distributions$: Observable<Distribution[]>, colors: string[]): Observable<ChartModel[]> {
    let index = 0;
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
