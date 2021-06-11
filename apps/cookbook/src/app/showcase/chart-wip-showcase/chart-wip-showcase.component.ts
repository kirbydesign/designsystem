import { Component } from '@angular/core';

import { ChartType } from '../../../../../../libs/designsystem/src/lib/components/chart-wip/chart-wip.types';

@Component({
  selector: 'cookbook-chart-wip-showcase',
  templateUrl: './chart-wip-showcase.component.html',
  styleUrls: ['./chart-wip-showcase.component.scss'],
})
export class ChartWipShowcaseComponent {
  _dataArray = [
    [10, 43, 49, 558, 1283],
    [1283, 558, 49, 43, 10],
  ];
  _data = this._dataArray[0];
  _dataLabels = ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'];
  _label = 'Number of candies from the legohead eaten';
  _type = ChartType.bar;

  _onClick() {
    this._data = ChartType.bar === this._type ? this._dataArray[0] : this._dataArray[1];
    this._dataArray = [this._dataArray[1], this._dataArray[0]];
  }
}
