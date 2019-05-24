import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ToastConfig } from '../config/toast-config';
import { ThemeColor } from './../../../helpers/theme-color.type';

@Injectable()
export class ToastHelper {
  static DEFAULT_CSS_CLASS = 'kirby-toast';
  static DEFAULT_DURATION = 3000;

  constructor(private toastController: ToastController) {}

  public async showToast(config: ToastConfig): Promise<any> {
    const toast = await this.toastController.create({
      message: config.message,
      position: config.position ? config.position : 'top',
      showCloseButton: config.cancelBtnText ? true : false,
      closeButtonText: config.cancelBtnText ? config.cancelBtnText : '',
      duration: this.duration(config),
      cssClass: this.cssClass(config.themeColor),
    });
    toast.present();
    return toast.onDidDismiss();
  }

  private duration(config: ToastConfig): number {
    const duration = config.duration ? config.duration : ToastHelper.DEFAULT_DURATION;
    return config.cancelBtnText ? 0 : duration;
  }

  private cssClass(themeColor: ThemeColor): string {
    return themeColor
      ? `${ToastHelper.DEFAULT_CSS_CLASS} ${themeColor}`
      : ToastHelper.DEFAULT_CSS_CLASS;
  }
}
