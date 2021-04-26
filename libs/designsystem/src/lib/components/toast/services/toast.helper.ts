import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Overlay } from '../../modal/services/modal.interfaces';
import { MessageType, ToastConfig } from '../config/toast-config';

@Injectable()
export class ToastHelper {
  static CSS_CLASS = 'kirby-toast';
  static DURATION_IN_MS = 4000;

  constructor(private toastController: ToastController) {}

  public async showToast(config: ToastConfig): Promise<Overlay> {
    const toast = await this.toastController.create({
      animated: config.animated,
      message: config.message,
      position: 'top',
      duration: config.durationInMs ? config.durationInMs : ToastHelper.DURATION_IN_MS,
      cssClass: this.getCssClass(config.messageType),
    });
    await toast.present();
    return {
      dismiss: toast.dismiss.bind(toast),
      onWillDismiss: toast.onWillDismiss(),
      onDidDismiss: toast.onDidDismiss(),
    };
  }

  private getCssClass(messageType: MessageType): string {
    let cssClass = ToastHelper.CSS_CLASS;

    if (messageType === 'danger') {
      console.warn(
        `[DEPRECATED] 'danger' message type is deprecated. Use Alerts for critial warnings. Toast will be shown as 'warning'`
      );

      messageType = 'warning';
    }

    if (messageType) {
      cssClass += ' ' + messageType;
    }

    return cssClass;
  }
}
