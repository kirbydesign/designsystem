import { Injectable } from '@angular/core';

import { ToastHelper } from './toast.helper';
import { ToastConfig } from '../config/toast-config';

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
