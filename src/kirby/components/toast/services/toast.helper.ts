import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ToastConfig } from '../config/toast-config';
import { ThemeColor } from './../../../helpers/theme-color.type';

@Injectable()
export class ToastHelper {
  static DEFAULT_CSS_CLASS = 'kirby-toast';
  static DEFAULT_DURATION = 4000;

  constructor(private toastController: ToastController) {}

  public async showToast(config: ToastConfig): Promise<any> {
    const toast = await this.toastController.create({
      message: config.message,
      position: 'top',
      duration: config.duration ? config.duration : ToastHelper.DEFAULT_DURATION,
      cssClass: this.cssClass(config.themeColor),
    });
    toast.present();
    return toast.onDidDismiss();
  }

  private cssClass(themeColor: ThemeColor): string {
    return themeColor
      ? `${ToastHelper.DEFAULT_CSS_CLASS} ${themeColor}`
      : ToastHelper.DEFAULT_CSS_CLASS;
  }
}
