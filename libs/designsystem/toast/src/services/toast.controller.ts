import { Injectable } from '@angular/core';
import { Overlay } from '@kirbydesign/designsystem/modal';

import { ToastConfig } from '../config/toast-config';

import { ToastHelper } from './toast.helper';

@Injectable()
export class ToastController {
  constructor(private toastHelper: ToastHelper) {}

  public showToast(config: ToastConfig, onCloseToast?: () => void): Promise<Overlay> {
    return this.toastHelper.showToast(config).then((overlay) => {
      if (onCloseToast) {
        overlay.onDidDismiss.then(() => onCloseToast());
      }
      return overlay;
    });
  }
}
