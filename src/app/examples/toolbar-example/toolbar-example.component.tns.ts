import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';
import { ToastController, ToastConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirby-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss'],
})
export class ToolbarExampleComponent {
  color: Color;
  colors: Color[] = ColorHelper.getMainColors();

  constructor(private router: RouterExtensions, private toastController: ToastController) {}

  changeColor(color: Color) {
    this.color = color;
  }

  backButtonSelected(): void {
    this.router.backToPreviousPage();
  }

  onPrimarySelect() {
    const config: ToastConfig = {
      message: 'Primary tapped',
      messageType: 'success',
      durationInMs: 2000,
    };
    this.toastController.showToast(config);
  }

  onSecondarySelect() {
    const config: ToastConfig = {
      message: 'Secondary tapped',
      messageType: 'success',
      durationInMs: 2000,
    };
    this.toastController.showToast(config);
  }
}
