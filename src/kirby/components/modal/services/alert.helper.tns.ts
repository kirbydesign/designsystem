import { Injectable } from '@angular/core';
import { confirm } from 'tns-core-modules/ui/dialogs';

import { AlertConfig } from '../alert/config/alert-config';

@Injectable()
export class AlertHelper {
  public async showAlert(config: AlertConfig): Promise<boolean> {
    return confirm({
      title: config.title,
      message: config.message,
      okButtonText: config.okBtnText,
      cancelButtonText: config.cancelBtnText,
      cancelable: false,
    });
  }
}
