import { Injectable } from '@angular/core';

import { ToastConfig } from './config/toast-config';
import { ToastHelper } from './toast.helper';

@Injectable()
export class ToastController {
  constructor(private toastHelper: ToastHelper) {}

  showToast(config: ToastConfig, onCloseToast?: () => void) {
    this.toastHelper.showToast(config).then(() => {
      if (onCloseToast) {
        onCloseToast();
      }
    });
  }
}
