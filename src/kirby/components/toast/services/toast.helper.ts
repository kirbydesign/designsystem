import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ToastConfig } from '../config/toast-config';
import { ThemeColor } from './../../../helpers/theme-color.type';

@Injectable()
export class ToastHelper {
  static CSS_CLASS = 'kirby-toast';
  static DURATION_IN_MS = 4000;

  constructor(private toastController: ToastController) {}

  public async showToast(config: ToastConfig): Promise<any> {
    const toast = await this.toastController.create({
      message: config.message,
      position: 'top',
      duration: config.durationInMs ? config.durationInMs : ToastHelper.DURATION_IN_MS,
      cssClass: this.getCssClass(config.themeColor),
    });
    toast.present();
    return toast.onDidDismiss();
  }

  private getCssClass(themeColor: ThemeColor): string {
    let cssClass = ToastHelper.CSS_CLASS;
    if (themeColor) {
      cssClass += ' ' + themeColor;
    }
    return cssClass;
  }
}
