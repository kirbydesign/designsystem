import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-chart-wip-showcase',
  templateUrl: './chart-wip-showcase.component.html',
  styleUrls: ['./chart-wip-showcase.component.scss'],
})
export class ChartWipShowcaseComponent {
  _data = [10, 43, 49, 558, 1283];
  _dataLabels = ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'];
  _label = 'Number of candies from the legohead eaten';
}
