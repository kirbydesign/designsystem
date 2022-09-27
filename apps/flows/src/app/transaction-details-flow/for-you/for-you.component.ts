import { Component } from '@angular/core';

@Component({
  selector: 'kirbydesign-transactions-details-foryou',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss'],
})
export class ForYouComponent {
  ChartData = [7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];

  ChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
