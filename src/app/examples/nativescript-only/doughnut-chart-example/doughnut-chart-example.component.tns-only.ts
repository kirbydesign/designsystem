import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { NativeScriptChartItem } from '../../../../kirby/components/nativescript-only/doughnut-chart/doughnut-chart.component.tns-only';

@Component({
  selector: 'kirby-nativescript-doughnut-chart-example',
  templateUrl: './doughnut-chart-example.component.tns-only.html',
  styleUrls: ['./doughnut-chart-example.component.tns-only.scss']
})

export class NativeScriptDoughnutChartExampleComponent implements OnInit {
  public chartItems$: Observable<NativeScriptChartItem[]>;
  private _paletteColors = ['#33a87f', '#005d3c', '#02f5a1', '#24765a'];
  buttonText = 'View details';
  title = 'Your investments';

  constructor() { }

  ngOnInit() {
    this.chartItems$ = this.mapToChartItems(this.getMockData(), this._paletteColors).pipe(delay(500));
  }

  getMockData(): { type: string, labelPercentage: string, drawingPercentage: number }[] {
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
  mapToChartItems(data: { type: string, labelPercentage: string, drawingPercentage: number }[], colors: string[]): Observable<NativeScriptChartItem[]> {
    let index = 0;
    const distributions$ = of(data);
    return distributions$.pipe(map(distributions => {
      return distributions.map(distribution => {
        const currentIndex = index;
        index++;
        if (index > colors.length - 1) {
          index = 0;
        }
        return new NativeScriptChartItem(
          distribution.type,
          distribution.labelPercentage,
          distribution.drawingPercentage,
          colors[currentIndex]
        );
      });
    }));
  }
}
