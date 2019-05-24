import { Injectable } from '@angular/core';

import { ToastConfig } from '../config/toast-config';

@Injectable()
export class ToastHelper {
  public async showToast(config: ToastConfig): Promise<any> {
    return Promise.resolve();
  }
}
