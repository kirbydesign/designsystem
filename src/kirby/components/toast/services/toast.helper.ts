import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ToastConfig, MessageType } from '../config/toast-config';

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
      cssClass: this.getCssClass(config.messageType),
    });
    toast.present();
    return toast.onDidDismiss();
  }

  private getCssClass(messageType: MessageType): string {
    let cssClass = ToastHelper.CSS_CLASS;
    if (messageType) {
      cssClass += ' ' + messageType;
    }
    return cssClass;
  }
}
