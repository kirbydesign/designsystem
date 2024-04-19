import { Injectable } from '@angular/core';
import { ShowAlertCallback } from '../../modal-wrapper/config';
import { AlertConfig } from '../alert';
import { AlertHelper } from './alert.helper';

@Injectable()
export class CanDismissHelper {
  constructor(private alertHelper: AlertHelper) {}

  public getCanDismissCallback(callback: ShowAlertCallback) {
    return async () => {
      const result = await callback();

      if (typeof result === 'boolean') return result;

      const canCloseModal = await this.showAlert(result);
      return canCloseModal;
    };
  }

  public async showAlert(config: AlertConfig): Promise<boolean> {
    const alert = await this.alertHelper.showAlert(config);
    const result = await alert.onWillDismiss;
    return result.data;
  }
}
