import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

import { ChartType } from '../../../../../../libs/designsystem/src/lib/components/chart-wip/chart-wip.types';

@Component({
  selector: 'cookbook-chart-wip-showcase',
  templateUrl: './chart-wip-showcase.component.html',
  styleUrls: ['./chart-wip-showcase.component.scss'],
})
export class ChartWipShowcaseComponent {
  _datasets = [
    [10, 43, 49, 558, 1283],
    [1283, 558, 49, 43, 10],
  ];
  _dataLabels = [
    ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'],
    ['DAG 1', 'DAG 2', 'DAG 3', 'DAG 4', 'DAG 5'],
  ];
  _types = [ChartType.bar, ChartType.column];
  _label = 'Number of candies from the legohead eaten';
  _lastClickedElement: string;
  _options: ChartOptions[] = [
    {
      onClick: (_, [activeElement]) => {
        this._lastClickedElement = activeElement
          ? this._dataLabels[0][activeElement.index]
          : 'no element';
      },
    },
    {
      onClick: (_, [activeElement]) => {
        this._lastClickedElement = activeElement
          ? `the magnificent ${this._dataLabels[0][activeElement.index]}`
          : "nuthin'";
      },
    },
  ];

  _onClick() {
    const flip = (arr: any[]) => [arr[1], arr[0]];

    this._datasets = flip(this._datasets);
    this._dataLabels = flip(this._dataLabels);
    this._types = flip(this._types);
    this._options = flip(this._options);
  }
}
