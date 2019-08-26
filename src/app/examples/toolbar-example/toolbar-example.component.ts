import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { ToastController, ToastConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirby-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss'],
})
export class ToolbarExampleComponent {
  constructor(private location: Location, private toastController: ToastController) {}
  onBackButtonSelect(): void {
    this.location.back();
  }

  onPrimarySelect(): void {
    const config: ToastConfig = {
      message: 'Primary tapped',
      messageType: 'success',
      durationInMs: 2000,
    };
    this.toastController.showToast(config);
  }

  onSecondarySelect(): void {
    const config: ToastConfig = {
      message: 'Secondary tapped',
      messageType: 'success',
      durationInMs: 2000,
    };
    this.toastController.showToast(config);
  }
}
