import { Injectable } from '@angular/core';
import { Overlay } from '@kirbydesign/designsystem/modal';

import { ToastConfig } from '../config/toast-config';

import { ToastHelper } from './toast.helper';

@Injectable()
export class ToastController {
  constructor(private toastHelper: ToastHelper) {}

  public async showToast(config: ToastConfig, onCloseToast?: () => void): Promise<Overlay> {
    const overlay = await this.toastHelper.showToast(config);
    if (onCloseToast) {
      overlay.onDidDismiss.then(() => onCloseToast());
    }
    return overlay;
  }
}
