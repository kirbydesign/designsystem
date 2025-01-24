import { Component } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
@Component({
  selector: 'kirbydesign-transactions-details-foryou',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss'],
  standalone: false,
})
export class ForYouComponent {
  constructor(private toastController: ToastController) {}
  ChartData = [7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];

  ChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  onCardSelect() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 10000,
    };
    this.toastController.showToast(config);
  }
}
