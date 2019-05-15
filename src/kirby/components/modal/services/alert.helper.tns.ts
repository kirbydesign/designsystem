import { Injectable, ViewContainerRef } from '@angular/core';
import { confirm } from 'tns-core-modules/ui/dialogs';

import { AlertConfig } from '../alert/config/alert-config';

@Injectable()
export class AlertHelper {
  public async showAlert(config: AlertConfig, vcRef: ViewContainerRef, _: any): Promise<any> {
    return confirm({
      title: config.title,
      message: config.message,
      okButtonText: config.okBtnText,
      cancelButtonText: config.cancelBtnText,
      cancelable: true,
    });
  }
}
